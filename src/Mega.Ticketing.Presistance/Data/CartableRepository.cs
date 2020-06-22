using Mega.Ticketing.Domain.Entities;
using Mega.Ticketing.Domain.Interface;
using System;

namespace Mega.Ticketing.Presistance.Data
{
    public class CartableRepository : BaseRepository<Cartable, Guid>, ICartableRepository
    {
        public CartableRepository(ITicketingDbContextFactory contextFactory) : base(contextFactory)
        {
        }
    }
}
