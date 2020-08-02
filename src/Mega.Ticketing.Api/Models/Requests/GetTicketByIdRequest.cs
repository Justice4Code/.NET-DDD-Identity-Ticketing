using System;

namespace Mega.Ticketing.Api.Models.Requests
{
    public class GetTicketByIdRequest
    {
        public Guid TicketId { get; set; }
    }
}