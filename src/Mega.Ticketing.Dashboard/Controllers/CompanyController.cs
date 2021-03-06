﻿using Mega.Ticketing.Domain.Entities;
using Mega.Ticketing.Domain.Entities.DTO;
using Mega.Ticketing.Domain.Service;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Web.Mvc;

namespace Mega.Ticketing.Dashboard.Controllers
{
    [Authorize(Roles = "Admin")]
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
        public ActionResult Edit(Guid id)
        {
            var response = _companyService.GetById(id);
            if (response.IsSuccessful)
                return View(response.Result);
            return View();
        }

        #region Ajax

        [HttpPost]
        public ActionResult AjaxCreate(Company dto) 
        {
            var processResponse = new Response();
            try
            {
                dto.CreatedBy = User.Identity.GetUserId();
                dto.Id = Guid.NewGuid();

                var response = _companyService.Save(dto);

                if (response.IsSuccessful)
                    return Json(new { Result = "Ok", JsonRequestBehavior.AllowGet });
                processResponse.Failed($"Message : {response.Error}");
                return Json(new { Error = $"IsSuccess = {response.IsSuccessful} | Error = {response.Error}" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                processResponse.Failed($"Message : {ex.Message} - InnerException Message: { ex.InnerException.Message }");
                return Json(new { Error = $"IsSuccess = {false} | Error = {ex.Message}" }, JsonRequestBehavior.AllowGet);
            }
        }
        [HttpPost]
        public ActionResult AjaxEdit(Company dto)
        {
            var processResponse = new Response();
            try
            {
                dto.ModifiedBy = Guid.Parse(User.Identity.GetUserId());
                var response = _companyService.Save(dto);

                if (response.IsSuccessful)
                    return Json(new { Result = "Ok", JsonRequestBehavior.AllowGet });
                processResponse.Failed($"Message : {response.Error}");
                return Json(new { Error = $"IsSuccess = {response.IsSuccessful} | Error = {response.Error}" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                processResponse.Failed($"Message : {ex.Message} - InnerException Message: { ex.InnerException.Message }");
                return Json(new { Error = $"IsSuccess = {false} | Error = {ex.Message}" }, JsonRequestBehavior.AllowGet);
            }
        }
        [HttpPost]
        public ActionResult AjaxDelete(Guid id)
        {
            var processResponse = new Response();
            try
            {
                var response = _companyService.Delete(id);

                if (response.IsSuccessful)
                    return Json(new { Result = "Ok", JsonRequestBehavior.AllowGet });
                processResponse.Failed($"Message : {response.Error}");
                return Json(new { Error = $"IsSuccess = {response.IsSuccessful} | Error = {response.Error}" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                processResponse.Failed($"Message : {ex.Message} - InnerException Message: { ex.InnerException.Message }");
                return Json(new { Error = $"IsSuccess = {false} | Error = {ex.Message}" }, JsonRequestBehavior.AllowGet);
            }

        }

        #endregion


        #region Data

        public ActionResult IndexData()
        {
            var data = _companyService.GetAll();
            if (data.IsSuccessful && data.Result.Count > 0)
            {
                var newData = new List<CompanyDTO>();
                foreach (var item in data.Result)
                {
                    newData.Add(new CompanyDTO()
                    {
                        Id = item.Id,
                        Title = item.Title,
                        CreatedDate = item.CreatedDate,
                        IsActive = item.IsActive
                    });
                }
                return Json(newData, JsonRequestBehavior.AllowGet);

            }
            return Json(new { }, JsonRequestBehavior.AllowGet);
        }

        #endregion

    }
}