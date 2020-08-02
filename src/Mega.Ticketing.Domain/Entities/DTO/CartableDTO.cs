using System;

namespace Mega.Ticketing.Domain.Entities.DTO
{
    public class CartableDTO : BaseEntity<Guid>
    {
        public string Title { get; set; }
        public bool IsDefault { get; set; }
        public Guid CompanyId { get; set; }
        public string CompanyTitle { get; set; }
    }
}
