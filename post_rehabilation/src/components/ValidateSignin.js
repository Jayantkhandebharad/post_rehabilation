export default function ValidateSignin(values) {
    let errors = {};
    let errorsFlag = {};
  
    if (!values.username.trim()) {
      errors.username = "UserName required";
      errorsFlag.Username = true;
    }
  
    if (!values.password) {
      errors.password = "Password required";
      errorsFlag.Password = true;
    }
  
    return { errors, errorsFlag };
  }