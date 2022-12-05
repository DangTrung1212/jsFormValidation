import Validator from "./Validator.js";
const validate = new Validator({
    form:"#form-1",
    invalidClass:"invalid",
    errorSelector: ".form-message",
    rules: 
    [
        Validator.isRequired("#firstname","This field is needed"),
        Validator.isRequired("#lastname","This field is needed"),
        Validator.isRequired("#email"),
        Validator.isEmail("#email", "Đây phải là email"),],
        submit: function(data) {
    console.log(data)
    }
  })