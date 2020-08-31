using Mega.Ticketing.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mega.Ticketing.Domain.Service
{
    public interface ICategoryService
    {
        /// <summary>
        /// This Method either Update or Insert the entity based on whether its exists or not. 
        /// </summary>
        /// <param name="obj"></param>
        /// <returns>an object of response class</returns>
        Response Save(Category obj);
        /// <summary>
        /// this method returns one object of Category class
        /// </summary>
        /// <param name="id"></param>
        /// <returns>an object of response class with an object of Category type generic result</returns>
        Response<Category> GetById(Guid id);
        /// <summary>
        /// Gets all the entities and do the paging
        /// /// </summary>
        /// <returns>an object of response class with a List of Category objects as generic result</returns>
        Response<List<Category>> GetAll(Guid cartableId);
        /// <summary>
        /// Gets all the entities
        /// </summary>
        /// <returns>an object of response class with a List of Category objects as generic result</returns>
        Response<List<Category>> GetAll();
        /// <summary>
        /// this method will either soft delete (will update the isdelete flag to true) or will hard delete (delete from database) base on type. 
        /// </summary>
        /// <param name="id"></param>
        /// <returns>an object of response class</returns>
        Response Delete(Guid id);
        /// <summary>
        /// Gets all the categories for the company
        /// </summary>
        /// <param name="companyId"></param>
        /// <returns></returns>
        Response<List<Category>> GetAllCategoriesForCompany(Guid companyId);

    }

    public class CategoryService : ICategoryService
    {
        private readonly ITicketingContext _context;

        public CategoryService(ITicketingContext context)
        {
            _context = context;
        }

        public Response Delete(Guid id)
        {
            var ProcessResponse = new Response();
            try
            {
                var ret = _context.Categories.Get(id);
                if (ret != null)
                {
                    var response = _context.Categories.SoftDelete(ret);
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

        public Response<List<Category>> GetAll(Guid cartableId)
        {
            var ProcessResponse = new Response<List<Category>>();
            try
            {
                var ret = _context.Categories.Get(x => x.CartableId == cartableId && x.IsActive == true);
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

        public Response<List<Category>> GetAll()
        {
            var ProcessResponse = new Response<List<Category>>();
            try
            {
                var ret = _context.Categories.Get(x => x.IsActive == true);
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

        public Response<List<Category>> GetAllCategoriesForCompany(Guid companyId)
        {
            var ProcessResponse = new Response<List<Category>>();
            try
            {
                var defaultCartable = _context.Cartables.Get(x => x.CompanyId == companyId && x.IsDefault == true && x.IsActive == true).FirstOrDefault();

                var ret = _context.Categories.Get(x => x.CartableId == defaultCartable.Id && x.IsActive == true).ToList();
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

        public Response<Category> GetById(Guid id)
        {
            var ProcessResponse = new Response<Category>();
            try
            {
                var ret = _context.Categories.Get(id);
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

        public Response Save(Category obj)
        {
            var ProcessResponse = new Response();
            try
            {
                if (obj == null)
                    ProcessResponse.Failed("Object is null");
                if (_context.Categories.IsExists(x => x.Id == obj.Id))
                {
                    var ret = _context.Categories.Update(obj);
                    _context.Commit();
                    if (ret == null)
                        ProcessResponse.Failed("DAL Problem");
                }
                else
                {
                    var ret = _context.Categories.Add(obj);
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
