using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mega.Ticketing.Domain.Entities
{
    /// <summary>
    /// POCO Ticket Object
    /// </summary>
    public partial class Ticket : BaseEntity<Guid>
    {
        public int Status { get; set; }
        public string UserId { get; set; }
        public string Code { get; set; }
        public string UserName { get; set; }

        //Foreign Keys
        public Guid CartableId { get; set; }
        public Guid? CategoryId { get; set; }
    }
    /// <summary>
    /// Ticket Virtual Properties
    /// </summary>
    public partial class Ticket
    {
        public virtual Category Category { get; set; }
        public virtual Cartable Cartable { get; set; }
        public virtual ICollection<Conversation> Conversations { get; } = new HashSet<Conversation>();
    }
}
