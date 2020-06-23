
function exportToXls(table) {
    var $tblHeader = $($(table)[0]);
    //$tblHeader.css('text-align', 'right').css('width','100%');
    var $tblHeaderAllRows = $('tr', $('tbody', $tblHeader));
    var headerSize = calculateSize($tblHeaderAllRows);
    var $tableToExport = $($(table)[1]);
    //DEVICEID
    var fieldsToRemove = $('td[field="companyid"],td[field="deviceid"],td[field="stateid"],td[field="DEVICEID"]', $tableToExport);
    $(fieldsToRemove).each(function (index, value) {
        //TODO REVIEW
        $('tr:first-child >th:eq(' + this.cellIndex + ')', $tableToExport).attr('remove', 'true');
        $(this).remove();
    });
    $('tr:first-child >th[remove]', $tableToExport).remove();
    var newColsCount = $('tr:last-child >td', $tableToExport).length;
    //alert(newColsCount);

    var headerToRemove = $('tr', $tblHeader);
    $('tr:first-child >th', $tblHeader).attr('colspan', newColsCount);
    $(headerToRemove).each(function (index, value) {
        $('th:gt(' + (newColsCount - 1) + ')', value).remove();
    });

    var rowNumber = $("tr:first-child th:contains('ردیف')", $tableToExport);
    if (rowNumber.length > 0) {
        var results = $('tr:not(:has(i)) > td:first-child', $tableToExport);
        $(results).each(function (index, value) {
            $(value).html(index + 1);
        });
    }

    //$('tr:not(:has(i)) > td:first-child', $tableToExport).remove();
    //var size = parseFloat(prompt("Please enter File Size", "2"));
    var size = parseFloat(1.2);
    var $myTblNew = $tableToExport.clone();
    $('tbody', $myTblNew).empty();
    var $allRows = $('tr', $('tbody', $tableToExport));
    var ssplitXls = splitXls($allRows, 0, size, headerSize);
    var $thead = $('thead', $tableToExport).clone();
    var j;
    var fileNamePref = $(".breadcrumb li:last-child").text().trim();
    if (self != top && !fileNamePref) {
        fileNamePref = $(".breadcrumb li:last-child", window.parent.document).text();
    }
    //alert('before download... files count : ' + ssplitXls.length);
    for (j = 0; j < ssplitXls.length; j++) {
        //alert('file : ' + j)
        var $excel = $('<div></div>');
        var splited = $(ssplitXls[j]);
        var $clonedTable = $myTblNew.clone();
        $clonedTable.append($thead);
        var $tbody = $('>tbody', $clonedTable);
        if ($tbody)
            $tbody.append(splited.clone());
        else
            $('<tbody></tbody>').append(splited.clone()).appendTo($clonedTable);
        $clonedTable.append($tbody);
        var head = $tblHeader.clone();
        $excel.prepend(head);
        $excel.append($clonedTable);
        var htmls = $($excel).html();
        var fileName = fileNamePref;
        if (ssplitXls.length > 1) {
            fileName = fileNamePref + '-' + j;
        }
        var worksheet = 'worksheet-' + j;
        exportToExcel(htmls, worksheet, fileName);
    }
    return;
}

function splitXls($allRows, counter, size, headerSize) {
    if (!size && size <= 0) size = 1.5;//Megabytes
    var sliceSize = size * 1024 * 1024;
    var itemsSplited = [];
    if (!counter) counter = 0;
    counter += 1;
    var itemsCount = $allRows.length;
    var sliceCount = Math.floor(itemsCount / counter);
    var i = 0;
    for (i = 0; i <= counter; i++) {
        var startIndex = sliceCount * i;
        var endIndex = startIndex + sliceCount;
        var slice = $allRows.slice(startIndex, endIndex);
        var currentSliceSize = calculateSize(slice) + headerSize;
        if (currentSliceSize > sliceSize) {
            return splitXls($allRows, counter, size, headerSize);
        }
        else {
            if (slice.length)
                itemsSplited.push(slice);
        }
    }
    return itemsSplited;
}
function calculateSize(obj) {
    var valsue = appendAllObjectsIntoOneString(obj)
    return encodeURIComponent(valsue).replace(/%[A-F\d]{2}/g, 'U').length
}

function appendAllObjectsIntoOneString(obj) {
    var html = [];
    $.each(obj, function (name, value) {
        html.push($(value)[0].outerHTML);
    });
    var returnValue = html.join(' ');//
    return returnValue;
}

function exportToExcel(htmls, worksheet, fileName, base64) {

    if (base64)
        base64 = ';base64';
    else
        base64 = '';
    var uri = 'data:application/vnd.ms-excel;charset=utf-8,\uFEFF;' + base64 + ',';
    var template = '<html xmlns:o="urn:schemas-microsoft-com:office:office"                     xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">                    <head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>Worksheet</x:Name>                    <x:WorksheetOptions><x:DisplayGridlines/><x:DisplayRightToLeft/></x:WorksheetOptions>                    </x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->                    </head><body>{table}</body></html>';
    var toBase64 = function (s) {
        return window.btoa(unescape(encodeURIComponent(s)))
    };

    var format = function (s, c) {
        return s.replace(/{(\w+)}/g, function (m, p) {
            return c[p];
        });
    };
    var ctx = {
        worksheet: worksheet,
        table: htmls
    }
    var link = document.createElement("a");
    link.download = fileName + ".xls";
    var excel = base64 ? toBase64(format(template, ctx)) : format(template, ctx);


    link.href = encodeURI(uri + excel);
    link.click();
    $(link).remove();
}