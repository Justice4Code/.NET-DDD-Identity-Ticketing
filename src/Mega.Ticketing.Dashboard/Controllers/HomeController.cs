using Mega.Ticketing.Domain.Entities;
using Mega.Ticketing.Domain.Service;
using Mega.Ticketing.Presistance.Core;
using Microsoft.AspNet.Identity;
using System.Web.Mvc;

namespace Mega.Ticketing.Dashboard.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {
        private readonly ICartableService _cartableService;
        public HomeController(ICartableService cartableService)
        {
            _cartableService = cartableService;
        }
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Mobile()
        {
            return View();
        }
        public ActionResult AsideMenu()
        {
            return View();
        }
        public ActionResult Header()
        {
            return View();
        }
        public ActionResult Breadcrumb(string[,] breadcrumb)
        {
            ViewBag.Breadcrumb = breadcrumb;
            return View();
        }
        public ActionResult Footer()
        {
            return View();
        }

        public ActionResult Cartables()
        {
            var userId = User.Identity.GetUserId();
            var currentUser = new ApplicationUser();
            using (var db = new IdentityTicketingDbContext())
            {
                currentUser = db.Users.Find(userId);
            }
            if (currentUser != null && currentUser.CompanyId.HasValue)
            {
                var response = _cartableService.GetAll(currentUser.CompanyId.Value);
                if (response.IsSuccessful)
                    return View(response.Result);
                return View();

            }
            return View();
        }
    }
}