using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Mega.Ticketing.Domain.Service;

namespace Mega.Ticketing.Dashboard.Controllers
{
    [Authorize]
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
                return Json(data.Result, JsonRequestBehavior.AllowGet);
            return Json(new { }, JsonRequestBehavior.AllowGet);
        }
        #endregion
    }
}