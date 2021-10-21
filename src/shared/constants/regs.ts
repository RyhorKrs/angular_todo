export const REGS = {
  UPPER_CASE: /(?=.*[A-Z])/,
  LOWER_CASE: /(?=.*[a-z])/,
  NUMBER: /(?=.*\d)/,
  SYMBOL: /[!@#$%^&*(),.?":{}|<>]/,
  EIGHT_LENGTH: /[a-zA-Z\d@$#!%*?&^()-=_+]{8,}/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
};
