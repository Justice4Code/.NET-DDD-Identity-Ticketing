using Mega.Ticketing.Domain.Entities;
using Mega.Ticketing.Domain.Interface;
using System;

namespace Mega.Ticketing.Presistance.Data
{
    public class CompanyRepository : BaseRepository<Company, Guid>, ICompanyRepository
    {
        public CompanyRepository(ITicketingDbContextFactory contextFactory) : base(contextFactory)
        {
        }
    }
}
