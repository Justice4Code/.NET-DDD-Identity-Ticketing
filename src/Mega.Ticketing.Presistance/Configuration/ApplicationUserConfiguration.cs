using Mega.Ticketing.Domain.Entities;
using System.Data.Entity.ModelConfiguration;

namespace Mega.Ticketing.Presistance.Configuration
{
    public class ApplicationUserConfiguration : EntityTypeConfiguration<ApplicationUser>
    {
        public ApplicationUserConfiguration()
        {
            HasKey(row => row.Id);
            Property(row => row.CompanyId).IsOptional();
            Property(row => row.FirstName).IsOptional();
            Property(row => row.LastName).IsOptional();
            Property(row => row.VirtualName).IsOptional();
            Property(row => row.Email).IsOptional();
            Property(row => row.EmailConfirmed).IsOptional();
            Property(row => row.SecurityStamp).IsOptional();
            Property(row => row.PhoneNumber).IsOptional();
            Property(row => row.PhoneNumberConfirmed).IsOptional();
            Property(row => row.TwoFactorEnabled).IsOptional();
            Property(row => row.LockoutEndDateUtc).IsOptional();
            Property(row => row.LockoutEnabled).IsOptional();
            Property(row => row.AccessFailedCount).IsOptional();


            //One to many relation between ApplicationUser(many) and Company(one) Optional 
            HasOptional(row => row.Company).WithMany(row => row.Users).HasForeignKey(row => row.CompanyId);
        }
    }
}
