import { Component, OnInit } from '@angular/core';
import { FbAuthService } from 'src/shared/services/fbAuth.service';
import { FbTasksService } from 'src/shared/services/fbTasks.service';
import { Task } from './../../../shared/interfaces/TASK';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  public error: string = '';
  public user: any = {};
  public tasks: Task[] = [];
  public newTasks: Task[] = [];
  public inProcessTasks: Task[] = [];
  public doneTasks: Task[] = [];
  public currentDelTask: any = {};
  public showDelTaskModal: boolean = false;
  public editTaskForm: FormGroup | any;
  public currentEditTask: Task = {
    taskTitle: '',
    taskDescription: '',
    taskImportant: false,
    taskDate: '',
    taskCategory: ''
  };
  public showEditTaskModal: boolean = false;
  public topWindowScroll: number = 0;


  constructor (
    private fbService: FbAuthService, 
    private fbTasksService: FbTasksService
  ) {}

  public ngOnInit(): void {
    this.getUserContent();
    this.getTasksContent();

    this.editTaskForm = new FormGroup({
      taskTitle: new FormControl('', [Validators.required]),
      taskDescription: new FormControl('', [Validators.required]),
      taskImportant: new FormControl(false),
      taskDate: new FormControl(new Date(), [Validators.required]),
      taskCategory: new FormControl('', [Validators.required])
    });
  }

  public getUserContent(): void {
    this.fbService.getDataFromDb(JSON.parse(localStorage.uid)).subscribe(user => {
      this.user = user[Object.keys(user)[0]];
    }, err => {
      this.error = err.message;
    })
  }

  public getTasksContent(): void {
    this.fbTasksService.getTasksFromDb(JSON.parse(localStorage.uid)).subscribe(tasks => {
      for (let key in tasks) {
        let task = tasks[key];
        task.id = key;
        this.tasks.push(task);

        if(task.taskCategory === 'new') {
          this.newTasks.push(task);
        } else if (task.taskCategory === 'in-process') {
          this.inProcessTasks.push(task);
        } else if (task.taskCategory === 'done') {
          this.doneTasks.push(task);
        }
      }
    }, err => {
      this.error = err.message;
    })
  }

  public addTask(task: Task): void {
    this.fbTasksService.createTaskInDb(task, JSON.parse(localStorage.uid)).subscribe(task => {
      this.tasks.push(task);
      this.newTasks.push(task);
    }, err => {
      this.error = err.message;
    })
  }

  public preDelTask(task: Task): void {
    this.showDelTaskModal = true;
    this.currentDelTask = task;
    this.disableScroll();
  }

  public deleteTask(): void {
    this.fbTasksService.deleteTaskInDb(this.currentDelTask, JSON.parse(localStorage.uid)).subscribe(() => {
      this.tasks = this.tasks.filter(t => t.id !== this.currentDelTask.id);
      this.newTasks = this.newTasks.filter(t => t.id !== this.currentDelTask.id);
      this.inProcessTasks = this.inProcessTasks.filter(t => t.id !== this.currentDelTask.id);
      this.doneTasks = this.doneTasks.filter(t => t.id !== this.currentDelTask.id);
      this.hideDelModal();
    }, err => {
      this.error = err.message;
      this.hideDelModal();
    })
  }

  public disableScroll(): void {
    const scrollWidth = window.innerWidth - document.body.offsetWidth;
    this.topWindowScroll = window.scrollY;
    document.body.style.cssText = `
        position: fixed;
        top: ${-window.scrollY}px;
        left: 0;
        width: 100%;
        height: 100vh;
        overflow: hidden;
        padding-right: ${scrollWidth}px;
    `;
  }

  public hideDelModal(): void {
    this.showDelTaskModal = false;
    this.currentDelTask = {};

    document.body.style.cssText = '';
    window.scroll({
        top: this.topWindowScroll,
    });
  }

  public preEditTask(task: Task): void {
    this.showEditTaskModal = true;
    this.currentEditTask = task;

    let validDate = `${task.taskDate.substr(3,2)}.${task.taskDate.substr(0,2)}.${task.taskDate.substr(6,4)}`;
    this.editTaskForm.patchValue({taskTitle: task.taskTitle});
    this.editTaskForm.patchValue({taskDescription: task.taskDescription});
    this.editTaskForm.patchValue({taskDate: new Date(validDate)});
    this.editTaskForm.patchValue({taskImportant: task.taskImportant});
    this.editTaskForm.patchValue({taskCategory: task.taskCategory});
    
    this.disableScroll();
  }

  public editTask(): void {
    const editedTask: Task = {
      taskTitle: this.editTaskForm.value.taskTitle,
      taskDescription: this.editTaskForm.value.taskDescription,
      taskImportant: this.editTaskForm.value.taskImportant,
      taskDate: this.editTaskForm.value.taskDate.toLocaleDateString(),
      taskCategory: this.editTaskForm.value.taskCategory,
    };

    this.fbTasksService.editTaskInDb(editedTask, JSON.parse(localStorage.uid), this.currentEditTask.id).subscribe(() => {
      this.tasks = [];
      this.newTasks = [];
      this.inProcessTasks = [];
      this.doneTasks = [];
      this.getTasksContent();
      this.hideEditModal();
    }, err => {
      this.error = err.message;
      this.hideEditModal();
    })
  }

  public hideEditModal(): void {
    this.showEditTaskModal = false;
    this.currentEditTask = {
      taskTitle: '',
      taskDescription: '',
      taskImportant: false,
      taskDate: '',
      taskCategory: '',
      id: ''
    };

    document.body.style.cssText = '';
    window.scroll({
        top: this.topWindowScroll,
    });
  }
}
