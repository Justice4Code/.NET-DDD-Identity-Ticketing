'use strict';
// Class definition

var productDataTable = function () {
	// Private functions

	// products initializer
	var products = function () {


		var datatable = $('.kt-datatable').KTDatatable({
			// datasource definition
			data: {
				type: 'remote',
				source: {
					read: {
						url: "/CMSSaleCRM/IndexData",
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
					field: 'CartId',
					title: '#',
					sortable: false,
					visible: false,
				}, {
					field: 'OrderCode',
					title: 'شماره پیگیری',
					template: function (row) {
						if (row.OrderCode) {
							return row.OrderCode;
						} else {
							return '<span class="kt-badge kt-badge--danger kt-badge--inline kt-badge--pill">بدون شماره پیگیری</span>';
						}
					}
				}, {
					field: 'Status',
					title: 'وضعیت',
					template: function (row) {
						var strStatus = "";
						switch (row.Status) {
							case 1:
								strStatus = "منتظر تایید";
								break;
							case 2:
								strStatus = "پردازش در انبار";
								break;
							case 3:
								strStatus = "آماده ارسال";
								break;
							case 4:
								strStatus = "در حال جستجو دلیوری"
								break;
							case 5:
								strStatus = "تایید دلیوری"
								break;
							case 6:
								strStatus = "تحویل به پیک";
								break;
							case 7:
								strStatus = "تحویل به مشتری";
								break;
							case 8:
								strStatus = "لغو سفارش";
								break;
							case 9:
								strStatus = "عدم موجودی";
								break;
							case 10:
								strStatus = "عدم امکان ارسال";
								break;
							default:
								strStatus = "نامشخص";
								break;
						}
						return `<span class="kt-badge kt-badge--primary kt-badge--inline kt-badge--pill">${strStatus}</span>`;
					}
				}, {
					field: 'UserRealName',
					title: 'نام خریدار',
					template: function (row) {
						if (row.UserRealName) {
							return row.UserRealName;
						} else {
							return '<span class="kt-badge kt-badge--danger kt-badge--inline kt-badge--pill">بدون نام خریدار</span>';
						}
					}
				}, {
					field: 'HasPaid',
					title: 'وضعیت پرداخت',
					template: function (row) {
						if (row.HasPaid) {
							return '<span class="kt-badge kt-badge--primary kt-badge--inline kt-badge--pill">پرداخت شده</span>';
						} else {
							return '<span class="kt-badge kt-badge--danger kt-badge--inline kt-badge--pill">پرداخت نشده</span>';
						}
					}
				}, {
					field: 'ContainReturn',
					title: 'وضعیت مرجوعی',
					template: function (row) {
						if (row.ContainReturn) {
							return '<span class="kt-badge kt-badge--danger kt-badge--inline kt-badge--pill">مرجوع شده</span>';
						} else {
							return '<span class="kt-badge kt-badge--success kt-badge--inline kt-badge--pill">بدون مرجوعی</span>';
						}
					}
				}, {
					field: 'PersianCreatedDate',
					title: 'تاریخ ثبت در سیستم',
					template: function (row) {
						if (row.PersianCreatedDate) {
							return row.PersianCreatedDate;
						} else {
							return '<span class="kt-badge kt-badge--danger kt-badge--inline kt-badge--pill">بدون تاریخ ثبت در سیستم</span>';
						}
					}
				}, {
					field: 'FinalPrice',
					title: 'جمع قیمت کالاها',
					template: function (row) {
						if (row.FinalPrice) {
							return row.FinalPrice;
						} else {
							return '<span class="kt-badge kt-badge--danger kt-badge--inline kt-badge--pill">بدون جمع قیمت کالاها</span>';
						}
					}
				}, {
					field: 'Mobile',
					title: 'موبایل مشتری',
					template: function (row) {
						if (row.Mobile) {
							return row.Mobile;
						} else {
							return '<span class="kt-badge kt-badge--danger kt-badge--inline kt-badge--pill">بدون موبایل مشتری</span>';
						}
					}
				}, {
					field: 'Telephone',
					title: 'تلفن مشتری',
					template: function (row) {
						if (row.Telephone) {
							return row.Telephone;
						} else {
							return '<span class="kt-badge kt-badge--danger kt-badge--inline kt-badge--pill">بدون تلفن مشتری</span>';
						}
					}
				}, {
					field: 'CityName',
					title: 'شهر ارسالی',
					template: function (row) {
						if (row.CityName) {
							return row.CityName;
						} else {
							return '<span class="kt-badge kt-badge--danger kt-badge--inline kt-badge--pill">بدون شهر ارسالی</span>';
						}
					}
				}, {
					field: 'ProvinceName',
					title: 'استان ارسالی',
					template: function (row) {
						if (row.ProvinceName) {
							return row.ProvinceName;
						} else {
							return '<span class="kt-badge kt-badge--danger kt-badge--inline kt-badge--pill">بدون استان ارسالی</span>';
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
						<a href="javascript:;" class="btn btn-sm btn-clean btn-icon btn-icon-md order-detail" title="مشاهده جزئیات" data-id="'+ data.CartId + '">\
							<i class="la la-eye"></i>\
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
			// init products
			products();
		},
	};
}();

jQuery(document).ready(function () {
	productDataTable.init();
	$(document).on('click', '.order-detail', function () {
		var id = $(this).attr('data-id');
		MegaYadakModal.inst.Modal('#detail', `/CMSSaleCRM/Detail/${id}`, 900, 600, false);
	});
});