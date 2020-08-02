using System;

namespace Mega.Ticketing.Domain.Entities.DTO
{
    public class CompanyDTO : BaseEntity<Guid>
    {
        public string Title { get; set; }
    }
}
