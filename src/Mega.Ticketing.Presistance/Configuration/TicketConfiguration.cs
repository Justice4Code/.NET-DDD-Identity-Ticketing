using Mega.Ticketing.Domain.Entities;
using System.Data.Entity.ModelConfiguration;

namespace Mega.Ticketing.Presistance.Configuration
{
    /// <summary>
    /// Database SQL Server Mapping the POCO Object for Ticket
    /// </summary>
    internal sealed class TicketConfiguration : EntityTypeConfiguration<Ticket>
    {
        internal TicketConfiguration()
        {
            HasKey(x => x.Id);
            Property(x => x.CategoryId).IsOptional();
            ToTable("Ticket", "Ticketing");
            Property(p => p.RowVersion)
            .IsFixedLength();

            //Relations
            //One to many relation between Cartable(One) and Ticket(Many)
            HasRequired(x => x.Cartable).WithMany(x => x.Tickets).HasForeignKey(x => x.CartableId);
            //One to many relation between Category(One) and Ticket(Many)
            HasOptional(x => x.Category).WithMany(x => x.Tickets).HasForeignKey(x => x.CategoryId);
        }
    }
}
