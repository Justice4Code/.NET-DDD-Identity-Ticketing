using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Mega.Ticketing.Domain.Service;
using Mega.Ticketing.Domain.Entities.DTO;

namespace Mega.Ticketing.Dashboard.Controllers
{
    [Authorize(Roles = "Admin")]
    public class CategoryController : Controller
    {
        private readonly ICategoryService _service;
        public CategoryController(ICategoryService service)
        {
            _service = service;
        }
        // GET: Category
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Create()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Create(Domain.Entities.Category dto)
        {
            dto.CreatedBy = User.Identity.GetUserId();
            dto.Id = Guid.NewGuid();

            var response = _service.Save(dto);
            if (response.IsSuccessful)
            {
                ViewBag.Success = true;
            }
            else
            {
                ViewBag.Success = false;
            }
            return View();
        }
        public ActionResult Edit(Guid id)
        {
            var response = _service.GetById(id);
            if (response.IsSuccessful)
                return View(response.Result);
            return View();
        }
        [HttpPost]
        public ActionResult Edit(Domain.Entities.Category dto)
        {
            dto.ModifiedBy = Guid.Parse(User.Identity.GetUserId());
            dto.ModifiedDate = DateTime.Now;

            var response = _service.Save(dto);
            if (response.IsSuccessful)
            {
                ViewBag.Success = true;
            }
            else
            {
                ViewBag.Success = false;
            }
            return View();
        }

        #region Data
        public ActionResult IndexData()
        {
            var data = _service.GetAll();
            if (data.IsSuccessful && data.Result.Count > 0)
            {
                var newData = new List<CategoryDTO>();
                foreach (var item in data.Result)
                {
                    newData.Add(new CategoryDTO()
                    {
                        Id = item.Id,
                        Title = item.Title,
                        CartableId = item.CartableId,
                        CreatedDate = item.CreatedDate,
                        IsActive = item.IsActive,
                        CartableTitle = item.Cartable != null ? item.Cartable.Title : "ندارد"
                    });
                }
                return Json(newData, JsonRequestBehavior.AllowGet);
            }
            Response.StatusCode = 400;
            return Content("");
        }
        #endregion
    }
}