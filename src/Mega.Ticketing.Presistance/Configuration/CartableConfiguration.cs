using Mega.Ticketing.Domain.Entities;
using System.Data.Entity.ModelConfiguration;

namespace Mega.Ticketing.Presistance.Configuration
{
    /// <summary>
    /// Database SQL Server Mapping the POCO Object for Cartable
    /// </summary>
    internal sealed class CartableConfiguration : EntityTypeConfiguration<Cartable>
    {
        internal CartableConfiguration()
        {
            HasKey(x => x.Id);
            ToTable("Cartable", "Ticketing");
            Property(p => p.RowVersion)
            .IsFixedLength();

            //Relations
            //One to many relation between Company(One) and Cartable(Many)
            HasRequired(x => x.Company).WithMany(x => x.Cartables).HasForeignKey(x => x.CompanyId);
            //Many to many relation between Cartable And User
            HasMany(x => x.Users).WithMany(x => x.Cartables).Map(rows =>
            {
                rows.MapLeftKey("CartableId");
                rows.MapRightKey("UserId");
            });
        }
    }
}
