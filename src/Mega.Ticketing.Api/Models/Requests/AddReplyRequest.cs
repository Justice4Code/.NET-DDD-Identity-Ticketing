using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Mega.Ticketing.Api.Models.Requests
{
    public class AddReplyRequest
    {
        public Guid TicketId { get; set; }
        public string Text { get; set; }
        public string UserApplicationId { get; set; }
        public string UserApplicationName { get; set; }
    }
}