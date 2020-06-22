using Mega.Ticketing.Domain.Entities;
using Mega.Ticketing.Domain.Interface;
using System;

namespace Mega.Ticketing.Presistance.Data
{
    public class AccessoryRepository : BaseRepository<Accessory, Guid>, IAccessoryRepository
    {
        public AccessoryRepository(ITicketingDbContextFactory contextFactory) : base(contextFactory)
        {
        }
    }
}
