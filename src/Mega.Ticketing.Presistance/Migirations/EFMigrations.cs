using Mega.Ticketing.Presistance.Core;
using System.Data.Entity.Migrations;

namespace Mega.Ticketing.Presistance.Migirations
{
    /// <summary>
    /// Entity Framework Migration Settings, sealed within the dll.  
    /// </summary>
    public class Migrations : DbMigrationsConfiguration<TicketingDbContext>
    {
        public Migrations()
        {
            AutomaticMigrationsEnabled = true;
            //On true you might be losing data be aware. 
            AutomaticMigrationDataLossAllowed = true;
            ContextKey = "Mega.Ticketing.Presistance.Core.TicketingDbContext";
        }
        /// <summary>
        /// This method will be called after migrating to the latest version
        /// </summary>
        /// <param name="context"></param>
        protected override void Seed(TicketingDbContext context)
        {

        }
    }
}
