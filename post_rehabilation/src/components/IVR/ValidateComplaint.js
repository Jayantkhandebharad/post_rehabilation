export default function ValidateComplaint(values) {
    let errors = {};
    let errorsFlag = {};
  
    if (!values.userId.trim()) {
      errors.userId = "user Id required";
      errorsFlag.userId = true;
    }
  
    if (!values.description) {
      errors.description = "Please describe the complaint";
      errorsFlag.description = true;
    }
  
    return { errors, errorsFlag };
  }