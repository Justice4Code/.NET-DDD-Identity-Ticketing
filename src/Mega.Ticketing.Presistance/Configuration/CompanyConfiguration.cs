using Mega.Ticketing.Domain.Entities;
using System.Data.Entity.ModelConfiguration;

namespace Mega.Ticketing.Presistance.Configuration
{
    /// <summary>
    /// Database SQL Server Mapping the POCO Object for Company
    /// </summary>
    internal sealed class CompanyConfiguration : EntityTypeConfiguration<Company>
    {
        internal CompanyConfiguration()
        {
            HasKey(x => x.Id);
            ToTable("Company", "Ticketing");
            Property(p => p.RowVersion)
            .IsFixedLength();

        }
    }
}
