using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Mega.Ticketing.Api.Models.Requests
{
    public class GetAllTicketsForUserRequest
    {
        public string UserApplicationId { get; set; }
    }
}