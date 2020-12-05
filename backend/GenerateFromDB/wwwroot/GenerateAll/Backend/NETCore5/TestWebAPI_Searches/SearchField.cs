using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestWebAPI_Searches
{

    public class SearchField<T> where T: IFieldSearch
    {
        public T Field { get; set; }
        public string Value { get; set; }
        public SearchCriteria Criteria { get; set; }

    }

}
