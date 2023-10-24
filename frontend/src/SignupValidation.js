function Validation(values) {
    const errors = {};

    //check if name is empty
    if(!values.name) {
        errors.name = 'Name is required'; 
    }
    // Check if the email is empty or not a valid email format
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email is not valid';
    }
  
    // Check if the password is empty
    if (!values.password) {
      errors.password = 'Password is required';
    }
  
    return errors;
}
export default Validation;