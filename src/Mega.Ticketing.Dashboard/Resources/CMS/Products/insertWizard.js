//'use strict';

var InsertWizard = function () {
    // Base elements
    var wizard;
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
    var initWizard = function () {
        // Initialize form wizard
        wizard = new KTWizard('kt_wizard_v2', {
            startStep: 1, // initial active step number
            clickableSteps: true  // allow step clicking
        });

        // Validation before going to next page
        wizard.on('beforeNext', function (wizardObj) {
        });

        wizard.on('beforePrev', function (wizardObj) {
        });

        // Change event
        wizard.on('change', function (wizard) {
            KTUtil.scrollTop();
        });
    }
    var users = function () {
        $("#userForm").validate({
            rules: {
                UserName: {
                    required: true,
                    minlength: 3
                },
                Password: {
                    required: true
                },
                ConfirmPassword: {
                    required: true
                },
                Name: {
                    required: true,
                    minlength: 3
                },
                Family: {
                    required: true,
                    minlength: 3
                },
                NationalID: {
                    required: true,
                    nationalCode: true,
                    minlength: 10,
                    maxlength: 10
                }
            },
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },
            submitHandler: function (form) {
                var userData = $("#userForm").serialize();
                $.ajax({
                    url: "/CMSProducts/AjaxUsers",
                    method: "POST",
                    data: userData,
                    success: function (data) {
                        //reload dropdownlist for supplier
                        self.ReloadDropDown("#ddl-container-users", "/CMS/PartialsCMS/UserList", "GET", {
                            name: "Supplier.OwnerId",
                            id: "Supplier_OwnerId",
                            cssClass: "form-control kt-selectpicker"
                        });
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
    var suppliers = function () {
        $("#supplierForm").validate({
            rules: {
                "Supplier.Name": {
                    required: true,
                    minlength: 3
                },
                "Supplier.MinimumMegaValue": {
                    required: true
                },
                "Supplier.InitialSale": {
                    required: true
                },
                "Supplier.PaymentId": {
                    required: true
                }
            },
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },
            submitHandler: function (form) {
                var userData = $("#supplierForm").serialize();
                $.ajax({
                    url: "/CMSProducts/AjaxSupplier",
                    method: "POST",
                    data: userData,
                    success: function (data) {
                        //reload dropdownlist for supplier
                        self.ReloadDropDown("#ddl-container-supplier", "/CMS/PartialsCMS/ShopList", "GET", {
                            name: "Supplier.OwnerId",
                            id: "Supplier_OwnerId",
                            cssClass: "form-control kt-selectpicker"
                        });
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
    var brands = function () {
        $("#brandForm").validate({
            rules: {
                Name: {
                    required: true,
                    minlength: 2
                }
            },
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },
            submitHandler: function (form) {
                var userData = $("#brandForm").serialize();
                $.ajax({
                    url: "/CMSProducts/AjaxBrand",
                    method: "POST",
                    data: userData,
                    success: function (data) {
                        //reload dropdownlist for supplier
                        self.ReloadDropDown("#ddl-container-brand", "/CMS/PartialsCMS/Brands", "GET", {
                            name: "BrandId",
                            cssClass: "form-control kt-selectpicker"
                        });
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
    var categories = function () {
        $("#categoryForm").validate({
            rules: {
                Name: {
                    required: true,
                    minlength: 3
                }
            },
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },
            submitHandler: function (form) {
                var userData = $("#categoryForm").serialize();
                $.ajax({
                    url: "/CMSProducts/AjaxCategory",
                    method: "POST",
                    data: userData,
                    success: function (data) {
                        //reload dropdownlist for supplier
                        self.ReloadDropDown("#ddl-container-category", "/CMS/PartialsCMS/Category", "GET", {
                            name: "CategoryId",
                            cssClass: "form-control kt-selectpicker"
                        });
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
                    url: "/CMSProducts/AjaxProduct",
                    method: "POST",
                    data: userData,
                    success: function (data) {
                        //notification
                        if (data && data.Result) {
                            $("#productid").val(data.Id);
                            $("#productid").trigger("change");

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
            //Dropzone init
            var productDropzone = new Dropzone("#productImg",
                {
                    url: "/CMS/GalleryManagement/InsertImage/" + $("#productid").val(), // Set the url for your upload script location
                    paramName: "file", // The name that will be used to transfer the file
                    maxFiles: 10,
                    maxFilesize: 10, // MB
                    addRemoveLinks: true,
                    acceptedFiles: "image/*",
                    //accept: function (file, done) {
                    //    if (file.name == "justinbieber.jpg") {
                    //        done("Naha, you don't.");
                    //    } else {
                    //        done();
                    //    }
                    //}
                });
            $(document).on('change', '#productid', function () {
                productDropzone.options.url = "/CMS/GalleryManagement/InsertImage/" + $("#productid").val();
            });


            //init 
            initWizard();
            users();
            suppliers();
            brands();
            categories();
            products();
        }
    };
}();


$(function () {
    InsertWizard.init();
});