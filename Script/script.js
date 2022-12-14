import Validator from "../Class/Validator.js";

const $ = document.querySelector.bind(document)
// const $$ = document.querySelectorAll.bind(document)
const validate = new Validator({
    form:"#form-1",
    formGroupClassName: "form-group",
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
        // can chinh lai logic cho cancel button
        let localData = JSON.parse(localStorage.getItem("userData"))
        let userData =  localData ? localData : []
        userData.push(data)
        localStorage.setItem("userData", JSON.stringify(userData))
        console.log(data)
    }
  }
  )
$(".form-cancel").onclick = () => {
    window.location.href = "./table.html"
}

