using Mega.Ticketing.Presistance.Core;

namespace Mega.Ticketing.Presistance
{
    public interface ITicketingDbContextFactory
    {
        TicketingDbContext GetContext();
    }
}
