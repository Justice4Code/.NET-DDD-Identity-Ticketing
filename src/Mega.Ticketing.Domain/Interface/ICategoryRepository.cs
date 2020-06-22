using Mega.Ticketing.Domain.Entities;
using System;

namespace Mega.Ticketing.Domain.Interface
{
    public interface ICategoryRepository : IRepository<Category,Guid>
    {
    }
}
