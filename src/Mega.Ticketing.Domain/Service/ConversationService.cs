using Mega.Ticketing.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mega.Ticketing.Domain.Service
{
    public interface IConversationService
    {
        /// <summary>
        /// This Method either Update or Insert the entity based on whether its exists or not. 
        /// </summary>
        /// <param name="obj"></param>
        /// <returns>an object of response class</returns>
        Response Save(Conversation obj);
        /// <summary>
        /// this method returns one object of conversation class
        /// </summary>
        /// <param name="id"></param>
        /// <returns>an object of response class with an object of conversation type generic result</returns>
        Response<Conversation> GetById(Guid id);
        /// <summary>
        /// Gets all the entities and do the paging
        /// </summary>
        /// <returns>an object of response class with a List of conversation objects as generic result</returns>
        Response<List<Conversation>> GetAll();
        /// <summary>
        /// this method will either soft delete (will update the isdelete flag to true) or will hard delete (delete from database) base on type. 
        /// </summary>
        /// <param name="id"></param>
        /// <returns>an object of response class</returns>
        Response Delete(Guid id);

    }
    public class ConversationService : IConversationService
    {
        private readonly ITicketingContext _context;
        public ConversationService(ITicketingContext context)
        {
            _context = context;
        }

        public Response Delete(Guid id)
        {
            var ProcessResponse = new Response();
            try
            {
                var ret = _context.Conversations.Get(id);
                if (ret != null)
                {
                    var response = _context.Conversations.SoftDelete(ret);
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

        public Response<List<Conversation>> GetAll()
        {
            var ProcessResponse = new Response<List<Conversation>>();
            try
            {
                var ret = _context.Conversations.Get(x => x.IsActive == true);
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

        public Response<Conversation> GetById(Guid id)
        {
            var ProcessResponse = new Response<Conversation>();
            try
            {
                var ret = _context.Conversations.Get(id);
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

        public Response Save(Conversation obj)
        {
            var ProcessResponse = new Response();
            try
            {
                if (obj == null)
                    ProcessResponse.Failed("Object is null");
                if (_context.Conversations.IsExists(x => x.Id == obj.Id))
                {
                    var ret = _context.Conversations.Update(obj);
                    _context.Commit();
                    if (ret == null)
                        ProcessResponse.Failed("DAL Problem");
                }
                else
                {
                    var ret = _context.Conversations.Add(obj);
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
