using Mega.Ticketing.Domain;
using Mega.Ticketing.Domain.Interface;
using Mega.Ticketing.Presistance.Data;

namespace Mega.Ticketing.Presistance
{
    public class TicketingContext : UnitOfWork, ITicketingContext
    {
        public TicketingContext(ITicketingDbContextFactory contextFactory,
            IAccessoryRepository accessoryRepository,
            ICartableRepository cartableRepository,
            ICategoryRepository categoryRepository,
            ICompanyRepository companyRepository,
            IConversationRepository conversationRepository,
            ITicketRepository ticketRepository) : base(contextFactory)
        {
            Companies = companyRepository;
            Cartables = cartableRepository;
            Categories = categoryRepository;
            Tickets = ticketRepository;
            Conversations = conversationRepository;
            Accessories = accessoryRepository;

        }
        public ICompanyRepository Companies { get; }
        public ICartableRepository Cartables { get; }
        public ICategoryRepository Categories { get; }
        public ITicketRepository Tickets { get; }
        public IConversationRepository Conversations { get; }
        public IAccessoryRepository Accessories { get; }
    }
}
