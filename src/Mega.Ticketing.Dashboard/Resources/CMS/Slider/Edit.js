//'use strict';

var Edit = function () {
    // Base elements
    var self = this;
    // PRIVATE 
    var slider = function () {
        $("#sliderForm").validate({
            rules: {
                Title: {
                    required: true,
                    minlength: 2
                },
                Link: {
                    required: true
                }
            },
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },
            submitHandler: function (form) {
                var userData = $("#sliderForm").serialize();
                $.ajax({
                    url: "/CMSSlider/AjaxEdit",
                    method: "POST",
                    data: userData,
                    success: function (data) {
                        //notification
                        if (data && data.Result) {
                            tto.success("موفقیت", "درخواست شما با موفقیت انجام شده است.");
                            MegaYadakModal.inst.CloseModal("#edit");
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

            //close modal
            $(document).on('click', '#btnClose', function () {
                MegaYadakModal.inst.CloseModal("#edit");
            });

            //init 
            slider();
        }
    };
}();


$(function () {
    Edit.init();
});