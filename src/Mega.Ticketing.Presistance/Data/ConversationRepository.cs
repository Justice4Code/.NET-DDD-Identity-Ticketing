using Mega.Ticketing.Domain.Entities;
using Mega.Ticketing.Domain.Interface;
using System;

namespace Mega.Ticketing.Presistance.Data
{
    public class ConversationRepository : BaseRepository<Conversation, Guid>, IConversationRepository
    {
        public ConversationRepository(ITicketingDbContextFactory contextFactory) : base(contextFactory)
        {
        }
    }
}
