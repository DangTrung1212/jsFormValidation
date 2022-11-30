class Validator {
    constructor(options) {
        this.formElement = document.querySelector(options.form)
        this.rules = options.rules
        this.invalidClass = options.invalidClass
        this.errorSelector = options.errorSelector
        this.perform()
    }
    /* Todo: save rule become an array, validate each rule by loop through rules, break if errorMeasage   */
    // static method does not invoke constructor and no context
    // validate by getting rule and selector form rules, set/unset innerText and add/remove classList to error <span>
    validate(inputElement, rule) {
        console.log(rule)
        let errorMessage = rule.test(inputElement.value)
        let errorElement = inputElement.parentElement.querySelector(this.errorSelector)
                  
        if (errorMessage) {
            errorElement.innerText = errorMessage
            inputElement.parentElement.classList.add(this.invalidClass)
        } else {
            this.removeInvalidClass(errorElement)
        }
    }
    removeInvalidClass(errorElement) {
        console.log(errorElement)
        errorElement.parentElement.classList.remove(this.invalidClass)
        errorElement.innerText= ""
    }
    // perform validation by loop through rules and selector
    perform() {
    if (this.formElement) {
        this.rules.forEach((rule)=>{
            let inputElement = this.formElement.querySelector(rule.selector)
            if (inputElement) {
                inputElement.addEventListener("blur", ()=>this.validate(inputElement,rule)) 
                inputElement.onfocus = () => this.removeInvalidClass(inputElement.parentElement.querySelector(this.errorSelector))
            }
        })
    }    
}

//    Rules method
   static isRequired(selector) {
        return {
            selector:selector,
            test: function(value) {
                return value.trim() ? undefined : 'This is required field'
            }
        }
    }

    static isEmail(selector) {
        return {
            selector:selector,
            test: function(value) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value.trim())? undefined : "This must be a valid email address" 
                
            }
        }    
    }
    static isPassword(selector) {
        return {
            selector:selector,
            test: function(value) {
                return value.trim().length >=8 ? undefined : "Password must be at least 8 characters"
            }
        }
    }

    static isConfirmPassword(selector, compareSelector) {
        return {
            selector : selector,
            test: function(value) {
                return value === document.querySelector(compareSelector).value? undefined : "Confirm password must be same as password"
            }
        } 
    }
}