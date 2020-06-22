using Mega.Ticketing.Domain.Entities;
using System.Data.Entity.ModelConfiguration;

namespace Mega.Ticketing.Presistance.Configuration
{
    /// <summary>
    /// Database SQL Server Mapping the POCO Object for Category
    /// </summary>
    internal sealed class CategoryConfiguration : EntityTypeConfiguration<Category>
    {
        internal CategoryConfiguration()
        {
            HasKey(x => x.Id);
            ToTable("Category", "Ticketing");
            Property(p => p.RowVersion)
            .IsFixedLength();

            //Relations
            //One to many relation between Cartable(One) and Category(Many)
            HasRequired(x => x.Cartable).WithMany(x => x.Categories).HasForeignKey(x => x.CartableId);
        }
    }
}
