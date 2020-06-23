var tto = {}
tto.library =
{
    guid: function () {
        var result, i, j;
        result = '';
        for (j = 0; j < 32; j++) {
            if (j == 8 || j == 12 || j == 16 || j == 20)
                result = result + '-';
            i = Math.floor(Math.random() * 16).toString(16).toUpperCase();
            result = result + i;
        }
        return result;
    },
    cookies: function () {
        this.getCookie = function (c_name) {
            var i, x, y, ARRcookies = document.cookie.split(";");
            for (i = 0; i < ARRcookies.length; i++) {
                x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
                y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
                x = x.replace(/^\s+|\s+$/g, "");
                if (x == c_name) {
                    return unescape(y);
                }

            }
        }
        this.getValue = function (name, title) {
            var cookie = this.getCookie(name);
            var items = cookie.split("&");
            title = title + "=";
            var len = title.length;
            for (var i = 0; i < items.length; i++) {
                var key = items[i].substr(0, len);
                if (key == title)
                    return items[i].substr(len, items[i].length - len);
                break;

            }
        }
        this.setCookie = function (name, value, expireDays) {
            var exdate = new Date();
            exdate.setDate(exdate.getDate() + expireDays);
            var c_value = escape(value) + ((expireDays == null) ? "" : "; expires=" + exdate.toUTCString());
            document.cookie = name + "=" + c_value;
        }
    },
    exporter: {
        toExcel: function (table, sheet) {
            exportToXls(table);
            return;
            var uri = 'data:application/vnd.ms-excel;base64,'
            var template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" \
                    xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">\
                    <head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name>\
                    <x:WorksheetOptions><x:DisplayGridlines/><x:DisplayRightToLeft/></x:WorksheetOptions>\
                    </x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->\
                    </head><body><table>{table}</table></body></html>';
            //if (!table.nodeType) table = document.getElementById(table)
            var ctx = { worksheet: name || 'Worksheet', table: table }
            window.location.href = uri + tto.library.base64(tto.library.format(template, ctx));
        },

    },
    base64: function (s) { return window.btoa(unescape(encodeURIComponent(s))) },
    format: function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) },
    addCommas: function (val) {
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    setComma: function (val) {
        return tto.library.addCommas(val);
    },
    delCommas: function (txt) {
        while (txt.indexOf(',') > -1)
            txt = txt.replace(',', '');
        return txt;
    },
}



