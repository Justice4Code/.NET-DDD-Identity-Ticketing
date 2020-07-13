'use strict';
// Class definition

var productDataTable = function () {
	//functions
	var self = this;
	this.CartableId = $('#cartable').val();
	// Ticket initializer
	var Ticket = function () {

		var datatable = $('.kt-datatable').KTDatatable({
			// datasource definition
			data: {
				type: 'remote',
				source: {
					read: {
						url: `/Ticket/IndexData/id=${$(self.CartableId)}`,
						map: function (raw) {
							var dataSet = raw;
							if (typeof raw.data !== 'undefined') {
								dataSet = raw.data;
							}
							return dataSet;
						},
					},
				},
				pageSize: 10,
			},

			// layout definition
			layout: {
				scroll: false, // enable/disable datatable scroll both horizontal and vertical when needed.
				// height: 450, // datatable's body's fixed height
				footer: false, // display/hide footer
				icons: {
					pagination: {
						next: 'la la-angle-left',
						prev: 'la la-angle-right',
						first: 'la la-angle-double-right',
						last: 'la la-angle-double-left',
						more: 'la la-ellipsis-h'
					}
				}
			},

			// column sorting
			sortable: true,

			pagination: true,

			search: {
				input: $('#generalSearch'),
			},

			// columns definition
			columns: [
				{
					field: 'ID',
					title: '#',
					sortable: false,
					visible: false,
				}, {
					field: 'UserName',
					title: 'نام کاربری',
					template: function (row) {
						if (row.UserName) {
							return row.UserName;
						} else {
							return '<span class="kt-badge kt-badge--danger kt-badge--inline kt-badge--pill">بدون عنوان </span>';
						}
					}
				}, {
					field: 'Code',
					title: 'کد تیکت',
					template: function (row) {
						if (row.Code) {
							return row.Code;
						} else {
							return '<span class="kt-badge kt-badge--danger kt-badge--inline kt-badge--pill">بدون عنوان </span>';
						}
					}
				}, {
					field: 'Title',
					title: 'عنوان تیکت',
					template: function (row) {
						if (row.Title) {
							return row.Title;
						} else {
							return '<span class="kt-badge kt-badge--danger kt-badge--inline kt-badge--pill">بدون عنوان </span>';
						}
					}
				}, {
					field: 'Status',
					title: 'وضعیت',
					// callback function support for column rendering
					template: function (row) {
						var status = {
							0: { 'title': 'خوانده نشده', 'class': ' kt-badge--danger' },
							1: { 'title': 'در حال بررسی', 'class': ' kt-badge--warning' },
							2: { 'title': 'پاسخ داده شده', 'class': ' kt-badge--info' },
							3: { 'title': 'بسته شده', 'class': ' kt-badge--success' }
						};
						return '<span class="kt-badge ' + status[row.status].class + ' kt-badge--inline kt-badge--pill">' + status[row.status].title + '</span>';
					},
				}, {
					field: 'CreatedDate',
					title: 'تاریخ درج',
					template: function (row) {
						if (row.CreatedDate) {
							let output = "";
							let milli = row.CreatedDate.replace(/\/Date\((-?\d+)\)\//, '$1');
							let date = new Date(parseInt(milli));
							let m = moment(date);
							m.locale('fa');
							output = m.format('ddd') + ' ' + m.format("YYYY/MMMM/DD");

							return output;
						} else {
							return '<span class="kt-badge kt-badge--danger kt-badge--inline kt-badge--pill">بدون تاریخ</span>';
						}
					}
				}, {
					field: 'Actions',
					title: 'عملیات',
					sortable: false,
					width: 110,
					overflow: 'visible',
					autoHide: false,
					template: function (data, i) {
						return '\
						<a href="javascript:;" class="btn btn-sm btn-clean btn-icon btn-icon-md Ticket-reply" title="پاسخ گویی" data-id="'+ data.Id + '">\
							<i class="la la-edit"></i>\
						</a>';
					},
				}],
			translate: {
				records: {
					noRecords: "داده ای برای نمایش یافت نشد!",
					processing: "در حال آماده سازی داده ها، لطفا کمی صبر بفرمایید"
				},
				toolbar: {
					pagination: {
						items: {
							default: {
								first: 'اولین',
								prev: 'قبلی',
								next: 'بعدی',
								last: 'آخرین'
							},
							info: 'شما ردیف های {{start}} تا {{end}} را مشاهده می نمایید از کل {{total}} ردیف'
						}
					}
				}
			}

		});
		//on change ajax reload dt
		$(document).change(function () {
			datatable.reload();
		});
	};

	return {
		// Public functions
		init: function () {
			// init Ticket
			Ticket();
		},
	};
}();

jQuery(document).ready(function () {
	productDataTable.init();
	$(document).on('click', '.Ticket-reply', function () {
		var id = $(this).attr('data-id');
		MegaYadakModal.inst.Modal('#edit', `/Ticket/Reply/${id}`, 900, 400, false);
	});
});