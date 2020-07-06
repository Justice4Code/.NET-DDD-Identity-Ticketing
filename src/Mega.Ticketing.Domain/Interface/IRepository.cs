using Mega.Ticketing.Domain.Entities;
using PagedList;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;

namespace Mega.Ticketing.Domain.Interface
{
    public interface IRepository<T, in TU>
        where T : BaseEntity<TU>
        where TU : struct
    {
        T Add(T entity);
        Task<T> AddAsync(T entity, CancellationToken ct = default);
        bool Any(Expression<Func<T, bool>> predicate);
        int Count(Expression<Func<T, bool>> where);
        int Count();
        Task<int> CountAsync();
        Task<int> CountAsync(Expression<Func<T, bool>> where);
        bool Delete(T entity);
        bool Delete(Expression<Func<T, bool>> where);
        Task<bool> DeleteAsync(T entity, CancellationToken ct = default);
        Task<bool> DeleteAsync(Expression<Func<T, bool>> where, CancellationToken ct = default);
        bool Exists(Expression<Func<T, bool>> predicate);
        ICollection<T> Get();
        T Get(TU id);
        ICollection<T> Get(Expression<Func<T, bool>> where);
        ICollection<T> Get(Expression<Func<T, bool>> filter = null, params Expression<Func<T, object>>[] includes);
        Task<T> GetAsync(TU id, CancellationToken ct = default);
        Task<ICollection<T>> GetAsync(Expression<Func<T, bool>> where, CancellationToken ct = default);
        Task<ICollection<T>> GetAsync(CancellationToken ct = default);
        ICollection<T> GetLimit(Expression<Func<T, bool>> where, int take, int skip);
        Task<ICollection<T>> GetLimitAsync(Expression<Func<T, bool>> where, int take, int skip, CancellationToken ct = default);
        IPagedList<T> GetPage<TOrder>(Page page, Expression<Func<T, bool>> where, Expression<Func<T, TOrder>> order);
        Paginated<T> GetPage(Expression<Func<T, bool>> where, int pageNumber, int pageSize);
        Task<Paginated<T>> GetPageAsync(Expression<Func<T, bool>> where, int pageNumber, int pageSize, CancellationToken ct = default);
        Task<IPagedList<T>> GetPageAsync<TOrder>(Page page, Expression<Func<T, bool>> where, Expression<Func<T, TOrder>> order, CancellationToken ct = default);
        bool SoftDelete(Expression<Func<T, bool>> where);
        bool SoftDelete(T entity);
        Task<bool> SoftDeleteAsync(Expression<Func<T, bool>> where, CancellationToken ct = default);
        Task<bool> SoftDeleteAsync(T entity, CancellationToken ct = default);
        T Update(T entity);
        Task<T> UpdateAsync(T entity, CancellationToken ct = default);
        bool IsExists(Expression<Func<T, bool>> where);
        T GetFirstOrDefault(Expression<Func<T, bool>> filter = null, params Expression<Func<T, object>>[] includes);
    }
}
