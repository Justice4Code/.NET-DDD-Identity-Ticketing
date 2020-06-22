using System;
using System.Collections.Generic;

namespace Mega.Ticketing.Domain.Entities
{
    /// <summary>
    /// POCO Conversation Object
    /// </summary>
    public partial class Conversation : BaseEntity<Guid>
    {
        public string Title { get; set; }
        public string Text { get; set; }
        public string FullName { get; set; }

        //Foreign Keys
        public Guid TicketId { get; set; }
    }
    /// <summary>
    /// Conversation Virtual Properties
    /// </summary>
    public partial class Conversation
    {
        public virtual Ticket Ticket { get; set; }
        public virtual ICollection<Accessory> Accessories { get; } = new HashSet<Accessory>();
    }
}
