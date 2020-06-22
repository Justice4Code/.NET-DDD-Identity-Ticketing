'use strict';
// Class definition

var productDataTable = function () {
	// Private functions

	// Blog initializer
	var Blog = function () {


		var datatable = $('.kt-datatable').KTDatatable({
			// datasource definition
			data: {
				type: 'remote',
				source: {
					read: {
						url: "/CMSBlog/IndexData",
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
					field: 'Title',
					title: 'عنوان مقاله',
					template: function (row) {
						if (row.Title) {
							return row.Title;
						} else {
							return '<span class="kt-badge kt-badge--danger kt-badge--inline kt-badge--pill">بدون عنوان مقالعه</span>';
						}
					}
				},{
					field: 'Type',
					title: 'نوع مقاله',
					template: function (row) {
						if (row.Type) {
							switch (row.Type) {
								case 0:
									return '<span class="kt-badge kt-badge--success kt-badge--inline kt-badge--pill">متنی</span>';
								case 1:
									return '<span class="kt-badge kt-badge--primary kt-badge--inline kt-badge--pill">ویدیو</span>';
								case 2:
									return '<span class="kt-badge kt-badge--default kt-badge--inline kt-badge--pill">پادکست</span>';
							}
						} else {
							return '<span class="kt-badge kt-badge--danger kt-badge--inline kt-badge--pill">بدون نوع</span>';
						}
					}
				},{
					field: 'CreateDatePersian',
					title: 'تاریخ درج',
					template: function (row) {
						if (row.CreateDatePersian) {
							return row.CreateDatePersian;
						} else {
							return '<span class="kt-badge kt-badge--danger kt-badge--inline kt-badge--pill">بدون تاریخ</span>';
						}
					}
				}, {
					field: 'IsActive',
					title: 'وضعیت',
					// callback function support for column rendering
					template: function (row) {
						var status = {
							true: { 'title': 'فعال', 'class': ' kt-badge--success' },
							false: { 'title': 'غیر فعال', 'class': ' kt-badge--danger' },
						};
						return '<span class="kt-badge ' + status[row.IsActive].class + ' kt-badge--inline kt-badge--pill">' + status[row.IsActive].title + '</span>';
					},
				}, {
					field: 'Actions',
					title: 'عملیات',
					sortable: false,
					width: 110,
					overflow: 'visible',
					autoHide: false,
					template: function (data, i) {
						return '\
						<a href="javascript:;" class="btn btn-sm btn-clean btn-icon btn-icon-md Blog-edit" title="ویرایش" data-id="'+ data.ID + '">\
							<i class="la la-edit"></i>\
						</a>\
						<a href="javascript:;" class="btn btn-sm btn-clean btn-icon btn-icon-md Blog-img" title="ثبت عکس" data-id="'+ data.ID + '">\
							<i class="la la-file-image-o"></i>\
						</a>\
						<a href="javascript:;" class="btn btn-sm btn-clean btn-icon btn-icon-md Blog-delete" title="حذف" data-id="'+ data.ID + '">\
							<i class="la la-trash"></i>\
						</a>\
					';
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
			// init Blog
			Blog();
		},
	};
}();

jQuery(document).ready(function () {
	productDataTable.init();
	$(document).on('click', '#createBlog', function () {
		MegaYadakModal.inst.Modal('#create', '/CMSBlog/Create', 900, 600, false);
	});
	$(document).on('click', '.Blog-edit', function () {
		var id = $(this).attr('data-id');
		MegaYadakModal.inst.Modal('#edit', `/CMSBlog/Edit/${id}`, 900, 600, false);
	});
	$(document).on('click', '.Blog-img', function () {
		var id = $(this).attr('data-id');
		MegaYadakModal.inst.Modal('#img', `/CMS/GalleryManagement/ManageImage/${id}`, 900, 600, false);
	});
	$(document).on('click', '.Blog-delete', function () {
		var id = $(this).attr('data-id');
		Swal.fire({
			title: 'آیا شما درخواست این مورد را داده اید؟',
			text: "این مقالعه بصورت کامل حذف می شود",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			cancelButtonText: 'انصراف',
			confirmButtonText: 'حذف شود'
		}).then((result) => {
			if (result.value) {
				$.ajax({
					url: "/CMSBlog/AjaxDelete?id=" + id,
					method: "POST",
					success: function (data) {
						//trigger
						$(document).trigger('change');
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
		})
	});
});