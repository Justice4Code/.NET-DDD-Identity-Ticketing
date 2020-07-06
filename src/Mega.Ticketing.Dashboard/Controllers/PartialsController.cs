using Mega.Ticketing.Domain.Service;
using Microsoft.AspNet.Identity.Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Mega.Ticketing.Dashboard.Controllers
{
    public class PartialsController : Controller
    {
        #region Constructors
        private readonly ICompanyService _companyService;
        private readonly ICartableService _cartableService;

        public PartialsController( ICompanyService companyService, ICartableService cartableService)
        {
            _companyService = companyService;
            _cartableService = cartableService;
        }
        #endregion

        public ActionResult Companies(string name, string id = "", Guid? selectedValue = null, bool preLoad = true, string cssClass = "form-control")
        {
            ViewBag.Name = name;
            ViewBag.CssClass = cssClass;
            ViewBag.Id = id;
            ViewBag.SelectedValue = selectedValue;

            if (preLoad)
            {
                var response = _companyService.GetAll();
                return PartialView(response.Result);
            }
            return PartialView(null);
        }
        public ActionResult Cartables(string name, string id = "", Guid? selectedValue = null, bool preLoad = true, string cssClass = "form-control")
        {
            ViewBag.Name = name;
            ViewBag.CssClass = cssClass;
            ViewBag.Id = id;
            ViewBag.SelectedValue = selectedValue;

            if (preLoad)
            {
                var response = _cartableService.GetAll();
                return PartialView(response.Result);
            }
            return PartialView(null);
        }

    }
}