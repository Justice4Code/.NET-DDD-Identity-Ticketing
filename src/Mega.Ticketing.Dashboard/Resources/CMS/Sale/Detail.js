//'use strict';

var Detail = function () {
    // PRIVATE 
    var crm = function () {
        $("#form").validate({
            rules: {
                IsOrderAccepted: {
                    required: true
                },
                IsDeliveryAccepted: {
                    required: true
                },
                HasSupplierContacted: {
                    required: true
                }
            },
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },
            submitHandler: function (form) {
                var userData = $("#form").serialize();
                $.ajax({
                    url: "/CMSSaleCRM/Detail",
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
                            tto.error("خطا", data);
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
                MegaYadakModal.inst.CloseModal("#detail");
            });
            //Avaliablity 
            $(document).on('click', '.api-delivery', function () {
                $this = $(this);

                var companyId = $this.data('companyid');
                var cityName = $this.data('city');
                var lat = $this.data('lat');
                var lng = $this.data('lng');

                if (companyId) {
                    $.ajax({
                        url: '/CMSSaleCRM/CheckAvailability',
                        method: 'POST',
                        data: {
                            companyId: companyId,
                            cityName: cityName,
                            lat: lat,
                            lng: lng
                        },
                        success: function (data) {
                            if (data) {
                                if (data.IsSuccessfull) {
                                    if (data.CourierCount && data.CourierCount != 0) {
                                        $('#' + data.CompanyId).html('<p>تاییده شده - <span> تعداد پیک در محل : ' + data.CourierCount + '</span></p>');
                                    }
                                    else {
                                        $('#' + data.CompanyId).html('<p>تاییده شده</p>');
                                    }
                                }
                                else {
                                    tto.error('خطا', 'تماسی از این وب سرویس دریافت نشده');
                                }
                            }
                            else {
                                tto.error('خطا', 'تماسی از این وب سرویس دریافت نشده');
                            }
                        }
                    });
                }
            });

            //CancelOrder
            $(document).on('click', '#btnCancelOrder', function () {
                var cartId = $(this).attr("data-id");
                $.ajax({
                    url: "/CMSSaleCRM/CancelOrder",
                    method: "POST",
                    data: { cartId: cartId },
                    success: function (data) {
                        //notification
                        if (data && data.Result) {
                            tto.success("موفقیت", "درخواست شما با موفقیت انجام شده است.");
                            MegaYadakModal.inst.CloseModal("#detail");
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
            });

            //init 
            crm();
        }
    };
}();


$(function () {
    Detail.init();
});