//'use strict';

var TempEdit = function () {
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
    var products = function () {
        $("#productForm").validate({
            rules: {
                Name: {
                    required: true,
                    minlength: 3
                },
                Price: {
                    required: true
                },
                Count: {
                    required: true
                },
                Code: {
                    required: true,
                    minlength: 3
                },
                CategoryId: {
                    required: true
                },
                CarDefIdList: {
                    required: true
                },
                SupplierId: {
                    required: true
                },
                BrandId: {
                    required: true
                },
                Weight: {
                    required: true
                },
                Width: {
                    required: true
                },
                Length: {
                    required: true
                },
                Height: {
                    required: true
                },
                WarrantySummery: {
                    required: true,
                    minlength: 3
                }
            },
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },
            submitHandler: function (form) {
                var userData = $("#productForm").serialize();
                $.ajax({
                    url: "/CMSProducts/AjaxTempEdit",
                    method: "POST",
                    data: userData,
                    success: function (data) {
                        //notification
                        if (data && data.Result) {
                            tto.success("موفقیت", "درخواست شما با موفقیت انجام شده است.");
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

            //CarDefinition Init
            $(".dropdown-tree").each(function (index) {
                $(this).DropDownTree({
                    multiSelect: true,
                    selectChildren: true,
                });
            });
            //CKEditor init
            CKEDITOR.replace('ProductDescription');
            CKEDITOR.replace('WarrantyDescription');
            CKEDITOR.replace('InstallationMethod');

            //close modal
            $(document).on('click', '#btnClose', function () {
                MegaYadakModal.inst.CloseModal("#edit");
            });

            //init 
            products();
        }
    };
}();


$(function () {
    TempEdit.init();
});