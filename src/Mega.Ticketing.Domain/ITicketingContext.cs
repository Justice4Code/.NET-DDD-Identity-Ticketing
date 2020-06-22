using Mega.Ticketing.Domain.Interface;

namespace Mega.Ticketing.Domain
{
    public interface ITicketingContext : IUnitOfWork
    {
        ICompanyRepository Companies { get; }
        ICartableRepository Cartables { get; }
        ICategoryRepository Categories { get; }
        ITicketRepository Tickets { get; }
        IConversationRepository Conversations { get; }
        IAccessoryRepository Accessories { get; }
    }
}
