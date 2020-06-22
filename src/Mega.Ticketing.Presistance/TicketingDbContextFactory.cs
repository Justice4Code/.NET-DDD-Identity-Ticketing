using Mega.Ticketing.Presistance.Core;

namespace Mega.Ticketing.Presistance
{
    public class TicketingDbContextFactory : ITicketingDbContextFactory
    {
        private readonly string _connectionString;
        private TicketingDbContext _context;

        public TicketingDbContextFactory(string connectionString)
        {
            _connectionString = connectionString;
        }

        public TicketingDbContext GetContext()
        {
            return _context ?? (_context = new TicketingDbContext(_connectionString));
        }
    }
}
