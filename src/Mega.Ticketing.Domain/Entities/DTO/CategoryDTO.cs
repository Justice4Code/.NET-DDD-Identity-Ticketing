using System;

namespace Mega.Ticketing.Domain.Entities.DTO
{
    public class CategoryDTO : BaseEntity<Guid>
    {
        public string Title { get; set; }
        public Guid CartableId { get; set; }
        public string CartableTitle { get; set; }
    }
}