tto.controls = {
    datePicker: {
        set: function () {
            try {
                $(".tto-datepicker")
                    //.jqxMaskedInput({mask: '####/##/##'})
                    .persianDatepicker();
                $(".tto-datepicker:not(.tto-manual)").css({ "min-width": "180px" })
            }
            catch (e) { }
        }
    },
    numeric: {
        set: function () {
            $(".tto-numeric , .tto-numeric-sep").on("keypress", function (event) {
                var code = event.charCode || event.keyCode;
                var txt = $(this).val();
                if (txt.indexOf('.') != -1 && code == 46)
                    event.preventDefault();
                if (code == 46 || code == 8 || code == 9 || code == 27 || code == 13 ||
                    // Allow: Ctrl+A
                    (code == 65 && event.ctrlKey === true) ||
                    // Allow: home, end, left, right
                    (code >= 48 && code < 59)) {
                    // let it happen, don't do anything
                    return;
                } else event.preventDefault();
            });
        },
        set3Disgits: function () {
            $(".tto-numeric-sep").on("keyup", function (event) {
                var $this = $(this);
                var val = $this.val().toString();
                while (val.indexOf(',') != -1)
                    val = val.replace(",", "");
                var pId = $this.attr("mainval");
                if (pId)
                    $("#" + pId).val(val);
                $this.val(val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
            });

        }
    },
    readonly: {
        set: function () {
            $(".tto-readonly")
                .attr("autocomplete", "off")
                .on("keydown", function (event) {
                    event.preventDefault();
                });
        }
    },
    tabPage: {
        set: function () {
            $(".tto-controls-tabpage-tab a").click(function () {
                var $this = $(this);
                var $p = $this.parent();
                if ($this.hasClass('active')) return;
                $p.find("a.active").removeClass('active');
                $this.addClass('active');
                var indx = $this.index();
                var $pgs = $p.next();
                $pgs.children("div").removeClass('active');
                $($pgs.children("div")[indx]).addClass('active');
            });
            $(".tto-controls-tabpage-tab a").removeClass("active");
            $(".tto-controls-tabpage-tab a:first-child").addClass("active");
            $(".tto-controls-tabpage-pages div:first-child").addClass("active");
        }
    },
    loading: {
        set: function () {
            if ($("form").length > 0) {
                $("form").on("submit", function () {
                    wffCore.loader.start("body", "در حال انجام عملیات");
                });
            }
        }
    },
    //tooltip: {
    //    set: function () {
    //        $('[data-toggle="tooltip"]').tooltip();
    //    }
    //}

}

tto.ui = {}
/// *-*-*-*-*-*-*-*-*-*-*  Grid  Defination
tto.ui.grid =
    {
        grids: {
            items: [],
            find: function (g) {
                for (var i = 0; i < tto.ui.grid.grids.items.length; i++) {
                    var grd = tto.ui.grid.grids.items[i];
                    if (grd.element[0] == g)
                        return grd;
                }
                return null;
            }
        },
        properties: {
            pageSize: 50,
            pageable: false,
            sortable: true,
            width: "100%",
            height: 500,
            autoheight: false,
            filterable: true,
            filterMode: 'default',
            showfilterrow: false,
            editable: false,
            selectionmode: 'singlerow',
            rtl: true,
            altrows: true,
            columnresize: true,
            groupable: false,
            click: null,
            select: null,
            colAlign: 'center',
            cellAlign: 'center',
            dblClick: null,
            bindingcomplete: null,
            showstatusbar: false,
            statusbarheight: 0,
            showaggregates: false,
            groups: [],
            rowdetails: false,
            rowsheight: 30,
            initrowdetails: null,
            rowdetailstemplate: null,
            ready: null,
            hierarchy: null,
            pagesizeoptions: ['25', '50', '75', '100', '500', '1000'],
            enabletooltips: false,
            pageChanged: null,
            pageSizeChanged: null,
            totalRecords: null,
            pageNum: 0,
        }
    ,
        gridView: function (elm) {
            /// prevent grid element
            this.element = elm;
            this.selectedIndex = -1;
            this.isTree = false;
            this.treeData = {
                key: null,
                row: null
            };
            this.dataAdapter = null;
            this.options = null;
            /// fields is array of tto.ui.gridField
            /// sourceMethod is method that calls for bind grid
            /// option is same as tto.ui.gridProperties
            this.refreshData = function () { $(this.element).jqxGrid('refreshData'); }
            this.refresh = function () { $(this.element).jqxGrid('refresh'); }
            this.reload = function () { $(this.element).jqxGrid('updatebounddata'); }
            this.load = function (keyField, fields, sourceMethod, options, data, dontCallAjax, columnGroups) {
                var that = this;
                var p = $.extend(tto.ui.grid.properties, options, {});
                this.options = p;
                if (p.showaggregates) {
                    p.showstatusbar = true;
                    p.statusbarheight = 25;
                }
                var cols = [];
                var colGroups = [];
                var Fields = [];
                for (var i = 0; i < fields.length; i++) {
                    if (fields[i] instanceof tto.ui.grid.gridField) {
                        Fields.push({ name: fields[i].fieldName, type: fields[i].type });
                        var col = {
                            text: fields[i].headerText,
                            datafield: fields[i].fieldName,
                            width: fields[i].width,
                            autoheight: fields[i].autoheight,
                            align: p.colAlign, cellsalign: p.cellAlign,
                            columntype: fields[i].type,
                            columngroup: fields[i].columngroup,
                            cellsformat: fields[i].format ? fields[i].format : null,
                            cellsrenderer: fields[i].cellsrenderer,
                            renderer: fields[i].colrenderer,
                            filterable: fields[i].options.filterable,
                            sortable: fields[i].options.sortable,
                            groupable: fields[i].options.groupable,
                            search: fields[i].options.search,
                            menu: fields[i].options.menu,
                            editable: fields[i].options.editable,
                            rendered: fields[i].options.colrendered,
                            aggregates: fields[i].options.aggregate,
                            aggregatesrenderer: fields[i].options.aggregatesrenderer,
                        };
                        var w = fields[i].width;
                        if (w == null || w == undefined || w == NaN) {
                            delete col.width;
                        }
                        cols.push(col);

                    } else if (fields[i] instanceof tto.ui.grid.gridFieldOPT) {
                        var f = fields[i];
                        var o = f.getCol();
                        Fields.push({ name: f.options.fieldName, type: f.options.type });
                        cols.push(o);
                    } else cols.push(fields[i]);
                }
                if (columnGroups && columnGroups.length > 0)
                    for (var i = 0; i < columnGroups.length; i++) {
                        try {
                            if (columnGroups[i].getCol)
                                colGroups.push(columnGroups[i].getCol());
                        } catch (e) { console.log(e); }

                    }
                colGroups = colGroups.length == 0 ? null : colGroups;
                ///// set source

                var source = null;
                if (sourceMethod.localdata) {
                    source = {
                        datatype: sourceMethod.datatype,
                        datafields: Fields, id: keyField,
                        localdata: sourceMethod.localdata,
                        totalrecords: !p.totalRecords ? sourceMethod.length : p.totalRecords,
                        pagenum: p.pageNum ? p.pageNum : 0,
                        pagesize: p.pageSize,
                    };
                } else if (sourceMethod.constructor === Array) {
                    source = {
                        datatype: "array",
                        datafields: Fields,
                        id: keyField,
                        localdata: sourceMethod,
                        totalrecords: !p.totalRecords ? sourceMethod.length : p.totalRecords,
                        pagenum: p.pageNum ? p.pageNum : 0,
                        pagesize: p.pageSize,

                    };
                } else {
                    source = {
                        datatype: "json",
                        datafields: Fields,
                        id: keyField, url:
                        sourceMethod, data: data,
                        totalrecords: !p.totalRecords ? sourceMethod.length : p.totalRecords,
                        pagenum: p.pageNum ? p.pageNum : 0,
                        pagesize: p.pageSize,
                    };
                }
                //source.beforeprocessing = function (data) {
                //    if (!p.totalRecords)
                //        source.totalrecords = data.length;
                //    else
                //        source.totalrecords = p.totalRecords;
                //}
                ///----------------------------------------
                this.dataAdapter = new $.jqx.dataAdapter(source);
                var $this = $(this.element);
                var hgt = 0;
                if ($(".tto-main").length > 0)
                    hgt = $(".tto-main").height() - 10;
                else
                    hgt = $(this.element).parent().height();
                if (p.hierarchy != null) {
                    source.hierarchy = p.hierarchy;
                    this.isTree = true;
                    $this.css({ "font-family": "tahoma" }).jqxTreeGrid(
                      {
                          width: p.width,
                          source: dontCallAjax ? {} : this.dataAdapter,
                          columns: cols,
                          columnGroups: colGroups,
                          theme: p.theme,
                          pageSize: p.pageSize,
                          //pageNum: p.pageNum,
                          sortable: p.sortable,
                          filterable: p.filterable,
                          filterMode: p.filterMode,
                          //showfilterrow: p.showfilterrow,
                          pageable: p.pageable,

                          columnsResize: p.columnresize,
                          rtl: p.rtl,

                          selectionMode: p.selectionmode,
                          //groupable: p.groupable,
                          editable: p.editable,
                          showStatusbar: p.showstatusbar,
                          statusBarHeight: p.statusbarheight,
                          showAggregates: p.showaggregates,
                          checkboxes: p.checkboxes,
                          pageSizeOptions: p.pagesizeoptions,
                          //pagermode: 'simple',
                          //groups: p.groups,
                          //bindingcomplete: p.bindingcomplete
                          height: (p.height != null && p.height != NaN && p.height != undefined) ? p.height : hgt
                      }).bind('bindingcomplete', function () {
                          this.bindComplete(p, this);
                          //$(this).find("#contenttablegrid td").css({ direction: "rtl" }); 
                      });

                    if (p.pageChanged)
                        $this.on("pagechanged", p.pageChanged);
                    if (p.pageSizeChanged)
                        $this.on("pagesizechanged", p.pageSizeChanged);

                    this.bindComplete(p, $this);
                    $this.on('rowSelect', function (event) {
                        var args = event.args;
                        that.treeData.row = args.row;
                        that.treeData.key = args.key;
                    });

                }
                else {
                    if (!p.rowsheight)
                        delete p.rowsheight;
                    if (!p.rowdetails) {
                        delete p.initrowdetails;
                        delete p.rowdetailstemplate;
                    }
                    $this.css({ "font-family": "tahoma" }).jqxGrid(
                    {
                        width: p.width,
                        source: dontCallAjax ? {} : this.dataAdapter,
                        columns: cols,
                        columngroups: colGroups,
                        theme: p.theme,
                        filterMode: p.filterMode,
                        pagesize: p.pageSize,
                        sortable: p.sortable,
                        filterable: p.filterable,
                        showfilterrow: p.showfilterrow,
                        autoheight: p.autoheight,
                        pageable: p.pageable,
                        columnsresize: p.columnresize,
                        rtl: p.rtl,
                        selectionmode: p.selectionmode,
                        groupable: p.groupable,
                        editable: p.editable,
                        showstatusbar: p.showstatusbar,
                        statusbarheight: p.statusbarheight,
                        showaggregates: p.showaggregates,
                        groups: p.groups,
                        rowdetails: p.rowdetails,
                        rowsheight: p.rowsheight,
                        initrowdetails: p.initrowdetails,
                        rowdetailstemplate: p.rowdetailstemplate,
                        ready: dontCallAjax ? null : p.ready,
                        pagesizeoptions: p.pagesizeoptions,
                        virtualmode: true,
                        rendergridrows: function (obj) {
                            return obj.data;
                        },
                        enabletooltips: p.enabletooltips,
                        height: (p.height != null && p.height != NaN && p.height != undefined) ? p.height : hgt
                    }).bind('bindingcomplete', function (elm) {
                        that.bindComplete(p, this);
                    });
                    if (p.pageChanged)
                        $this.on("pagechanged", p.pageChanged);
                    if (p.pageSizeChanged)
                        $this.on("pagesizechanged", p.pageSizeChanged);

                    try {
                        this.bindComplete(p, $this);
                    } catch (e) {

                    }

                    $this.bind('rowselect', function (event) {
                        var d = event.currentTarget;
                        var grd = tto.ui.grid.grids.find(d);
                        if (grd)
                            grd.selectedIndex = event.args.rowindex
                    });
                    if (p.dblClick)
                        $this.on('rowdoubleclick', p.dblClick);
                }

                if (p.bindingcomplete) {
                    $this.bind('bindingcomplete', p.bindingcomplete);
                }

                if (p.select)
                    $this.bind('rowselect', function (event) {
                        var data = event.args.row;
                        var index = event.args.rowindex;
                        var key = data.uid;
                        p.select(index, key, data);
                    });
                if (p.unselect)
                    $this.bind('rowunselect', function (event) {
                        var data = event.args.row;
                        var index = event.args.rowindex;
                        var key = data.uid;
                        p.unselect(index, key, data);
                    });



            }
            this.bindComplete = function (p, elm) {
                try {

                    jQuery('.tipso').tipso({
                        position: 'top',
                        background: '#55b555',
                        color: '#eee',
                        useTitle: false,
                        size: 'small',
                        contentElementId: 'template_sample',
                        onBeforeShow: function (ele, tipso) {
                            ele.tipso('update', 'content', '');
                        }
                    });


                } catch (e) { }
                if (p.rtl)
                    $(".jqx-grid-pager div , .jqx-grid-groups-row").css({ 'white-space': 'nowrap', 'direction': 'rtl', 'text-align': 'right' });

                var localizationobj = {};
                filterstringcomparisonoperators = ['تهی', 'تهی نباشد', 'شامل باشد', 'شامل(مورد همسان)',
                        'شامل نباشد', 'شامل نباشد(مورد همسان)', 'شروع شود با', 'شروع شود با(مورد همسان)',
                        'پایان یابد با', 'پایان یابد با(مورد همسان)', 'برابر باشد با', 'برابر باشد با(مورد همسان)', 'null', 'not null'];
                filternumericcomparisonoperators = ['برابر باشد با', 'برابر نباشد با', 'کمتر از', 'کمتر یا مساوی', 'بیشتر از', 'بیشتر یا مساوی', 'null', 'not null'];
                filterdatecomparisonoperators = ['برابر باشد با', 'برابر نباشد با', 'کمتر از', 'کمتر یا مساوی', 'بیشتر از', 'بیشتر یا مساوی', 'null', 'not null'];
                filterbooleancomparisonoperators = ['برابر باشد با', 'برابر نباشد با'];
                localizationobj.filterstringcomparisonoperators = filterstringcomparisonoperators;
                localizationobj.filternumericcomparisonoperators = filternumericcomparisonoperators;
                localizationobj.filterdatecomparisonoperators = filterdatecomparisonoperators;
                localizationobj.filterbooleancomparisonoperators = filterbooleancomparisonoperators;
                localizationobj.sortascendingstring = "مرتب سازی صعودی";
                localizationobj.sortdescendingstring = "مرتب سازی نزولی";
                localizationobj.sortremovestring = "حذف مرتب سازی";
                localizationobj.pagergotopagestring = "برو به صفحه",
                localizationobj.pagershowrowsstring = "تعداد نمایش در صفحه",
                localizationobj.pagerrangestring = " از ",
                localizationobj.pagerpreviousbuttonstring = "بعدی",
                localizationobj.pagernextbuttonstring = "قبلی",
                localizationobj.groupsheaderstring = "یک ستون را به اینجا کشیده تا بر اساس آن گروه بندی شود",
                localizationobj.groupbystring = "گروه بندی بر پایه این ستون",
                localizationobj.groupremovestring = "حذف از گروه ها",
                localizationobj.filterclearstring = "پاک کردن",
                localizationobj.filterstring = "فیلتر",
                localizationobj.filtersearchstring = "جستجو:",
                localizationobj.filtershowrowstring = "نمایش ردیفهایی که",
                localizationobj.filtershowrowdatestring = "نمایش ردیفهایی که تاریخ ",
                localizationobj.filterorconditionstring = "یا",
                localizationobj.filterandconditionstring = "و",
                localizationobj.filterselectallstring = "(انتخاب همه)",
                localizationobj.filterchoosestring = "لطفا انتخاب کنبد",
                localizationobj.search = "جستجو",
                localizationobj.loadtext = "در حال فراخوانی اطلاعات...",
                localizationobj.clearstring = "پاک کردن",
                localizationobj.todaystring = "امروز",
                localizationobj.emptydatastring = 'داده ای برای نمایش موجود نیست',

                // apply localization.
                $(elm).jqxGrid('localizestrings', localizationobj);
            }
            this.destroy = function () {
                var grd = tto.ui.grid.grids.find(this.element.length && this.element.length > 0 ? this.element[0] : this.element);
                if (grd) {
                    if (this.isTree)
                        $(this.element).jqxTreeGrid('destroy');
                    else
                        $(this.element).jqxGrid('destroy');
                }
            }
            this.selectedRow = function () {
                if (this.selectedIndex == -1) return null;
                var data = this.dataAdapter.loadedData[this.selectedIndex];
                return data;
                //return $(this.element).jqxGrid('getrowdata', this.selectedIndex);
            }
            this.selectedRows = function () {
                if (this.isTree)
                    return $(this.element).jqxTreeGrid('getSelection');
                var indxes = $(this.element).jqxGrid('selectedrowindexes');
                var data = [];
                for (var i = 0; i < indxes.length; i++) {
                    data.push(this.dataAdapter.loadedData[indxes[i]]);
                }
                return data;
                //return $(this.element).jqxGrid('getrowdata', this.selectedIndex);
            }

            this.getAtIndex = function (index) {
                var data = this.dataAdapter.loadedData[index];
                return data;
            }

            this.columns = function (calcGroups) {
                var cols = [];
                if (this.isTree)
                    cols = $(this.element).jqxTreeGrid("columns").records;
                else
                    cols = $(this.element).jqxGrid("columns").records;
                cols = _.filter(cols, function (col) {
                    return ((col.datafield && col.datafield !== "") || col.text === "ردیف") &&
                    (col.hidden === null || col.hidden === undefined || !col.hidden);
                }).reverse();
                var firstRow = [];

                if (!calcGroups) {
                    _.each(cols, function (col) {
                        var obj = new Object();
                        obj.field = col.datafield;
                        obj.text = col.text;
                        obj.group = col.columngroup;
                        obj.name = null;
                        obj.isGroup = false;
                        obj.childs = [];
                        firstRow.push(obj);
                    });
                    return firstRow;
                }


                _.each(cols, function (col) {
                    if (col.columngroup === null || col.columngroup === undefined || col.columngroup.length === 0) {
                        var obj = new Object();
                        obj.field = col.datafield;
                        obj.text = col.text;
                        obj.group = col.columngroup;
                        obj.name = null;
                        obj.isGroup = false;
                        obj.childs = [];
                        firstRow.push(obj);
                    }
                });
                var gCols = [];
                if (this.isTree)
                    gCols = $(this.element).jqxTreeGrid("columnGroups");
                else
                    gCols = $(this.element).jqxGrid("columngroups");
                var maxDepth = 1;
                _.each(gCols,
                    function (col) {
                        if (col.columngroup === null || col.columngroup === undefined || col.columngroup.length === 0) {
                            var obj = new Object();
                            obj.field = col.datafield;
                            obj.text = col.text;
                            obj.group = col.columngroup;
                            obj.isGroup = true;
                            obj.name = col.name;
                            obj.childs = calcSubColumns(obj, gCols, cols);
                            //obj.depth = 0;
                            //if (obj.childs && obj.childs.length > 0)
                            //    _.each(obj.childs, function (c) {
                            //        if (c.depth > obj.depth)
                            //            obj.depth = c.depth;
                            //    });
                            //else
                            //    obj.depth = 1;
                            if (obj.depth > maxDepth)
                                maxDepth = obj.depth;
                            firstRow.push(obj);
                        }
                    });
                _.each(firstRow, function (item) {
                    if (!item.isGroup)
                        item.depth = maxDepth;
                });
                return firstRow;
            }
            /*یادم باشد که داشتم ساختار درختی و اسه کالمن ها طراحی می کردم که متد ساخت زیر شاخه ها مونده بود*/
            function calcSubColumns(col, gCols, cols) {
                var childs = [];
                col.depth = 0;
                _.each(gCols, function (sgCol) {
                    if (sgCol.columngroup === col.name) {
                        var obj = new Object();
                        obj.depth = 0;
                        obj.field = sgCol.datafield;
                        obj.text = sgCol.text;
                        obj.isGroup = true;
                        obj.name = sgCol.name;
                        obj.group = sgCol.columngroup;
                        obj.childs = calcSubColumns(obj, gCols, cols);
                        childs.push(obj);
                    }
                });
                _.each(cols, function (sgCol) {
                    if (sgCol.columngroup === col.name) {
                        var obj = new Object();
                        obj.field = sgCol.datafield;
                        obj.text = sgCol.text;
                        obj.isGroup = false;
                        obj.group = sgCol.columngroup;
                        obj.childs = null;
                        obj.name = null;
                        obj.depth = 1;
                        childs.push(obj);
                    }
                });
                if (childs && childs.length > 0)
                    _.each(childs, function (c) {
                        if (c.depth > col.depth)
                            col.depth = c.depth + 1;
                    });
                else
                    col.depth = 1;
                return childs;
            }

            this.columngroups = function () {
                if (this.isTree)
                    return $(this.element).jqxTreeGrid("columnGroups");
                else
                    return $(this.element).jqxGrid("columngroups");
            }
            this.groups = function (grp) {
                if (grp) {
                    $(this.element).jqxTreeGrid({ "groups": grp });
                }
                else {
                    return $(this.element).jqxGrid("groups");
                }
            }
            this.records = function () {
                if (this.isTree)
                    return $(this.element).jqxTreeGrid('getRows');
                else
                    return $(this.element).jqxGrid('getrows');
            }
            this.groupedRecords = function (groups) {
                //return this.dataAdapter.getGroupedRecords(groups, 'items', null, null);
                var res = this.dataAdapter.getGroupedRecords(groups, 'items', null, null);
                var obj = new Object();
                obj.columns = this.columns();
                obj.groups = groups;
                obj.items = [];
                for (var i = 0; i < res.length; i++) {
                    row = res[i];
                    if (row.items)
                        obj.items.push(this.getChildsOfGroup(obj, row));
                    else
                        obj.items.push(this.getChildObject(row));
                }
                return obj;
                //dataAdapter.getGroupedRecords(['Country', 'City'], 'items', 'label', [{ name: 'CompanyName', map: 'label' }]);
            }
            this.getChildsOfGroup = function (masterObject, grp) {
                var res = new Object();
                res.value = grp.group;
                res.field = masterObject.groups[grp.level];
                res.level = grp.level;
                for (var i = 0; i < masterObject.columns.length; i++) {
                    if (masterObject.columns[i].field == res.field) {
                        res.column = masterObject.columns[i];
                        break;
                    }
                }
                res.items = [];
                for (var i = 0; i < grp.items.length; i++) {
                    var row = grp.items[i];
                    if (row.items)
                        res.items.push(this.getChildsOfGroup(masterObject, row));
                    else
                        res.items.push(this.getChildObject(row));
                }
                return res;
            }
            this.getChildObject = function (item) {
                delete item.parentItem;
                delete item.leaf;
                delete item.level;
                delete item.uid;
                return item;
            }
            this.getHtml = function () {
                var headerCells = this.columns(true);
                var pureHeaders = this.columns(false);
                //headerCells.forEach(function (elm) {
                //    headerCells.push($(elm).text());
                //});
                //var $rowsContent = $("#divGrid .jqx-grid-content > div > div[role='row']");
                var grp = this.groups();
                var rows = [];
                if (grp && grp.length > 0)
                    rows = this.groupedRecords(grp);
                else
                    rows = this.records();
                var resRows = [];
                if (rows.items) {
                    if (rows && rows.items && rows.items.length > 0)
                        for (var i = 0; i < rows.items.length ; i++) {
                            resRows = resRows.concat(this.getHtmlRows(rows.items[i], pureHeaders));
                        }
                } if (rows.length && rows.length > 0) {
                    for (var i = 0; i < rows.length ; i++) {
                        resRows = resRows.concat(this.getHtmlRows(rows[i], pureHeaders));
                    }
                }
                rows = resRows;
                //rows.forEach(function (elm) {
                //        if (elm.)
                //        var cells = [];
                //        $(elm).find("div[role='gridcell']").each(function (cellIndx, cell) {
                //            cells.push($(cell).text());
                //        });
                //        rows.push(cells);
                //    });
                var $footer = $("#divGrid .jqx-grid-statusbar > div > div");
                if ($footer.length <= 0)
                    $footer = $("#grid .jqx-grid-statusbar > div > div");
                var footerCells = [];
                if ($footer && $footer.length > 0) {
                    $footer.each(function (indx, ft) {
                        footerCells.push($(ft).text());
                    });
                }
                footerCells.reverse();

                var exTable = "<table style='direction:ltr; font-family:tahoma; border:2px solid #232323; font-size:8px;'>^^TABELDATA^^</table>";
                var exRow = "<tr>^^DATA^^</tr>";
                var exTH = "<th style='text-align:center; background-color:#a4bed4; font-size:9pt; border:0.5pt solid #232323;' rowspan='^^ROWSPAN^^' colspan='^^COLSPAN^^' >^^DATA^^</th>";
                var exCell = "<td style='text-align:center; font-size:8pt; border:0.5pt solid #232323;' field='^^field^^'>^^DATA^^</td>";

                var header = "";
                var rowCount = 1;
                //if (headerGroups !== null && headerGroups.length > 0)
                //    rowCount = 2;
                //if (headerCells.length > 0) {
                //    var hCells = "";
                //    headerCells.forEach(function (item) {
                //        var rowSpan = rowCount == 1 ? 1 : (item.group) ? 1 : 2;
                //        hCells += exTH
                //            .replace("^^DATA^^", item.text ? item.text : "")
                //            .replace("^^ROWSPAN^^", rowSpan);
                //    });
                header = getHeaderHtml(headerCells);

                var rowsHTML = "";
                if (rows.length > 0) {
                    rows.forEach(function (row) {
                        rCells = "";
                        for (var i = 0; i < row.length; i++) {
                            rCell = row[i];
                            rCells += exCell.replace("^^DATA^^", rCell).replace("^^field^^", pureHeaders[i].field);
                        }
                        //row.forEach(function (rCell) {

                        //});
                        rowsHTML += exRow.replace("^^DATA^^", rCells);
                    });
                }

                var footer = "";
                if (footerCells.length > 0) {
                    var fCells = "";
                    footerCells.forEach(function (item) {
                        fCells += exTH.replace("^^DATA^^", item);
                    });
                    footer = exRow.replace("^^DATA^^", fCells);
                }
                exTable = exTable.replace("^^TABELDATA^^", header + rowsHTML + footer);
                //console.log(exTable);
                return exTable;
            }

            var getHeaderHtml = function (columns) {
                var exRow = "<tr>^^DATA^^</tr>";
                var exTH = "<th style='text-align:center; background-color:#a4bed4; font-size:9pt; border:0.5pt solid #232323;' rowspan='^^ROWSPAN^^' colspan='^^COLSPAN^^' >^^DATA^^</th>";
                var rows = "";
                var ths = "";
                var nextRow = [];
                _.each(columns, function (col) {
                    ths += exTH
                        .replace("^^ROWSPAN^^", col.childs && col.childs.length > 0 ? col.depth - 1 : col.depth)
                        .replace("^^COLSPAN^^", col.childs ? col.childs.length : 1)
                        .replace("^^DATA^^", col.text);
                    if (col.childs && col.childs.length > 0)
                        _.each(col.childs, function (ncol) { nextRow.push(ncol); });
                });
                rows += exRow.replace("^^DATA^^", ths);
                if (nextRow && nextRow.length > 0)
                    rows += getHeaderHtml(nextRow);
                return rows;

            }
            this.getRowsData = function () {
                if (this.isTree)
                    return $(this.element).jqxTreeGrid('getRows');
                return $(this.element).jqxGrid('getrowdata', indx);
            }
            this.getRowData = function (indx) {
                if (this.isTree)
                    return $(this.element).jqxTreeGrid('getRows')[indx];
                return $(this.element).jqxGrid('getrowdata', indx);
            }
            this.getRowsCount = function () {
                //var datainformations = $(this.element).jqxGrid("getdatainformation");
                //return datainformations.rowscount;
                return this.records().length;
            }
            this.clearSelection = function () {
                if (this.isTree)
                    $(this.element).jqxTreeGrid('clearSelection');
                else
                    $(this.element).jqxGrid('clearselection');
            }
            this.getHtmlRows = function (rowObj, baseCols) {
                var rowRes = [];
                if (rowObj && rowObj.items && rowObj.items.length > 0) {
                    var cols = [];
                    for (var i = 0; i < baseCols.length; i++) {
                        if (i == rowObj.level)
                            cols.push("<b style='font-size:9pt;'>" + rowObj.column.text + "  :  <i>" + rowObj.value + "</i></b>");
                        else
                            cols.push("");
                    }
                    rowRes.push(cols);
                    for (var j = 0; j < rowObj.items.length; j++)
                        if (rowObj.items[j] && rowObj.items[j].items && rowObj.items[j].items.length > 0)
                            rowRes = rowRes.concat(this.getHtmlRows(rowObj.items[j], baseCols));
                        else
                            rowRes.push(this.getHtmlRows(rowObj.items[j], baseCols)[0]);
                }
                else {
                    var cols = [];
                    for (var i = 0; i < baseCols.length; i++) {
                        var col = baseCols[i];
                        if (col.field)
                            cols.push(rowObj[col.field]);
                        else
                            cols.push("");
                    }
                    rowRes.push(cols);
                }
                return rowRes;
            }
            this.getJson = function () {

            }
            this.selectRow = function (indx) {
                if (this.isTree)
                    $(this.element).jqxTreeGrid("selectRow", indx);
                else
                    $(this.element).jqxGrid("selectrow", indx);
            }
            this.showColumn = function (columnName) {
                if (this.isTree)
                    $(this.element).jqxTreeGrid('showColumn', columnName);
                else
                    $(this.element).jqxGrid('showcolumn', columnName);

            }
            this.hideColumn = function (columnName) {
                if (this.isTree)
                    $(this.element).jqxTreeGrid('hideColumn', columnName);
                else
                    $(this.element).jqxGrid('hidecolumn', columnName);

            }
            this.updateRow = function (rowId, newRow) {
                if (this.isTree)
                    $(this.element).jqxTreeGrid('updateRow', rowId, newRow);
                else
                    $(this.element).jqxGrid('updaterow', rowId, newRow);
            }
            this.collapseRow = function (rowId) {
                if (this.isTree)
                    $(this.element).jqxTreeGrid('collapseRow', rowId);

            }
            this.expandRow = function (rowId) {
                if (this.isTree)
                    $(this.element).jqxTreeGrid('expandRow', rowId);
            }
            tto.ui.grid.grids.items.push(this);
            return this;
        },
        gridField: function (fieldName, headerText, width, type, format, cellsrenderer, colrenderer, options) {
            this.default = {
                sortable: true,
                groupable: true,
                filterable: true,
                filtertype: 'input',//checkedlist, range, number, bool
                search: false,
                menu: true,
                editable: false,
                colrendered: null,
                aggregate: null,
                aggregatesrenderer: null
            };

            this.fieldName = fieldName;
            this.headerText = headerText;
            this.width = width;
            this.type = type ? type : "string";
            this.format = format;
            this.cellsrenderer = cellsrenderer;
            this.colrenderer = colrenderer;
            this.options = $.extend(this.default, options, {});
            if (this.width == null || this.width == undefined || this.width == NaN || this.width == -1)
                delete this.width;
        },
        gridFieldOPT: function (options) {
            this.default = {
                name: "",
                fieldName: "",
                headerText: "",
                width: null,
                height: null,
                type: "string",
                format: null,
                cellsrenderer: null,
                colrenderer: null,
                sortable: true,
                groupable: true,
                filterable: true,
                columngroup: null,
                filtertype: 'input',//checkedlist, range, number, bool
                colAlign: "center",
                cellAlign: "center",
                editable: false,
                click: null,
                dblclick: null,
                rendered: null,
                search: false,
                menu: false,
                aggregate: false,
                aggregatesrenderer: false,
                hidden: false,
                parentgroup: '',
                columntype: null,
                initeditor: null
            };
            this.options = $.extend(this.default, options, {});
            this.getCol = function () {
                var p = this.options;
                var o = {
                    name: p.name,
                    text: p.headerText,
                    datafield: p.fieldName,
                    align: p.colAlign,
                    cellsalign: p.cellAlign,
                    columntype: p.columntype,
                    columngroup: p.columngroup,
                    cellsformat: p.format ? p.format : null,
                    cellsrenderer: p.cellsrenderer,
                    renderer: p.colrenderer,
                    filterable: p.filterable,
                    filtertype: p.filterable,
                    sortable: p.sortable,
                    groupable: p.groupable,
                    search: p.search,
                    menu: p.menu,
                    editable: p.editable,
                    rendered: p.colrendered,
                    aggregates: p.aggregate,
                    aggregatesrenderer: p.aggregatesrenderer,
                    height: p.height,
                    hidden: p.hidden,
                    width: p.width,
                    parentgroup: p.parentgroup,
                    initeditor: p.initeditor
                };
                if (o.width == null || o.width == undefined || o.width == NaN)
                    delete o.width;
                return o;
            }
        }

    }

tto.ui.treeGrid = {

}

/// *-*-*-*-*-*-*-*-*-*-*  Combo Box Defination
tto.ui.comboBox =
{
    setAll: function () {
        var $ddls = $("select.tto-combobox");
        $ddls.each(function (index, elm) {
            var wdth = $(elm).width();
            var hgt = $(elm).height();
            var cmb = new tto.ui.comboBox.comboBox(elm);
            cmb.loadFromSelect({
                width: wdth,
                height: hgt
            });
        });
    },
    comboProperties:
        {
            Combos: {
                items: [],
                find: function (g) {
                    for (var i = 0; i < tto.ui.comboBox.Combos.items.length; i++) {
                        var Com = tto.ui.comboBox.Combos.items[i];
                        if (Com.element[0] == g)
                            return Com;
                    }
                    return null;
                }
            },
            selectedIndex: null,
            width: 150,
            //height: "150px",
            renderStyle: null,
            searchMode: "contains",
            placeHolder: "انتخاب نمایید",
            //multiSelect: true,
            //checkboxes: true,
            theme: "bootstrap",
            autoComplete: true,
            html: null,
            rtl: true
        },
    comboBox: function (elm) {
        this.element = elm;
        this.selectedIndex = function (val) {
            if (val != null && val != undefined)
                $(this.element).jqxComboBox({ selectedIndex: val * 1 });
            else
                return $(this.element).jqxComboBox('selectedIndex');
        };
        this.dataAdapter = null;
        /// fields is array of tto.ui.gridField
        /// sourceMethod is method that calls for bind grid
        /// option is same as tto.ui.gridProperties
        this.load = function (keyField, Fields, sourceMethod, options) {
            var p = $.extend(tto.ui.comboBox.comboProperties, options, {});
            var flds = [];
            for (var i = 0; i < Fields.length; i++)
                flds.push({ name: Fields[i] });
            var source =
            {
                datatype: "json",
                datafields: flds,
                url: sourceMethod,
                id: keyField
            }

            var dataAdapter = new $.jqx.dataAdapter(source);
            var $this = $(this.element);


            $this.jqxComboBox(
                {
                    width: p.width,
                    height: p.height,
                    source: dataAdapter,
                    selectedIndex: p.selectedIndex,
                    //displayMember: Fields,
                    valueMember: keyField,
                    theme: p.theme,
                    renderer: function (index, label, value) {
                        var item = dataAdapter.records[index];
                        if (item != null) {
                            var lbl = p.renderStyle;
                            for (var i = 0; i < Fields.length; i++) {
                                lbl = lbl.replace('{' + i + '}', item[Fields[i]]);
                            }
                            return lbl;
                        }
                        return "";
                    },
                    renderSelectedItem: function (index, item) {
                        var item = dataAdapter.records[index];
                        if (item != null) {
                            var lbl = p.renderStyle;
                            for (var i = 0; i < Fields.length; i++) {
                                lbl = lbl.replace('{' + i + '}', item[Fields[i]]);
                            }
                            return lbl;
                        }
                        return "";
                    },
                });

            this.dataAdapter = dataAdapter;

            $this.bind('getSelectedIndex', function (event) {
                var d = event.currentTarget;
                var Comb = tto.ui.comboBox.Combs.find(d);
                if (Comb)
                    Comb.selectedIndex = event.args.rowindex
            });
            //if (p.select)
            //    $this.bind('rowselect', p.select);
        }
        //this.selectedValue = $("#jqxComboBox").jqxComboBox('getSelectedIndex');
        this.loadFromSelect = function (options) {
            var p = $.extend(tto.ui.comboBox.comboProperties, options, {});
            var $elm = $(this.element);
            var s = $elm.val();
            var indx = $elm.find("option[value='" + s + "']").index();
            $elm.jqxComboBox({
                width: p.width,
                height: p.height,
                selectedIndex: indx,
                theme: p.theme,
                searchMode: p.searchMode,
                autoComplete: p.autoComplete,
                placeHolder: p.placeHolder,
                rtl: p.rtl
            });
            //this.selectedValue(indx);
        }
        this.selectedValue = function () {
            return $(this.element[0]).jqxComboBox('getSelectedIndex');
        }

        //this.setSelected = function () {
        //    var $elm = $(this.element);
        //    var s = $elm.val();
        //    var indx = $elm.find("option[value='" + s + "']").index();
        //    this.selectedValue(indx);
        //}

        this.disabled = function () {
            $(this.element).jqxComboBox({ disabled: true });
        }
        this.enabled = function () {
            $(this.element).jqxComboBox({ disabled: false });
        }
    },

}


/// *-*-*-*-*-*-*-*-*-*-*  Tree  Defination
tto.ui.tree =
    {

        properties: {
            width: "100%",
            height: 400,
            filterable: false,
            rtl: true,
            theme: 'classic',
            click: null,
            select: null,
            checkboxes: false,
            hasThreeStates: false,
            loaded: null
        }
    ,
        treeView: function (elm) {
            this.element = elm;
            this.selectedIndex = -1;
            this.dataAdapter = null;
            this.load = function (keyField, Parentfield, TreeItemName, sourceMethod, options, data) {
                var p = $.extend(tto.ui.tree.properties, options, {});
                var Fields = [];
                Fields.push({ name: keyField, type: "string" });
                Fields.push({ name: Parentfield, type: "string" });
                Fields.push({ name: TreeItemName, type: "string" });
                Fields.push({ name: 'value', type: "int" });
                var localData = null;
                $.ajax({
                    type: "POST",
                    url: sourceMethod,
                    data: JSON.stringify(data),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    timeout: 1000,
                    async: false,
                })
              .done(function (d) {

                  if (d && d.length > 0)
                      for (var i = 0; i < d.length; i++) {
                          d[i].value = d[i][keyField];
                      }
                  localData = d;
              });

                var source =
                   {
                       datatype: "json",
                       datafields: Fields,
                       id: keyField,
                       localdata: localData
                   };

                var dataAdapter = new $.jqx.dataAdapter(source);
                dataAdapter.dataBind();
                this.dataAdapter = dataAdapter;
                var $this = $(this.element);
                var records = dataAdapter.getRecordsHierarchy(keyField, Parentfield, 'items', [{ name: TreeItemName, map: 'label' }]);
                $this.jqxTree(
                    {
                        source: records,
                        width: p.width,
                        theme: p.theme,
                        rtl: p.rtl,
                        checkboxes: p.checkboxes,
                        hasThreeStates: p.hasThreeStates

                    });
                if (p.loaded)
                    p.loaded();
                //$this.on("initialized", p.loaded);
            }

            var $this = $(this.element);
            $this.on('select', function (event) {
                var args = event.args;
                var item = $this.jqxTree('getItem', args.element);
                var label = event.label;

            });

            this.selectedNode = function () {
                var $this = $(this.element);
                var item = $this.jqxTree('getSelectedItem');
                return item;
            }
            this.selectCheckboxNodes = function () {
                var items = $this.jqxTree('getCheckedItems');
                return items;
            }
            this.reload = function () {
                $this.jqxTree('refresh');
            }
            this.refresh = function () {
                $this.jqxTree('refresh');
            }
            this.expandAll = function () {
                $this.jqxTree('expandAll');
            }

            //            tto.ui.tree.treeView.items.push(this);
            //            return this;
        }

    }




tto.showMessage = function (title, text, options, handler) {
    var uId = tto.library.guid();
    this.defs = {
        maxHeight: 300,
        maxWidth: 700,
        minHeight: 100,
        minWidth: 250,
        width: 300,
        height: 150,
        buttons: {
            errorButtons: ["<div class='tds-form-footer'><input style='margin-left: 5px;padding: 5px 20px;position: absolute;bottom: 0;left: 0;margin: 10px;font-family: \"FABYEKAN\";' type='button' class='btn btn-xs btn-warning' value='بستن'/></div>"],
            confirmButtons: [
                "<input style='margin-left: 5px;padding: 5px 20px;position: absolute;bottom: 0;left: 80px;margin: 10px;font-family: \"FABYEKAN\";' type='button' class='btn btn-xs btn-warning' value='تأیید'/>",
                "<input style='margin-left: 5px;padding: 5px 20px;position: absolute;bottom: 0;left: 0;margin: 10px;font-family: \"FABYEKAN\";' type='button' class='btn btn-xs btn-warning' value='انصراف' />"
            ]
        },
        clicks: [
         function () {
             if (handler) {
                 wffCore.popups.destroyLast();
                 handler(true);
             }
         }
            , function () {
                wffCore.popups.destroyLast();
                handler(false);
            }
        ],
        type: 'error'
    };
    title = (title == "") ? "پیام" : title;
    var par = $.extend({}, this.defs, options);
    var content = $("<div id='" + uId + "' style='font-family: \"FABYEKAN\";'></div>");
    var layout = $("<div><div class='tds-message-layout'></div></div>");
    content.append(layout);
    var body = $("<div></div>");
    if (par.type === "error") {
        body.append("<img src='/resources/shared/images/icons/warning.png' style = 'float: right;padding: 10px;' />");
    }
    if (par.type === "confirm") {
        body.append("<img src='/resources/shared/images/icons/warning.png' style = 'float: right;padding: 10px;' />");
    }
    body.append($("<script>$(function(){$('#tds-message-error_wnd_title').css('color','#ff0000');});</script><div class='tds-message-body' style='direction: rtl;text-align: right;float: left;width: 70%;padding-top: 25px;    font-family: \"FABYEKAN\";'>" + text + "</div>"));
    layout.append(body);
    if (par.buttons && par.buttons != null) {
        var bottom = $("<div class='tds-message-buttons'></div>");
        layout.append(bottom);
        if (par.type === "confirm") {
            for (var i = 0; i < par.buttons.confirmButtons.length; i++) {
                var btn = $(par.buttons.confirmButtons[i]);
                btn.addClass("trd-msg-btn");
                if (!btn.hasClass("btn-sm"))
                    btn.addClass("btn-sm");
                bottom.append(btn);
                if (par.clicks && par.clicks[i])
                    btn.on("click", par.clicks[i]);
            }
        }
        if (par.type === "error") {
            for (var i = 0; i < par.buttons.errorButtons.length; i++) {
                var btn = $(par.buttons.errorButtons[i]);
                if (!btn.hasClass("btn-sm"))
                    btn.addClass("btn-sm");
                bottom.append(btn);
                if (par.clicks && par.clicks[i])
                    btn.on("click", par.clicks[i]);
            }
        }
    }

    var windProps = {
        maxHeight: this.defs.maxHeight,
        maxWidth: this.defs.maxWidth,
        minHeight: this.defs.minHeight,
        minWidth: this.defs.minWidth,
        height: this.defs.height,
        width: this.defs.width,
        resizable: false,
        isModal: true,
        modalOpacity: 0.3,
        title: title,
        rtl: true
    };
    if (par.close)
        windProps.close = par.close;
    var res = wffCore.popups.add(content, windProps);
    //content.jqxWindow(windProps);
    return res;

}

//tto.message = {
//    type: {
//        success: 0, info: 1, warning: 2, error: 3
//    },
//    show: function (type, title, text, parent) {
//        var $msg = $("<div class='alert alert-dismissible' role='alert'></div>");
//        $msg.append('<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
//        $msg.append("<h4 style='margin:2px; margin-bottom:4px; font-family:tahoma;'>" + title + "</h4>");
//        $msg.append("<p>" + text + "</p>");
//        var cls = "alert-";
//        switch (type) {
//            case tto.message.type.success:
//                cls += "success"; break;
//            case tto.message.type.info:
//                cls += "info"; break;
//            case tto.message.type.warning:
//                cls += "warning"; break;
//            case tto.message.type.error:
//                cls += "danger"; break;
//            default:
//                cls += "info";
//        }
//        $msg.addClass(cls);
//        $($msg).alert();
//        if (parent)
//            $(parent).prepend($msg);
//        else
//            $(".tto-main").prepend($msg);
//    },
//    hide: function () {
//        $(".alert.alert-dismissible").remove();
//    }
//}

//tto.alert = function (title, message, opt) {
//    if (!opt)
//        opt = { type: "error" };
//    else opt.type = "error";
//    tto.showMessage(title, message, opt, function () { });
//}
//tto.confirm = function (title, message, func, opt) {
//    if (!opt)
//        opt = { type: "confirm" };
//    else opt.type = "confirm";
//    tto.showMessage(title, message, opt, func ? func : function () { });
//}

//tto.message = {
//    type: {
//        success: "success", info: "info", warning: "warning", error: "error", question: "question"
//    },
//    show: function(type, title, text){
//        var _titleBlock = '<div style="font-size: 15px">'+ title +'</div>';
//        var _textBlock = '<div style="font-size: 13px">'+ text +'</div>'; 

//        swal(

//            )
//    }
//}

tto.alert = function (title, message, func, opt) {
    var _titleBlock = '<div style="font-size: 15px">' + title + '</div>';
    var _textBlock = '<div style="font-size: 13px">' + message + '</div>';

    swal({
        title: _titleBlock,
        html: _textBlock,
        type: "warning",
        showCloseButton: true,
        confirmButtonText: '<span style="font-family: "FABYEKAN", Tahoma; text-align: right; direction: rtl ">باشه</span>'
    }).then(function () {
        if (func) func(true);
    });
}

tto.confirm = function (title, message, func, opt) {
    var _titleBlock = '<div style="font-size: 15px">' + title + '</div>';
    var _textBlock = '<div style="font-size: 13px">' + message + '</div>';

    swal({
        title: _titleBlock,
        html: _textBlock,
        type: "question",
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: '<span style="font-family: "FABYEKAN", Tahoma; text-align: right; direction: rtl ">بلی</span>',
        cancelButtonText: '<span style="font-family: "FABYEKAN", Tahoma; text-align: right; direction: rtl;">خیر</span>',
        cancelButtonColor: '#e21d1d'
    }).then(function () {
        if (func) func(true);
    });
}

tto.error = function (title, message, func, opt) {
    var _titleBlock = '<div style="font-size: 15px">' + title + '</div>';
    var _textBlock = '<div style="font-size: 13px">' + message + '</div>';

    swal({
        title: _titleBlock,
        html: _textBlock,
        type: "error",
        showCloseButton: true,
        confirmButtonText: '<span style="font-family: "FABYEKAN", Tahoma; text-align: right; direction: rtl ">باشه</span>',
    }).then(function () {
        if (func) func(true);
    })
}

tto.success = function (title, message, func, opt) {
    var _titleBlock = '<div style="font-size: 15px">' + title + '</div>';
    var _textBlock = '<div style="font-size: 13px">' + message + '</div>';

    swal({
        title: _titleBlock,
        html: _textBlock,
        type: "success",
        showCloseButton: true,
        confirmButtonText: '<span style="font-family: "FABYEKAN", Tahoma; text-align: right; direction: rtl ">باشه</span>',
    }).then(function () {
        if (func) func(true);
    });
}

$(function () {
    tto.controls.datePicker.set();
    tto.controls.numeric.set();
    tto.controls.numeric.set3Disgits();
    tto.controls.readonly.set();
    tto.controls.tabPage.set();
    //tto.controls.tooltip.set();
    tto.ui.comboBox.setAll();
    $(".tto-loading").remove();
});