tto.alert = function (title, message, func, opt) {
    var _titleBlock = '<div style="font-size: 15px">' + title + '</div>';
    var _textBlock = '<div style="font-size: 13px">' + message + '</div>';

    swal.fire({
        "title": _titleBlock,
        "html": _textBlock,
        "type": "warning",
        "showCloseButton": true,
        "confirmButtonText": '<span style="font-family: "FABYEKAN", Tahoma; text-align: right; direction: rtl ">باشه</span>'
    }).then(function () {
        if (func) func(true);
    });
}

tto.confirm = function (title, message, func, opt) {
    var _titleBlock = '<div style="font-size: 15px">' + title + '</div>';
    var _textBlock = '<div style="font-size: 13px">' + message + '</div>';

    swal.fire({
        "title": _titleBlock,
        "html": _textBlock,
        "type": "question",
        "showCloseButton": true,
        "showCancelButton": true,
        "confirmButtonText": '<span style="font-family: "FABYEKAN", Tahoma; text-align: right; direction: rtl ">بلی</span>',
        "cancelButtonText": '<span style="font-family: "FABYEKAN", Tahoma; text-align: right; direction: rtl;">خیر</span>',
        "cancelButtonColor": '#e21d1d'
    }).then(function () {
        if (func) func(true);
    });
}

tto.error = function (title, message, func, opt) {
    var _titleBlock = '<div style="font-size: 15px">' + title + '</div>';
    var _textBlock = '<div style="font-size: 13px">' + message + '</div>';

    swal.fire({
        "title": _titleBlock,
        "html": _textBlock,
        "type": "error",
        "showCloseButton": true,
        "confirmButtonText": '<span style="font-family: "FABYEKAN", Tahoma; text-align: right; direction: rtl ">باشه</span>',
    }).then(function () {
        if (func) func(true);
    })
}

tto.success = function (title, message, func, opt) {
    var _titleBlock = '<div style="font-size: 15px">' + title + '</div>';
    var _textBlock = '<div style="font-size: 13px">' + message + '</div>';

    swal.fire({
        "title": _titleBlock,
        "html": _textBlock,
        "type": "success",
        "showCloseButton": true,
        "confirmButtonText": '<span style="font-family: "FABYEKAN", Tahoma; text-align: right; direction: rtl ">باشه</span>',
    }).then(function () {
        if (func) func(true);
    });
}