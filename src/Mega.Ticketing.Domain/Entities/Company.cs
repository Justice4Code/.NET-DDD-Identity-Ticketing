using System;
using System.Collections.Generic;

namespace Mega.Ticketing.Domain.Entities
{
    /// <summary>
    /// POCO Company Objects
    /// </summary>
    public partial class Company : BaseEntity<Guid>
    {
        public string Title { get; set; }
    }

    /// <summary>
    /// Company Virtual Properties
    /// </summary>
    public partial class Company
    {
        public virtual ICollection<Cartable> Cartables { get; } = new HashSet<Cartable>();
        public virtual ICollection<ApplicationUser> Users { get; } = new HashSet<ApplicationUser>();
    }
}

