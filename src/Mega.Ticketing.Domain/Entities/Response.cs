using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mega.Ticketing.Domain.Entities
{
    /// <summary>
    /// Base class returns the basic information about the operation
    /// </summary>
    public class Response
    {
        public Guid? UID { get; set; }
        public bool IsSuccessful { get; set; }
        public string Error { get; set; }
        public int RecCount { get; set; }
        public Response()
        {
            this.IsSuccessful = true;
        }
        public Response(bool isSuccessfull = true, string exception = null)
        {
            this.IsSuccessful = isSuccessfull;
            this.Error = exception;
        }
        /// <summary>
        /// this method will update the object and tell you the operation has failed 
        /// </summary>
        public void Failed()
        {
            this.IsSuccessful = false;
        }
        /// <summary>
        /// this method will update the object and tell you the operation has failed and why it's failed
        /// </summary>
        /// <param name="error"></param>
        public void Failed(string error)
        {
            this.IsSuccessful = false;
            this.Error = string.Format("Something wrong has happened, Error: {0}", error);
        }
        /// <summary>
        /// this method will update the object and tell you the operation has failed and why it's failed.  
        /// </summary>
        /// <param name="exception"></param>
        /// <param name="innerException"></param>
        public void Failed(string exception, string innerException)
        {
            this.IsSuccessful = false;
            this.Error = string.Format("Exception in process, Exception: {0}, InnerException: {1}", exception, innerException);
        }

    }
    /// <summary>
    /// This class retrns the basic information as well as returns T Result
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class Response<T> : Response
    {
        public T Result { get; set; }
        public Response() : base() { }
        public Response(bool isSuccessful = true, string exception = null, T result = default(T))
            : base(isSuccessful, exception)
        {
            this.Result = result;
        }

    }
}
