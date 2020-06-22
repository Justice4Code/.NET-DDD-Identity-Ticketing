using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Mega.Ticketing.Domain.Entities
{
    public partial class ApplicationUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string VirtualName { get; set; }
        public Guid? CompanyId { get; set; }
        public DateTime CreatedDate { get; set; }

        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<ApplicationUser> manager)
        {
            ClaimsIdentity userIdentity = new ClaimsIdentity();
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            userIdentity = await manager.CreateIdentityAsync(this, DefaultAuthenticationTypes.ApplicationCookie);

            // Add custom user claims here
            return userIdentity;
        }
        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<ApplicationUser> manager, string authenticationType)
        {
            var userIdentity = await manager.CreateIdentityAsync(this, authenticationType);
            // Add custom user claims here

            return userIdentity;
        }

    }
    public partial class ApplicationUser
    {
        public virtual Company Company { get; set; }
        public virtual ICollection<Cartable> Cartables { get; } = new HashSet<Cartable>();
    }
}
