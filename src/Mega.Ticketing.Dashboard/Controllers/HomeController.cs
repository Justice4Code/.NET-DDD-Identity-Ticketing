using System.Web.Mvc;

namespace Mega.Ticketing.Dashboard.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {
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
            return View();
        }
    }
}