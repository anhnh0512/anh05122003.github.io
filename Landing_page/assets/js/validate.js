//Object Validator
function Validator(options) {
    // thực hiện validate 
    function getParent(element,selector) {
        while (element.parentElement) {
            // console.log(element,selector)
            // console.log(element.parentElement.matches(selector))
            if(element.parentElement.matches(selector)){
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }


    let selectorRules = {};

    function validate(inputElement,rule) {
        let errMessenge ;
        let errElement  = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
        let rules = selectorRules[rule.selector];

        //Lặp qua từng rule và kiểm tra nếu messenge có lỗi thì dừng việc kiểm tra
        for (let index = 0; index < rules.length; ++index) {
            switch (inputElement.type) {
                case 'checkbox':
                case 'radio' : 
                    errMessenge = rules[index](
                        formElement.querySelector(rule.selector + ':checked')
                    );
                    break;
                default:
                    errMessenge = rules[index](inputElement.value);
                    break;
            }
            
            if(errMessenge) break;
        }
        if(errMessenge){
           
            errElement.innerText = errMessenge;
            getParent(inputElement,options.formGroupSelector).classList.add(options.class);
        }
        
        else {
            errElement.innerText = '';
            getParent(inputElement,options.formGroupSelector).classList.remove(options.class);
        }
        return !errMessenge;
    }

    //Lấy element của form cần validate
    let formElement = document.querySelector(options.form);
    
    if(formElement){
        
        formElement.onsubmit = function (e) {
            e.preventDefault();

            let isFormValid = true;

            console.log(options.rules)
            //Thực hiện lặp qua từng rule và validate
            options.rules.forEach(function(rule) {
                console.log(rule)
                let inputElement = formElement.querySelector(rule.selector);
                let isValid = validate(inputElement,rule);
                if(!isValid){
                    isFormValid = false;
                }
                console.log(isFormValid)
            });
             
    
            if(isFormValid){

                if(typeof options.onSubmit === 'function'){
                    console.log('z')
                    let EnableInputs = formElement.querySelectorAll('[name]');

                    let formValues = Array.from(EnableInputs).reduce(function (values,input) {
                        switch (input.type) {
                            case 'radio':
                                values[input.name] = formElement.querySelector('input[name="'+input.name+'"]:checked').value;
                                break;
                            case 'checkbox':
                                if(!input.matches(':checked')) {
                                    values[input.name] = '';
                                    return values;
                                };
                                if(!Array.isArray(values[input.name])) {
                                    values[input.name] = [];
                                } 
                                console.log(values[input.name])
                                console.log(input.value)
                                values[input.name].push(input.value);
                                
                                break;
                            case 'file': 
                                console.log(input.files)
                                values[input.name] = input.files;
                                break;
                            default:
                                values[input.name] = input.value;
                                break;
                        }
                        return values;    
                    }, {});       
                    options.onSubmit(formValues)
                }
                else {
                    formElement.submit();
                }
            }
        }

        //xử lý lặp qua mỗi rule và xử lý khi sự kiện xảy ra (blur,input,....)
        options.rules.forEach(function(rule) {
            //console.log(rule.selector)
            //selectorRules[rule.selector] = rule.test;
            if(Array.isArray(selectorRules[rule.selector])){
                selectorRules[rule.selector].push(rule.test)
            }
            else {
                selectorRules[rule.selector] = [rule.test];
            }
            let inputElements = formElement.querySelectorAll(rule.selector)
             
            Array.from(inputElements).forEach(function(inputElement){
                if(inputElement){
                    // xử lý khi blur khỏi input
                    inputElement.onblur = function () {
                        validate(inputElement,rule)
                    }
                    // xử lý mỗi khi người dùng nhập vào input
                    inputElement.oninput = function () {
                        let errElement  = getParent(inputElement,options.formGroupSelector).querySelector(options.errorSelector)
                        errElement.innerText = '';
                        getParent(inputElement,options.formGroupSelector).classList.remove('invalid');
                    }
                    
                }
            })
        })
    }
    
}
// define rules
// Nguyên tắc cửa các rule :
// 1. Khi có lỗi thì trả ra messenge lỗi 
// 2. Khi hợp lệ thì không trả ra cái gì 
Validator.isRequired = function (selector,messenge) {
    return {
        selector: selector,
        test: function (value) {
            return value ? undefined : messenge ||'Vui lòng nhập trường này'
        }
    };
}
Validator.isEmail = function (selector,messenge) {
    return {
        selector: selector,
        test: function (value) {
            let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : messenge ||'Vui lòng nhập email';
        }
    };
}
Validator.minLength = function (selector,min,messenge) {
    return {
        selector: selector,
        test: function (value) {
            return value.length>=min ? undefined : `Vui lòng nhập tối thiểu ${min} ký tự`;
        }
    };
}
Validator.isConfirmed = function (selector,getConfirmValue,messenge) {
    return {
        selector: selector,
        test: function (value) {
            return value === getConfirmValue() ? undefined : messenge || 'Giá trị nhập vào không chính xác';
        }
    };
}