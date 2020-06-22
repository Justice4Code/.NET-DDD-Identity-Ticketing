using Mega.Ticketing.Domain.Entities;
using System.Data.Entity.ModelConfiguration;

namespace Mega.Ticketing.Presistance.Configuration
{
    /// <summary>
    /// Database SQL Server Mapping the POCO Object for Conversation
    /// </summary>
    internal sealed class ConversationConfiguration : EntityTypeConfiguration<Conversation>
    {
        internal ConversationConfiguration()
        {
            HasKey(x => x.Id);
            ToTable("Conversation", "Ticketing");
            Property(p => p.RowVersion)
            .IsFixedLength();

            //Relations
            //One to many relation between Ticket(One) and Conversation(Many)
            HasRequired(x => x.Ticket).WithMany(x => x.Conversations).HasForeignKey(x => x.TicketId);
        }
    }
}
