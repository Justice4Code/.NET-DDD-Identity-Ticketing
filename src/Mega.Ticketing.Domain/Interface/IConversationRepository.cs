using Mega.Ticketing.Domain.Entities;
using System;

namespace Mega.Ticketing.Domain.Interface
{
    public interface IConversationRepository : IRepository<Conversation,Guid>
    {
    }
}
