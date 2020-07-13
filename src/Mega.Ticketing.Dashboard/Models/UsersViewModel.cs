using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Mega.Ticketing.Dashboard.Models
{
    public class UsersViewModel
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string VirtualName { get; set; }
        public string CompanyTitle { get; set; }
    }
}