using Mega.Ticketing.Api.Models.Requests;
using Mega.Ticketing.Domain.Entities;
using Mega.Ticketing.Domain.Entities.DTO;
using Mega.Ticketing.Domain.Service;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace Mega.Ticketing.Api.Controllers
{
    [Authorize(Roles = "Admin,User")]
    public class CommunicationController : ApiController
    {
        private readonly ITicketService _ticketService;
        private readonly IConversationService _conversationService;
        private readonly ICartableService _cartableService;
        private readonly ICategoryService _categoryService;
        public CommunicationController(ITicketService ticketService, IConversationService conversationService, ICartableService cartableService, ICategoryService categoryService)
        {
            _ticketService = ticketService;
            _conversationService = conversationService;
            _cartableService = cartableService;
            _categoryService = categoryService;
        }
        [HttpPost]
        public IHttpActionResult CreateTicket(CreateTicketRequest request)
        {
            if (request == null && request.CompanyId == Guid.Empty)
                return BadRequest();

            var cartable = _cartableService.GetDefault(request.CompanyId);
            if (!cartable.IsSuccessful)
                return BadRequest(cartable.Error);

            var ticket = new Ticket();
            ticket.Id = Guid.NewGuid();
            ticket.Status = 0;
            ticket.UserId = request.UserApplicationId;
            ticket.UserName = request.UserApplicationName;
            ticket.Title = request.Title;
            ticket.CategoryId = request.CategoryId;
            ticket.CartableId = cartable.Result.Id;
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
            if (request == null)
                return BadRequest();

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
        public IHttpActionResult GetTicketById(GetTicketByIdRequest request)
        {
            if (request == null)
                return BadRequest();

            var ret = _ticketService.GetById(request.TicketId);
            if (ret.IsSuccessful && ret.Result != null)
            {
                var dto = new TicketDTO()
                {
                    CreatedDate = ret.Result.CreatedDate,
                    Status = ret.Result.Status,
                    UserId = ret.Result.UserId,
                    Code = ret.Result.Code,
                    UserName = ret.Result.UserName,
                    Title = ret.Result.Title,
                    CartableId = ret.Result.CartableId
                };

                if (ret.Result.Conversations != null)
                    foreach (var item in ret.Result.Conversations)
                    {
                        dto.Conversations.Add(new ConversationDTO()
                        {
                            Text = item.Text,
                            FullName = item.FullName,
                            UserId = item.UserId,
                            TicketId = item.TicketId,
                            CreatedDate = item.CreatedDate
                        });
                    }
                return Ok(dto);
            }
            return BadRequest(ret.Error);
        }
        [HttpPost]
        public IHttpActionResult GetAllTicketsForUser(GetAllTicketsForUserRequest request)
        {
            if (request == null)
                return BadRequest();

            var ret = _ticketService.GetByUserId(request.UserApplicationId);
            if (ret.IsSuccessful && ret.Result != null)
            {
                var dto = new List<TicketDTO>();
                foreach (var item in ret.Result)
                {
                    dto.Add(new TicketDTO()
                    {
                        CreatedDate = item.CreatedDate,
                        Status = item.Status,
                        UserId = item.UserId,
                        Code = item.Code,
                        UserName = item.UserName,
                        Title = item.Title,
                        CartableId = item.CartableId
                    });
                }
                return Ok(dto);
            }
            return BadRequest(ret.Error);
        }
        [HttpPost]
        public IHttpActionResult GetAllCategories(GetAllCategoriesRequest request)
        {
            if (request == null && request.CompanyId == Guid.Empty)
                return BadRequest();

            var ret = _categoryService.GetAllCategoriesForCompany(request.CompanyId);
            if (ret.IsSuccessful)
                return Ok(ret.Result);
            return BadRequest(ret.Error);
        }
    }
}
