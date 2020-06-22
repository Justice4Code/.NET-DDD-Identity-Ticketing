using Mega.Ticketing.Domain.Entities;
using System;

namespace Mega.Ticketing.Domain.Interface
{
    public interface ICompanyRepository : IRepository<Company,Guid>
    {
    }
}
