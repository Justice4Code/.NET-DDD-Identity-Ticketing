using Mega.Ticketing.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mega.Ticketing.Domain.Service
{
    public interface ITicketService
    {
        /// <summary>
        /// This method creates a ticket with first comment and it's attachment 
        /// </summary>
        /// <param name="currentUserId"></param>
        /// <param name="obj"></param>
        /// <returns>an object of response class</returns>
        Response Create(Ticket obj);
        /// <summary>
        /// this method only update a single ticket
        /// </summary>
        /// <param name="currentUserId"></param>
        /// <param name="obj"></param>
        /// <returns>an object of response class</returns>
        Response Update(Ticket obj);
        /// <summary>
        /// This Method either Update or Insert the entity based on whether its exists or not. 
        /// </summary>
        /// <param name="currentUserId"></param>
        /// <param name="obj"></param>
        /// <returns>an object of response class</returns>
        Response Save(Ticket obj);
        /// <summary>
        ///  this method returns one object of Ticket class as well as it's conversations and it's accessories. 
        /// </summary>
        /// <param name="id"></param>
        /// <param name="currentUserId"></param>
        /// <returns>an object of response class with an object of Ticket type generic result</returns>
        Response<Ticket> GetById(Guid id);
        /// <summary>
        /// Gets all the entities
        /// </summary>
        /// <param name="currentUserId"></param>
        /// <returns>an object of response class with a List of Ticket objects as generic result</returns>
        Response<List<Ticket>> GetAll();
        /// <summary>
        /// this method will either soft delete (will update the isdelete flag to true) or will hard delete (delete from database) base on type. 
        /// </summary>
        /// <param name="currentUserId"></param>
        /// <param name="id"></param>
        /// <param name="type"></param>
        /// <returns>an object of response class</returns>
        Response Delete(Guid id);
        /// <summary>
        /// Gets all the ticket entities for cartable and do the paging
        /// </summary>
        /// <param name="currentUserId"></param>
        /// <param name="cartableId"></param>
        /// <param name="pageNum"></param>
        /// <param name="pageSize"></param>
        /// <returns>an object of response class with a List of Ticket objects as generic result</returns>
        Response<List<Ticket>> GetByCartableId(Guid cartableId);
        /// <summary>
        /// Gets all the tickets for user client
        /// </summary>
        /// <param name="currentUserId"></param>
        /// <param name="userId"></param>
        /// <returns>an object of response class with a List of Ticket objects as generic result</returns>
        Response<List<Ticket>> GetByUserId(string userId);

    }

    public class TicketService : ITicketService
    {
        private readonly ITicketingContext _context;

        public TicketService(ITicketingContext ticketingContext)
        {
            _context = ticketingContext;
        }
        public Response Create(Ticket obj)
        {
            var ProcessResponse = new Response();
            try
            {
                if (obj == null)
                    ProcessResponse.Failed("Object is null");
                _context.Tickets.Add(obj);
                var ret = _context.Commit();
                if (ret)
                    ProcessResponse.Failed("DAL Problem");

            }
            catch (Exception ex)
            {
                ProcessResponse.Failed($"Error : {ex.Message} - Inner Error : {ex.InnerException.Message }");
            }
            return ProcessResponse;
        }

        public Response Delete(Guid id)
        {
            throw new NotImplementedException();
        }

        public Response<List<Ticket>> GetAll()
        {
            throw new NotImplementedException();
        }

        public Response<List<Ticket>> GetByCartableId(Guid cartableId)
        {
            var ProcessResponse = new Response<List<Ticket>>();
            try
            {
                var ret = _context.Tickets.Get(x => x.CartableId == cartableId && x.IsActive == true);
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

        public Response<Ticket> GetById(Guid id)
        {
            var ProcessResponse = new Response<Ticket>();
            try
            {
                var ret = _context.Tickets.GetFirstOrDefault(x => x.Id == id, includes: x => x.Conversations);
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

        public Response<List<Ticket>> GetByUserId(string userId)
        {
            var ProcessResponse = new Response<List<Ticket>>();
            try
            {
                var ret = _context.Tickets.Get(x => x.UserId == userId && x.IsActive == true);
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

        public Response Save(Ticket obj)
        {
            throw new NotImplementedException();
        }

        public Response Update(Ticket obj)
        {
            throw new NotImplementedException();
        }
    }
}
