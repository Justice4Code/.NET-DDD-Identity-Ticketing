using Mega.Ticketing.Domain.Entities;
using Mega.Ticketing.Domain.Service;
using Microsoft.AspNet.Identity;
using System;
using System.Web.Mvc;

namespace Mega.Ticketing.Dashboard.Controllers
{
    [Authorize]
    public class CompanyController : Controller
    {
        private readonly ICompanyService _companyService;
        public CompanyController(ICompanyService companyService)
        {
            _companyService = companyService;
        }
        // GET: Company
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Create()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Create(Company dto)
        {
            dto.CreatedDate = DateTime.Now;
            dto.CreatedBy = User.Identity.GetUserId();
            dto.IsActive = true;
            dto.Id = Guid.NewGuid();

            _companyService.Insert(dto);
            return View();
        }
        #region Data

        public ActionResult IndexData()
        {
            var data = _companyService.GetAll();
            if (data.IsSuccessful && data.Result.Count > 0)
                return Json(data.Result, JsonRequestBehavior.AllowGet);
            return Json(new { }, JsonRequestBehavior.AllowGet);
        }

        #endregion

    }
}