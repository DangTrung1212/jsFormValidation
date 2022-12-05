class Validator {
    constructor(options) {
        this.formElement = document.querySelector(options.form)
        this.invalidClass = options.invalidClass
        this.errorSelector = options.errorSelector
        this.selectorRules = this.getSelectorRule(options.rules)
        this.submit = options.submit
        this.perform()
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
            let errorElement = inputElement.parentElement.querySelector(this.errorSelector)      
            if (errorMessage) {
                errorElement.innerText = errorMessage
                inputElement.parentElement.classList.add(this.invalidClass)
                break
            } else {
                this.removeInvalidClass(errorElement)
            }
        }
    }
    removeInvalidClass(errorElement) {
        console.log(errorElement)
        errorElement.parentElement.classList.remove(this.invalidClass)
        errorElement.innerText= ""
    }
    handleSubmit(e) {
        e.preventDefault()
        for (let key in this.selectorRules) {
            let inputElement = document.querySelector(key)
            this.validate(inputElement,this.selectorRules[key])
        }
        const errorElements = document.querySelectorAll(this.errorSelector) 
        if (errorElements && Array.from(errorElements).every((errorElement)=>errorElement.innerText==='')) {
            const dataInputs = document.querySelectorAll("[name]")
            const data = Array.from(dataInputs).reduce((data, input)=>({...data, [input.name] : input.value

            }), {})
            this.submit(data)
        }

        

    }
    // perform validation by loop through rules and selector
    perform() {
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