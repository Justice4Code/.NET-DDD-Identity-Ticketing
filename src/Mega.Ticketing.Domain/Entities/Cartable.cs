using System;
using System.Collections.Generic;

namespace Mega.Ticketing.Domain.Entities
{
    /// <summary>
    /// POCO Cartable Object
    /// </summary>
    public partial class Cartable : BaseEntity<Guid>
    {
        public string Title { get; set; }
        public bool IsDefault { get; set; }
        //Foreign Keys
        public Guid CompanyId { get; set; }
    }
    /// <summary>
    /// Cartable Virtual Properties
    /// </summary>
    public partial class Cartable
    {
        public virtual Company Company { get; set; }
        public virtual ICollection<Ticket> Tickets { get; } = new HashSet<Ticket>();
        public virtual ICollection<Category> Categories { get; } = new HashSet<Category>();
        public virtual ICollection<ApplicationUser> Users { get; } = new HashSet<ApplicationUser>();
    }
}
