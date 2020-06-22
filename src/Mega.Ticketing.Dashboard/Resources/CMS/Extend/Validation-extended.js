var MegaYadakValidation = function () {

    var Megayadak = this;
    //Properties and public functions
    this.NationalCodeValidation = function (input) {
        if (!/^\d{10}$/.test(input)
            || input == '0000000000'
            || input == '1111111111'
            || input == '2222222222'
            || input == '3333333333'
            || input == '4444444444'
            || input == '5555555555'
            || input == '6666666666'
            || input == '7777777777'
            || input == '8888888888'
            || input == '9999999999')
            return false;
        var check = parseInt(input[9]);
        var sum = 0;
        var i;
        for (i = 0; i < 9; ++i) {
            sum += parseInt(input[i]) * (10 - i);
        }
        sum %= 11;
        return (sum < 2 && check == sum) || (sum >= 2 && check + sum == 11);
    }

    // PRIVATE Functions
    var errorMessageOveride = function () {
        jQuery.extend(jQuery.validator.messages, {
            required: "تکمیل این قسمت ضروری می باشد.",
            remote: "Please fix this field.",
            email: "Please enter a valid email address.",
            url: "Please enter a valid URL.",
            date: "Please enter a valid date.",
            dateISO: "Please enter a valid date (ISO).",
            number: "Please enter a valid number.",
            digits: "Please enter only digits.",
            creditcard: "Please enter a valid credit card number.",
            equalTo: "Please enter the same value again.",
            accept: "Please enter a value with a valid extension.",
            maxlength: jQuery.validator.format("حداکثر می بایستی {0} حرف را وارد نمایید"),
            minlength: jQuery.validator.format("حداقل می بایستی {0} حرف را وارد نمایید"),
            rangelength: jQuery.validator.format("Please enter a value between {0} and {1} characters long."),
            range: jQuery.validator.format("Please enter a value between {0} and {1}."),
            max: jQuery.validator.format("Please enter a value less than or equal to {0}."),
            min: jQuery.validator.format("Please enter a value greater than or equal to {0}.")
        });
    };

    var extendedMethods = function () {
        //National Code Validation
        jQuery.validator.addMethod("nationalCode", function (value, element) {
            return this.optional(element) || Megayadak.NationalCodeValidation(value);
        }, "کد ملی اشتباه وارد شده است");

    };

    return {
        init: function () {
            errorMessageOveride();
            extendedMethods();
        }
    }

}();

$(function () {
    MegaYadakValidation.init();
});