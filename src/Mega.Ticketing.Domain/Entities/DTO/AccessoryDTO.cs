using System;

namespace Mega.Ticketing.Domain.Entities.DTO
{
    public class AccessoryDTO : BaseEntity<Guid>
    {
        public string Address { get; set; }
        public string Name { get; set; }
        public string Extension { get; set; }
        public Guid ConversationId { get; set; }
    }
}
