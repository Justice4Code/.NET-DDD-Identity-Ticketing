'use strict';
// Class definition

var tempProductDataTable = function () {
	// Private functions

	// tempProducts initializer
	var tempProducts = function () {
		var datatable = $('.kt-datatable').KTDatatable({
			// datasource definition
			data: {
				type: 'remote',
				source: {
					read: {
						url: "/CMSProducts/InsertWizardData",
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
					field: 'Name',
					title: 'عنوان کالا',
					template: function (row) {
						if (row.Name) {
							return row.Name;
						} else {
							return '<span class="kt-badge kt-badge--danger kt-badge--inline kt-badge--pill">بدون عنوان کالا</span>';
						}
					}
				}, {
					field: 'Price',
					title: 'قیمت',
					template: function (row) {
						if (row.Price) {
							return row.Price;
						} else {
							return '<span class="kt-badge kt-badge--danger kt-badge--inline kt-badge--pill">بدون قیمت</span>';
						}
					}
				}, {
					field: 'Count',
					title: 'تعداد در انبار',
					template: function (row) {
						if (row.Count) {
							return row.Count;
						} else {
							return '<span class="kt-badge kt-badge--danger kt-badge--inline kt-badge--pill">بدون تعداد در انبار</span>';
						}
					}
				}, {
					field: 'Code',
					title: 'کد کالا',
					template: function (row) {
						if (row.Code) {
							return row.Code;
						} else {
							return '<span class="kt-badge kt-badge--danger kt-badge--inline kt-badge--pill">بدون کد کالا</span>';
						}
					}
				}, {
					field: 'CategoryName',
					title: 'نام طبقه بندی',
					template: function (row) {
						if (row.CategoryName) {
							return row.CategoryName;
						} else {
							return '<span class="kt-badge kt-badge--danger kt-badge--inline kt-badge--pill">بدون طبقه بندی</span>';
							"بدون نام طبقه بندی";
						}
					}
				}, {
					field: 'BrandName',
					title: 'نام برند',
					template: function (row) {
						if (row.BrandName) {
							return row.BrandName;
						} else {
							return '<span class="kt-badge kt-badge--danger kt-badge--inline kt-badge--pill">بدون برند</span>';
						}
					}
				}, {
					field: 'ShopName',
					title: 'نام تامیین کننده',
					template: function (row) {
						if (row.ShopName) {
							return row.ShopName;
						} else {
							return '<span class="kt-badge kt-badge--danger kt-badge--inline kt-badge--pill">بدون تامیین کننده</span>';
						}
					}
				}, {
					field: 'Weight',
					title: 'وزن کالا',
					template: function (row) {
						if (row.Weight) {
							return row.Weight;
						} else {
							return '<span class="kt-badge kt-badge--danger kt-badge--inline kt-badge--pill">بدون وزن کالا</span>';
						}
					}
				},
				{
					field: 'Width',
					title: 'عرض کالا',
					template: function (row) {
						if (row.Width) {
							return row.Width;
						} else {
							return '<span class="kt-badge kt-badge--danger kt-badge--inline kt-badge--pill">بدون عرض کالا</span>';
						}
					}
				},
				{
					field: 'Length',
					title: 'طول کالا',
					template: function (row) {
						if (row.Length) {
							return row.Length;
						} else {
							return '<span class="kt-badge kt-badge--danger kt-badge--inline kt-badge--pill">بدون طول کالا</span>';
						}
					}
				},
				{
					field: 'Height',
					title: 'ارتفاع کالا',
					template: function (row) {
						if (row.Height) {
							return row.Height;
						} else {
							return '<span class="kt-badge kt-badge--danger kt-badge--inline kt-badge--pill">بدون ارتفاع کالا</span>';
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
						<a href="javascript:;" class="btn btn-sm btn-clean btn-icon btn-icon-md product-submit" title="ثبت در کالا های اصلی" data-id="'+ data.ID + '">\
							<i class="la la-plus-circle"></i>\
						</a>\
						<a href="javascript:;" class="btn btn-sm btn-clean btn-icon btn-icon-md product-edit" title="ویرایش" data-id="'+ data.ID + '">\
							<i class="la la-edit"></i>\
						</a>\
						<a href="javascript:;" class="btn btn-sm btn-clean btn-icon btn-icon-md product-img" title="ثبت عکس" data-id="'+ data.ID + '">\
							<i class="la la-file-image-o"></i>\
						</a>\
						<a href="javascript:;" class="btn btn-sm btn-clean btn-icon btn-icon-md product-delete" title="حذف" data-id="'+ data.ID + '">\
							<i class="la la-trash"></i>\
						</a>\
					';
					},
				}],
			//Translation
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
		//on change value on hidden field reloads the dt 
		$(document).on('change', '#productid', function () {
			datatable.reload();
		});
		//on change ajax reload dt
		$(document).change(function () {
			datatable.reload();
		});
	};

	return {
		// Public functions
		init: function () {
			// init tempProducts
			tempProducts();
		},
	};
}();

jQuery(document).ready(function () {
	tempProductDataTable.init();
	$(document).on('click', '.product-submit', function () {
		var id = $(this).attr('data-id');
		$.ajax({
			url: "/CMSProducts/AjaxTempToDb?id=" + id,
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
	});
	$(document).on('click', '.product-edit', function () {
		var id = $(this).attr('data-id');
		MegaYadakModal.inst.Modal('#edit', `/CMSProducts/TempEdit/${id}`, 900, 600, false);
	});
	$(document).on('click', '.product-img', function () {
		var id = $(this).attr('data-id');
		MegaYadakModal.inst.Modal('#img', `/CMS/GalleryManagement/ManageImageWaterMark/${id}`, 900, 600, false);
	});
	$(document).on('click', '.product-delete', function () {
		var id = $(this).attr('data-id');
		Swal.fire({
			title: 'آیا شما درخواست این مورد را داده اید؟',
			text: "این کالا بصورت کامل حذف می شود",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			cancelButtonText: 'انصراف',
			confirmButtonText: 'حذف شود'
		}).then((result) => {
			if (result.value) {
				$.ajax({
					url: "/CMSProducts/AjaxTempDelete?id=" + id,
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