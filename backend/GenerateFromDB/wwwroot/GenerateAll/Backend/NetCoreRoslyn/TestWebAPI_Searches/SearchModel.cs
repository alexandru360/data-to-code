using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestWebAPI_Searches
{
    public  class SearchModel
    {
        public SearchField[] SearchFields { get; set; }
        public Pagination Pagination { get; set; }
        public OrderBy[] OrderBys { get; set; }

    }
}