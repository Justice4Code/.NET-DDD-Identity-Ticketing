using Mega.Ticketing.Domain.Entities;
using Mega.Ticketing.Presistance.Configuration;
using Mega.Ticketing.Presistance.Migirations;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Configuration;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace Mega.Ticketing.Presistance.Core
{
    /// <summary>
    /// Application DbContext class it is inherited from Identity DbContext based on ApplicationUser For ASP.NET Identity
    /// </summary>
    public class TicketingDbContext : IdentityDbContext
    {
        public TicketingDbContext() : base("Ticketing")
        {
            //Database.SetInitializer(new MigrateDatabaseToLatestVersion<TicketingDbContext, Migrations>());
            Configuration.ProxyCreationEnabled = false;
            Configuration.LazyLoadingEnabled = false;
        }

        public TicketingDbContext(string connectionString) : base(connectionString)
        {
            //Database.SetInitializer(new MigrateDatabaseToLatestVersion<TicketingDbContext, Migrations>());
            Configuration.ProxyCreationEnabled = false;
            Configuration.LazyLoadingEnabled = false;
        }

        public DbSet<Company> Companies { get; set; }
        public DbSet<Cartable> Cartables { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<Conversation> Conversations { get; set; }
        public DbSet<Accessory> Accessories { get; set; }

        /// <summary>
        /// Creates the Database Design. 
        /// </summary>
        /// <param name="modelBuilder"></param>
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Configurations.Add(new CompanyConfiguration());
            modelBuilder.Configurations.Add(new CartableConfiguration());
            modelBuilder.Configurations.Add(new CategoryConfiguration());
            modelBuilder.Configurations.Add(new TicketConfiguration());
            modelBuilder.Configurations.Add(new ConversationConfiguration());
            modelBuilder.Configurations.Add(new AccessoryConfiguration());
            modelBuilder.Configurations.Add(new ApplicationUserConfiguration());
        }
    }

    public class IdentityTicketingDbContext : IdentityDbContext<ApplicationUser>
    {
        public IdentityTicketingDbContext()
                : base(ConfigurationManager.ConnectionStrings["Ticketing"].Name, throwIfV1Schema: false)
        {
            Configuration.ProxyCreationEnabled = false;
            Configuration.LazyLoadingEnabled = false;
        }

        /// <summary>
        /// Creates the Database Design. 
        /// </summary>
        /// <param name="modelBuilder"></param>
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Configurations.Add(new CompanyConfiguration());
            modelBuilder.Configurations.Add(new CartableConfiguration());
            modelBuilder.Configurations.Add(new CategoryConfiguration());
            modelBuilder.Configurations.Add(new TicketConfiguration());
            modelBuilder.Configurations.Add(new ConversationConfiguration());
            modelBuilder.Configurations.Add(new AccessoryConfiguration());
            modelBuilder.Configurations.Add(new ApplicationUserConfiguration());
        }

        public static IdentityTicketingDbContext Create()
        {
            return new IdentityTicketingDbContext();
        }

    }
}
