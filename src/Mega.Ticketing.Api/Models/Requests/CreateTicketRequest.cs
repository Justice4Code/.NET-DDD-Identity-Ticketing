using System;

namespace Mega.Ticketing.Api.Models.Requests
{
    public class CreateTicketRequest
    {
        public string UserApplicationId { get; set; }
        public string UserApplicationName { get; set; }
        public string Title { get; set; }
        public string Text { get; set; }
        public Guid? CategoryId { get; set; }
        public Guid CompanyId { get; set; }
    }
}