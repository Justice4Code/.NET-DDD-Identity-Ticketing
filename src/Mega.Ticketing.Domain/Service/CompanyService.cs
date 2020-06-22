using Mega.Ticketing.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Mega.Ticketing.Domain.Service
{
    public interface ICompanyService
    {
        /// <summary>
        /// This Method either Update or Insert the entity based on whether its exists or not. 
        /// </summary>
        /// <param name="currentUserId"></param>
        /// <param name="simpleObj"></param>
        /// <returns>an object of response class</returns>
        Response Save(Company obj);
        /// <summary>
        /// this method returns one object of company class
        /// </summary>
        /// <param name="id"></param>
        /// <param name="currentUserId"></param>
        /// <returns>an object of response class with an object of company type generic result</returns>
        Response<Company> GetById(Guid id);
        /// <summary>
        /// Gets all the entities and do the paging
        /// /// </summary>
        /// <param name="pageNum"></param>
        /// <param name="pageSize"></param>
        /// <param name="currentUserId"></param>
        /// <returns>an object of response class with a List of Company objects as generic result</returns>
        Response<List<Company>> GetAll();
        /// <summary>
        /// this method will either soft delete (will update the isdelete flag to true) or will hard delete (delete from database) base on type. 
        /// </summary>
        /// <param name="currentUserId"></param>
        /// <param name="id"></param>
        /// <param name="type"></param>
        /// <returns>an object of response class</returns>
        Response Delete(Guid id, bool type = true);
        Response Insert(Company dto);
    }

    public class CompanyService : ICompanyService
    {
        private readonly ITicketingContext _context;

        public CompanyService(ITicketingContext context)
        {
            _context = context;
        }

        public Response Delete(Guid id, bool type = true)
        {
            throw new NotImplementedException();
        }

        public Response<List<Company>> GetAll()
        {
            var ProcessResponse = new Response<List<Company>>();
            try
            {
                var ret = _context.Companies.Get();
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

        public Response<Company> GetById(Guid id)
        {
            var ProcessResponse = new Response<Company>();
            try
            {
                var ret = _context.Companies.Get(id);
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

        public Response Save(Company obj)
        {
            var ProcessResponse = new Response();
            try
            {
                if (obj == null)
                    ProcessResponse.Failed("Object is null");
                if (_context.Companies.IsExists(x => x.Id == obj.Id))
                {
                    var ret = _context.Companies.Update(obj);
                    _context.Commit();
                    if (ret == null)
                        ProcessResponse.Failed("DAL Problem");
                }
                else
                {
                    var ret = _context.Companies.Add(obj);
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

        public Response Insert(Company dto)
        {
            var ProcessResponse = new Response();
            try
            {
                if (dto == null)
                    ProcessResponse.Failed("Object is null");
                var ret = _context.Companies.Add(dto);
                var save = _context.Commit();
                if (ret == null)
                    ProcessResponse.Failed("DAL Problem");
            }
            catch (Exception ex)
            {
                ProcessResponse.Failed($"Error : {ex.Message} - Inner Error : {ex.InnerException.Message }");
            }
            return ProcessResponse;

        }
    }
}
