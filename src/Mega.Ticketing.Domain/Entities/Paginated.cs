using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mega.Ticketing.Domain.Entities
{
    public class Paginated<T> where T : class
    {
        public int ItemsCount { get; set; }
        public int PagesCount { get; set; }
        public int PageNumber { get; set; }
        public ICollection<T> PageItems { get; set; }
    }
}
