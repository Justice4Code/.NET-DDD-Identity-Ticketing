using System;
using System.Collections.Generic;

namespace Mega.Ticketing.Domain.Entities.DTO
{
    public class ConversationDTO : BaseEntity<Guid>
    {
        public ConversationDTO()
        {
            this.Accessories = new List<AccessoryDTO>();
        }
        public string Text { get; set; }
        public string FullName { get; set; }
        public string UserId { get; set; }
        public Guid TicketId { get; set; }
        public List<AccessoryDTO> Accessories { get; set; }
    }
}
