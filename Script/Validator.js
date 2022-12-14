class Validator {
    constructor(options) {
        this.formElement = document.querySelector(options.form)
        this.invalidClass = options.invalidClass
        this.errorSelector = options.errorSelector
        this.selectorRules = this.getSelectorRule(options.rules)
        this.submit = options.submit
        this.main()
    }
    // Lấy hết rule của từng element, xử lý mảng các obj thành 1 obj selectorRule {element:[rule]}
    getSelectorRule(rawRules) {
        const selectorRules = {}
        rawRules.forEach((rule)=>{
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test)
            } else {
                selectorRules[rule.selector] = [rule.test]
            }
        })
        return selectorRules
        

    }
    // static method does not invoke constructor and no context
    // validate by getting rule and selector form rules, set/unset innerText and add/remove classList to error <span>
    validate(inputElement, rules) {
        for (let testRule of rules) {
            let errorMessage = testRule(inputElement.value) 
            let formGroup = this.handleNestedXpath(inputElement) 
            let errorElement = formGroup.querySelector(this.errorSelector)    
            if (errorMessage) {
                errorElement.innerText = errorMessage
                formGroup.classList.add(this.invalidClass)
                break
            } else {
                this.removeInvalidClass(errorElement)
            }
        }
    }
    // xử lý nested xpath 
    handleNestedXpath(inputElement) {
        let parentElement = inputElement.parentElement 
        if (parentElement.classList.contains("form-group")) {
            return parentElement
        } else {
            return this.handleNestedXpath(parentElement)
        }
    }   
    removeInvalidClass(errorElement) {
        errorElement.parentElement.classList.remove(this.invalidClass)
        errorElement.innerText= ""
    }
     
    handleSubmit(e) {
        e.preventDefault()
        for (let key in this.selectorRules) {
            let inputElement = document.querySelector(key)
            this.validate(inputElement,this.selectorRules[key])
        }
        const errorElements = this.formElement.querySelectorAll(this.errorSelector) 
        if (errorElements && Array.from(errorElements).every((errorElement)=>errorElement.innerText==='')) { // check xem mọi thẻ error đều không có lỗi
            const dataInputs = this.formElement.querySelectorAll("[name]")
            console.log(dataInputs)
            const data = Array.from(dataInputs).reduce((data, input)=>({...data, [input.name] : input.value

            }), {}
            )
            if (typeof(this.submit) === 'function') {
                this.submit(data)
            } else {
                this.formElement.submit(data)
            }
        }
    }
    // perform validation by loop through rules and selector
    main() {
        if (this.formElement) {
            if (this.selectorRules &&  Object.keys(this.selectorRules).length) {
                this.formElement.onsubmit = (e) => {this.handleSubmit(e)}
                Object.keys(this.selectorRules).forEach((key)=>{
                    let inputElement = this.formElement.querySelector(key)
                    if (inputElement) {
                        inputElement.addEventListener("blur", ()=>this.validate(inputElement,this.selectorRules[key])) 
                        inputElement.onfocus = () => this.removeInvalidClass(inputElement.parentElement.querySelector(this.errorSelector))
                    }
                })
            }    
        }
    }
    
//    Rules method
   static isRequired(selector, errorMessage) {
        return {
            selector:selector,
            test: function(value) {
                return value.trim() ? undefined : errorMessage || "this field is required"
            }
        }
    }

    static isEmail(selector, errorMessage) {
        return {
            selector:selector,
            test: function(value) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value.trim())? undefined : errorMessage || "This must be a valid email address" 
                
            }
        }    
    }
    static isPassword(selector, errorMessage) {
        return {
            selector:selector,
            test: function(value) {
                return value.trim().length >=8 ? undefined : errorMessage || "Password must be at least 8 characters"
            }
        }
    }

    static isConfirmPassword(selector, compareSelector, errorMessage) {
        return {
            selector : selector,
            test: function(value) {
                return value === document.querySelector(compareSelector).value? undefined : errorMessage || "Confirm password must be same as password"
            }
        } 
    }
}
export default Validator