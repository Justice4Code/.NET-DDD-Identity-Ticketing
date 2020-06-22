using System;

namespace Mega.Ticketing.Domain.Entities
{
    /// <summary>
    /// POCO Accessory Object
    /// </summary>
    public partial class Accessory : BaseEntity<Guid>
    {
        public string Address { get; set; }
        public string Name { get; set; }
        public string Extension { get; set; }

        //Foreign Keys
        public Guid ConversationId { get; set; }
    }
    /// <summary>
    /// Accessory Virtual Properties
    /// </summary>
    public partial class Accessory
    {
        public virtual Conversation Conversation { get; set; }
    }
}
