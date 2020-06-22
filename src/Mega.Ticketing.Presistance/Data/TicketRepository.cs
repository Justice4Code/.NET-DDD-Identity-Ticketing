using Mega.Ticketing.Domain.Entities;
using Mega.Ticketing.Domain.Interface;
using System;

namespace Mega.Ticketing.Presistance.Data
{
    public class TicketRepository : BaseRepository<Ticket, Guid>, ITicketRepository
    {
        public TicketRepository(ITicketingDbContextFactory contextFactory) : base(contextFactory)
        {
        }
    }
}
