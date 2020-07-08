using Mega.Ticketing.Domain.Entities;
using Mega.Ticketing.Domain.Service;
using Mega.Ticketing.Presistance.Core;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Mega.Ticketing.Dashboard.Controllers
{
    public class TicketController : Controller
    {
        private readonly ITicketService _ticketService;
        private readonly IConversationService _conversationService;
        public TicketController(ITicketService ticketService, IConversationService conversationService)
        {
            _ticketService = ticketService;
            _conversationService = conversationService;
        }
        // GET: Ticket
        public ActionResult Index(Guid id)
        {
            ViewBag.Id = id;
            return View();
        }
        public ActionResult Reply(Guid id)
        {
            var response = _ticketService.GetById(id);
            if (response.IsSuccessful)
                return View(response.Result);
            return View();
        }
        [HttpPost]
        [ValidateInput(false)]
        public ActionResult Reply(Domain.Entities.Conversation conversation)
        {
            var userId = User.Identity.GetUserId();
            var currentUser = new ApplicationUser();
            using (var db = new IdentityTicketingDbContext())
            {
                currentUser = db.Users.Find(userId);
            }

            conversation.Id = Guid.NewGuid();
            conversation.FullName = currentUser != null ? (!string.IsNullOrEmpty(currentUser.VirtualName) ? currentUser.VirtualName : "پشتیبان سیستم") : "پشتیبان سیستم";
            var response = _conversationService.Save(conversation);
            if (response.IsSuccessful)
            {
                ViewBag.Success = true;
            }
            else
            {
                ViewBag.Success = false;
            }
            var responseSec = _ticketService.GetById(conversation.TicketId);
            if (responseSec.IsSuccessful)
                return View(responseSec.Result);
            return View();
        }
    }
}