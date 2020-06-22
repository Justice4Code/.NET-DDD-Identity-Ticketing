using Mega.Ticketing.Domain.Interface;
using Mega.Ticketing.Presistance.Core;
using System.Threading;
using System.Threading.Tasks;

namespace Mega.Ticketing.Presistance.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        protected readonly TicketingDbContext _context;

        public UnitOfWork(ITicketingDbContextFactory contextFactory)
        {
            _context = contextFactory.GetContext();
        }

        public virtual bool Commit()
        {
            var rows = _context.SaveChanges();
            return rows > 0;
        }

        public virtual async Task<bool> CommitAsync(CancellationToken ct = new CancellationToken())
        {
            var rows = await _context.SaveChangesAsync(ct);
            return rows > 0;
        }
    }
}
