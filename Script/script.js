import Validator from "./Validator.js";

console.log("1111")
const validate = new Validator({
    form:"#form-1",
    invalidClass:"invalid",
    errorSelector: ".form-message",
    rules: 
    [
        Validator.isRequired("#firstname","This field is needed"),
        Validator.isRequired("#lastname","This field is needed"),
        Validator.isRequired("#email"),
        Validator.isEmail("#email", "Đây phải là email")
    ],
        submit: function(data) {
    localStorage.setItem("data", JSON.stringify(data))
    console.log(data)
    }
  })