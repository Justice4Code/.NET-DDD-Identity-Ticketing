using System;
using System.Collections.Generic;

namespace Mega.Ticketing.Domain.Entities
{
    /// <summary>
    /// POCO Category Objects
    /// </summary>
    public partial class Category : BaseEntity<Guid>
    {
        public string Title { get; set; }

        //Foreign Keys
        public Guid CartableId { get; set; }
    }
    /// <summary>
    /// Category Virtual Properties 
    /// </summary>
    public partial class Category
    {
        public Cartable Cartable { get; set; }
        public ICollection<Ticket> Tickets { get; } = new HashSet<Ticket>();
    }
}
