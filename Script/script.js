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
        let localData = JSON.parse(localStorage.getItem("userData"))
        let userData =  localData ? localData : []
        userData.push(data)
        localStorage.setItem("userData", JSON.stringify(userData))
        console.log(data)
    }
  })