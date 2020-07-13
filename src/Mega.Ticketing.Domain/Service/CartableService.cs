using Mega.Ticketing.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mega.Ticketing.Domain.Service
{
    public interface ICartableService
    {
        /// <summary>
        /// This Method either Update or Insert the entity based on whether its exists or not. 
        /// </summary>
        /// <param name="currentUserId"></param>
        /// <param name="obj"></param>
        /// <returns>an object of response class</returns>
        Response Save(Cartable obj);
        /// <summary>
        /// this method returns one object of cartable class
        /// </summary>
        /// <param name="id"></param>
        /// <param name="currentUserId"></param>
        /// <returns>an object of response class with an object of cartable type generic result</returns>
        Response<Cartable> GetById(Guid id);
        /// <summary>
        /// Gets all the entities and do the paging
        /// /// </summary>
        /// <returns>an object of response class with a List of cartable objects as generic result</returns>
        Response<List<Cartable>> GetAll();
        /// <summary>
        /// Gets all the entities
        /// </summary>
        /// <param name="currentUserId"></param>
        /// <returns>an object of response class with a List of cartable objects as generic result</returns>
        Response<List<Cartable>> GetAll(Guid companyId);
        /// <summary>
        /// this method will either soft delete (will update the isdelete flag to true) or will hard delete (delete from database) base on type. 
        /// </summary>
        /// <param name="currentUserId"></param>
        /// <param name="id"></param>
        /// <param name="type"></param>
        /// <returns>an object of response class</returns>
        Response Delete(Guid id);
        Response<Cartable> GetDefault(Guid companyId);
    }
    public class CartableService : ICartableService
    {
        private readonly ITicketingContext _context;
        public CartableService(ITicketingContext context)
        {
            _context = context;
        }
        public Response Delete(Guid id)
        {
            var ProcessResponse = new Response();
            try
            {
                var ret = _context.Cartables.Get(id);
                if (ret != null)
                {
                    var response = _context.Cartables.SoftDelete(ret);
                    if (!response)
                        ProcessResponse.Failed("DAL Problem");
                    _context.Commit();
                }
                else
                    ProcessResponse.Failed("DAL Problem");
            }
            catch (Exception ex)
            {
                ProcessResponse.Failed($"Error : {ex.Message} - Inner Error : {ex.InnerException.Message }");
            }
            return ProcessResponse;
        }

        public Response<List<Cartable>> GetAll()
        {
            var ProcessResponse = new Response<List<Cartable>>();
            try
            {
                var ret = _context.Cartables.Get(x => x.IsActive == true, includes: x => x.Company);
                if (ret != null)
                    ProcessResponse.Result = ret.ToList();
                else
                    ProcessResponse.Failed("DAL Problem");
            }
            catch (Exception ex)
            {
                ProcessResponse.Failed($"Error : {ex.Message} - Inner Error : {ex.InnerException.Message }");
            }
            return ProcessResponse;
        }

        public Response<List<Cartable>> GetAll(Guid companyId)
        {
            var ProcessResponse = new Response<List<Cartable>>();
            try
            {
                var ret = _context.Cartables.Get(x => x.CompanyId == companyId && x.IsActive == true);
                if (ret != null)
                    ProcessResponse.Result = ret.ToList();
                else
                    ProcessResponse.Failed("DAL Problem");
            }
            catch (Exception ex)
            {
                ProcessResponse.Failed($"Error : {ex.Message} - Inner Error : {ex.InnerException.Message }");
            }
            return ProcessResponse;
        }

        public Response<Cartable> GetById(Guid id)
        {
            var ProcessResponse = new Response<Cartable>();
            try
            {
                var ret = _context.Cartables.Get(id);
                if (ret != null)
                    ProcessResponse.Result = ret;
                else
                    ProcessResponse.Failed("DAL Problem");
            }
            catch (Exception ex)
            {
                ProcessResponse.Failed($"Error : {ex.Message} - Inner Error : {ex.InnerException.Message }");
            }
            return ProcessResponse;
        }

        public Response<Cartable> GetDefault(Guid companyId)
        {
            var ProcessResponse = new Response<Cartable>();
            try
            {
                var ret = _context.Cartables.Get(x => x.CompanyId == companyId && x.IsDefault == true && x.IsActive == true);
                if (ret != null)
                    ProcessResponse.Result = ret.FirstOrDefault();
                else
                    ProcessResponse.Failed("DAL Problem");
            }
            catch (Exception ex)
            {
                ProcessResponse.Failed($"Error : {ex.Message} - Inner Error : {ex.InnerException.Message }");
            }
            return ProcessResponse;
        }

        public Response Save(Cartable obj)
        {
            var ProcessResponse = new Response();
            try
            {
                if (obj == null)
                    ProcessResponse.Failed("Object is null");
                if (_context.Cartables.IsExists(x => x.Id == obj.Id))
                {
                    var ret = _context.Cartables.Update(obj);
                    _context.Commit();
                    if (ret == null)
                        ProcessResponse.Failed("DAL Problem");
                }
                else
                {
                    var ret = _context.Cartables.Add(obj);
                    _context.Commit();
                    if (ret == null)
                        ProcessResponse.Failed("DAL Problem");
                }
            }
            catch (Exception ex)
            {
                ProcessResponse.Failed($"Error : {ex.Message} - Inner Error : {ex.InnerException.Message }");
            }
            return ProcessResponse;
        }
    }
}
