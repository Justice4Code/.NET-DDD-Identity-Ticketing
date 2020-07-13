using Mega.Ticketing.Domain.Service;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Mega.Ticketing.Dashboard.Controllers
{
    [Authorize(Roles = "Admin")]
    public class CartableController : Controller
    {
        private readonly ICartableService _cartableService;
        public CartableController(ICartableService cartableService)
        {
            _cartableService = cartableService;
        }
        // GET: Cartable
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Create()
        {
            return View();
        }
        public ActionResult Create(Domain.Entities.Cartable dto)
        {
            dto.CreatedBy = User.Identity.GetUserId();
            dto.Id = Guid.NewGuid();

            var response = _cartableService.Save(dto);
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
            var response = _cartableService.GetById(id);
            if (response.IsSuccessful)
                return View(response.Result);
            return View();
        }
        public ActionResult Edit(Domain.Entities.Cartable dto)
        {
            dto.ModifiedBy = Guid.Parse(User.Identity.GetUserId());
            dto.ModifiedDate = DateTime.Now; 

            var response = _cartableService.Save(dto);
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
            var data = _cartableService.GetAll();
            if (data.IsSuccessful && data.Result.Count > 0)
                return Json(data.Result, JsonRequestBehavior.AllowGet);
            return Json(new { }, JsonRequestBehavior.AllowGet);
        }
        #endregion
    }
}