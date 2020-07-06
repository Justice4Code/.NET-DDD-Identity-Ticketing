//'use strict';

var Create = function () {
    // Base elements
    var self = this;
    //Properties and public methods
    this.ReloadDropDown = function (target, url, method, data) {
        $.ajax({
            url: url,
            method: method,
            data: data,
            success: function (responseData) {
                //console.log(responseData); 
                $(target).empty();
                $(target).html(responseData);
                $(".kt-selectpicker").attr("data-live-search", "true");
                $(".kt-selectpicker").attr("data-size", "5")
                $('.kt-selectpicker').selectpicker();
            }
        });
    };
    // PRIVATE 
    var company = function () {
        $("#cform").validate({
            rules: {
                FirstName: {
                    required: true,
                    minlength: 2
                },
                LastName: {
                    required: true
                },
                UserName: {
                    required: true
                },
                Password: {
                    required: true
                },
                CompanyId: {
                    required: true
                }
            },
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },
            submitHandler: function (form) {
                var userData = $("#cform").serialize();
                $.ajax({
                    url: "/Manage/AjaxCreate",
                    method: "POST",
                    data: userData,
                    success: function (data) {
                        //notification
                        if (data && data.Result) {
                            tto.success("موفقیت", "درخواست شما با موفقیت انجام شده است.");
                            MegaYadakModal.inst.CloseModal("#create");
                        }
                        else if (data && data.Error) {
                            tto.alert("هشدار", data.Error);
                        }
                        else {
                            tto.alert("هشدار", "مشکلی در ارسال دیده شد. لطفا بررسی نمایید.");
                        }
                    },
                    error: function (data) {
                        if (data) {
                            tto.error("خطا", data.Error);
                        }
                        else {
                            tto.error("خطا", "مشکلی در ارسال ارطلاعات ایجاد شده است");
                        }
                    }
                });
            }
        });
    }
    return {
        init: function () {
            //Dropdowns default
            $(".kt-selectpicker").attr("data-live-search", "true");
            $(".kt-selectpicker").attr("data-size", "5")
            $('.kt-selectpicker').selectpicker();

            //close modal
            $(document).on('click', '#btnClose', function () {
                MegaYadakModal.inst.CloseModal("#create");
            });

            //init 
            company();
        }
    };
}();


$(function () {
    Create.init();
});