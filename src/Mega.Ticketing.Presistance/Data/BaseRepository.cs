using Mega.Ticketing.Domain.Entities;
using Mega.Ticketing.Domain.Interface;
using Mega.Ticketing.Presistance.Core;
using PagedList;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;

namespace Mega.Ticketing.Presistance.Data
{
    public abstract class BaseRepository<T, TU> : IRepository<T, TU>
        where T : BaseEntity<TU>
        where TU : struct
    {
        protected readonly TicketingDbContext _context;
        protected readonly IDbSet<T> _dbSet;
        protected readonly DateTime _now;

        protected BaseRepository(ITicketingDbContextFactory contextFactory)
        {
            _context = contextFactory.GetContext();
            _dbSet = _context.Set<T>();
            _now = DateTime.Now;
        }

        public virtual T Add(T entity)
        {
            entity.CreatedDate = _now;
            entity.ModifiedDate = _now;
            entity.IsActive = true;

            _dbSet.Add(entity);

            return entity;
        }

        public virtual T Update(T entity)
        {
            var old = Get(entity.Id);
            _context.Entry(old).State = EntityState.Detached;

            entity.ModifiedDate = _now;
            entity.CreatedDate = old.CreatedDate;
            entity.CreatedBy = old.CreatedBy;

            _context.Entry(entity).State = EntityState.Modified;

            return entity;
        }

        public virtual bool Delete(T entity)
        {
            _dbSet.Remove(entity);

            return true;
        }

        public virtual bool Delete(Expression<Func<T, bool>> where)
        {
            var entities = _dbSet.Where(where).AsEnumerable();
            foreach (var entity in entities)
                _dbSet.Remove(entity);

            return true;
        }

        public bool SoftDelete(T entity)
        {
            entity.IsActive = false;
            Update(entity);

            return true;
        }

        public bool SoftDelete(Expression<Func<T, bool>> where)
        {
            var entities = _dbSet.Where(where).AsEnumerable();
            foreach (var entity in entities)
            {
                entity.ModifiedDate = _now;
                entity.IsActive = false;
                _context.Entry(entity).State = EntityState.Modified;
            }

            return true;
        }

        public virtual T Get(TU id)
        {
            return _dbSet.Find(id);
        }

        public virtual ICollection<T> Get(Expression<Func<T, bool>> where)
        {
            return _dbSet.Where(where).ToList();
        }

        public virtual ICollection<T> Get()
        {
            return _dbSet.ToList();
        }
        public virtual bool IsExists(Expression<Func<T, bool>> where)
        {
            return _dbSet.Any(where); 
        }

        public virtual IPagedList<T> GetPage<TOrder>(Page page, Expression<Func<T, bool>> where,
            Expression<Func<T, TOrder>> order)
        {
            var results = _dbSet.OrderBy(order).Where(where).GetPage(page).ToList();
            var total = _dbSet.Count(where);
            return new StaticPagedList<T>(results, page.PageNumber, page.PageSize, total);
        }

        public virtual async Task<T> AddAsync(T entity, CancellationToken ct = default)
        {
            entity.ModifiedDate = _now;
            entity.CreatedDate = _now;
            entity.IsActive = true;

            _dbSet.Add(entity);

            return entity;
        }

        public virtual async Task<T> UpdateAsync(T entity, CancellationToken ct = default)
        {
            var old = await GetAsync(entity.Id, ct);
            _context.Entry(old).State = EntityState.Detached;

            entity.ModifiedDate = _now;
            entity.CreatedDate = old.CreatedDate;
            entity.CreatedBy = old.CreatedBy;
            entity.IsActive = old.IsActive;

            _context.Entry(entity).State = EntityState.Modified;

            return entity;
        }

        public virtual async Task<bool> DeleteAsync(T entity, CancellationToken ct = default)
        {
            _dbSet.Remove(entity);

            return true;
        }

        public virtual async Task<bool> DeleteAsync(Expression<Func<T, bool>> where,
            CancellationToken ct = default)
        {
            var entities = _dbSet.Where(where).AsEnumerable();
            foreach (var entity in entities)
                _dbSet.Remove(entity);

            return true;
        }

        public async Task<bool> SoftDeleteAsync(T entity, CancellationToken ct = default)
        {
            entity.IsActive = false;
            await UpdateAsync(entity, ct);

            return true;
        }

        public async Task<bool> SoftDeleteAsync(Expression<Func<T, bool>> @where,
            CancellationToken ct = default)
        {
            var entities = _dbSet.Where(where).AsEnumerable();
            foreach (var entity in entities)
            {
                entity.IsActive = false;
                entity.ModifiedDate = _now;

                _context.Entry(entity).State = EntityState.Modified;
            }

            return true;
        }

        public virtual async Task<T> GetAsync(TU id, CancellationToken ct = default)
        {
            return await _context.Set<T>().FindAsync(ct, id);
        }

        public virtual async Task<ICollection<T>> GetAsync(Expression<Func<T, bool>> @where,
            CancellationToken ct = default)
        {
            return await _dbSet.Where(where).ToListAsync(ct);
        }

        public virtual async Task<ICollection<T>> GetAsync(CancellationToken ct = default)
        {
            return await _dbSet.ToListAsync(ct);
        }

        public virtual async Task<IPagedList<T>> GetPageAsync<TOrder>(Page page, Expression<Func<T, bool>> where,
            Expression<Func<T, TOrder>> order, CancellationToken ct = default)
        {
            var results = await _dbSet.OrderBy(order).Where(where).GetPage(page).ToListAsync(ct);
            var total = await _dbSet.CountAsync(where, ct);

            return new StaticPagedList<T>(results, page.PageNumber, page.PageSize, total);
        }

        public virtual async Task<int> CountAsync(Expression<Func<T, bool>> @where)
        {
            return await _dbSet.CountAsync(where);
        }

        public virtual async Task<int> CountAsync()
        {
            return await _dbSet.CountAsync();
        }

        public virtual int Count(Expression<Func<T, bool>> @where)
        {
            return _dbSet.Count(where);
        }

        public virtual int Count()
        {
            return _dbSet.Count();
        }

        public virtual bool Exists(Expression<Func<T, bool>> predicate)
        {
            return _dbSet.Count(predicate) > 0;
        }

        public virtual bool Any(Expression<Func<T, bool>> predicate)
        {
            return _dbSet.Any(predicate);
        }

        public virtual ICollection<T> GetLimit(Expression<Func<T, bool>> @where,
            int take, int skip)
        {
            return _dbSet.Where(where).OrderBy(x => x.Id).Skip(skip).Take(take).ToList();
        }

        public virtual async Task<ICollection<T>> GetLimitAsync(Expression<Func<T, bool>> @where,
             int take, int skip, CancellationToken ct = default)
        {
            return await _dbSet.Where(where).OrderByDescending(x => x.Id).Skip(skip).Take(take).ToListAsync(ct);
        }

        public virtual Paginated<T> GetPage(Expression<Func<T, bool>> @where,
             int pageNumber, int pageSize)
        {
            var itemCount = Count(where);
            var pagesCount = (itemCount / pageSize) +
                             ((itemCount % pageSize == 0) ? 0 : 1);

            var pageItems = GetLimit(where,
                                          pageSize,
                                          ((pageNumber - 1) < 0 ? 0 : (pageNumber - 1)) *
                                                                pageSize);

            Paginated<T> paginatedResult = new Paginated<T>
            {
                ItemsCount = itemCount,
                PagesCount = pagesCount,
                PageNumber = pageNumber,
                PageItems = pageItems
            };

            return paginatedResult;
        }

        public virtual async Task<Paginated<T>> GetPageAsync(Expression<Func<T, bool>> @where,
             int pageNumber, int pageSize, CancellationToken ct = default)
        {
            var itemCount = await CountAsync(where);

            int pagesCount = 0;
            ICollection<T> pageItems = null;

            if (itemCount != 0 && pageSize > 0)
            {
                pagesCount = (itemCount / pageSize) +
                                 ((itemCount % pageSize == 0) ? 0 : 1);

                pageItems = await GetLimitAsync(where,
                                              pageSize,
                                              ((pageNumber - 1) < 0 ? 0 : (pageNumber - 1)) *
                                                                    pageSize,
                                                                    ct);
            }

            Paginated<T> paginatedResult = new Paginated<T>
            {
                ItemsCount = itemCount,
                PagesCount = pagesCount,
                PageNumber = pageNumber,
                PageItems = pageItems
            };

            return paginatedResult;
        }

        public virtual T GetFirstOrDefault(Expression<Func<T, bool>> filter = null, params Expression<Func<T, object>>[] includes)
        {
            IQueryable<T> query = _dbSet;

            foreach (Expression<Func<T, object>> include in includes)
                query = query.Include(include);

            return query.FirstOrDefault(filter);
        }

        public ICollection<T> Get(Expression<Func<T, bool>> filter = null, params Expression<Func<T, object>>[] includes)
        {
            IQueryable<T> query = _dbSet;

            foreach (Expression<Func<T, object>> include in includes)
                query = query.Include(include);

            if (filter != null)
                query = query.Where(filter);

            return query.ToList(); 
        }
    }
}
