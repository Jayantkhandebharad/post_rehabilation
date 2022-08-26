export default function ValidateAddUser(values) {
    let errors = {};
    let errorsFlag = {};
  
    if (!values.parentName.trim()) {
      errors.parentName = "Parents name required";
      errorsFlag.parentName = true;
    }
  
    if (!values.Name.trim()) {
      errors.Name = "Name required";
      errorsFlag.Name = true;
    }

    if (!values.doctorName.trim()) {
      errors.doctorName = "Doctor Name";
      errorsFlag.doctorName = true;
    }

    if (!values.doctorId.trim()) {
      errors.doctorId = "Doctor ID";
      errorsFlag.doctorId = true;
    }

    if (!values.hospName.trim()) {
      errors.hospName = "Hospital Name";
      errorsFlag.hospName = true;
    }

    if (!values.gender.trim()) {
      errors.gender = "gender required";
      errorsFlag.gender = true;
    }

    if (!values.hospId.trim()) {
      errors.hospId = "Hospital Id required";
      errorsFlag.hospId = true;
    }

    if (!values.age.trim()) {
      errors.age = "Age required";
      errorsFlag.age = true;
    }
  
  
    return { errors, errorsFlag };
  }
  