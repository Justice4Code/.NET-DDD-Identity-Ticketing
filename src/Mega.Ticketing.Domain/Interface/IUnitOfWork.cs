using System.Threading;
using System.Threading.Tasks;

namespace Mega.Ticketing.Domain.Interface
{
    public interface IUnitOfWork
    {
        bool Commit();
        Task<bool> CommitAsync(CancellationToken ct = new CancellationToken());
    }
}
