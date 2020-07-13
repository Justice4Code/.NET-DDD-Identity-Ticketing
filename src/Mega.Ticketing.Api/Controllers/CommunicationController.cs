using Mega.Ticketing.Api.Models.Requests;
using Mega.Ticketing.Domain.Entities;
using Mega.Ticketing.Domain.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Mega.Ticketing.Api.Controllers
{
    [Authorize(Roles = "Admin,User")]
    public class CommunicationController : ApiController
    {
        private readonly ITicketService _ticketService;
        private readonly IConversationService _conversationService;
        public CommunicationController(ITicketService ticketService, IConversationService conversationService)
        {
            _ticketService = ticketService;
            _conversationService = conversationService;
        }
        [HttpPost]
        public IHttpActionResult CreateTicket(CreateTicketRequest request)
        {
            var ticket = new Ticket();
            ticket.Id = Guid.NewGuid();
            ticket.Status = 0;
            ticket.UserId = request.UserApplicationId;
            ticket.UserName = request.UserApplicationName;
            ticket.Title = request.Title;
            ticket.CategoryId = request.CategoryId;
            ticket.Code = Guid.NewGuid().ToString("N").ToUpper();
            var first = _ticketService.Create(ticket);

            var conversation = new Conversation();
            conversation.Id = Guid.NewGuid();
            conversation.FullName = request.UserApplicationName;
            conversation.UserId = request.UserApplicationId;
            conversation.TicketId = ticket.Id;
            var second = _conversationService.Save(conversation);

            if (first.IsSuccessful && second.IsSuccessful)
                return Ok();
            return BadRequest($"{first.Error} - {second.Error}");
        }
        [HttpPost]
        public IHttpActionResult AddReply(AddReplyRequest request)
        {
            var conversation = new Conversation();
            conversation.Id = Guid.NewGuid();
            conversation.Text = request.Text;
            conversation.FullName = request.UserApplicationName;
            conversation.UserId = request.UserApplicationId;
            conversation.TicketId = request.TicketId;
            var ret = _conversationService.Save(conversation);
            if (ret.IsSuccessful)
                return Ok();
            return BadRequest(ret.Error);
        }
        [HttpPost]
        public IHttpActionResult GetAllTicketsForUser(GetAllTicketsForUserRequest request)
        {
            var ret = _ticketService.GetByUserId(request.UserApplicationId);
            if (ret.IsSuccessful)
                return Ok(ret.Result);
            return BadRequest(ret.Error);
        }
    }
}
