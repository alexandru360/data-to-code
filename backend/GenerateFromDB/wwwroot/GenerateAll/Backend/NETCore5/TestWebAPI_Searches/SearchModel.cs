using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestWebAPI_Searches
{
    public abstract class SearchModel<T>
    {
        public SearchField[] SearchFields { get; set; }
        public Pagination Pagination { get; set; }
        public OrderBy[] OrderBys { get; set; }

        protected virtual void  ArrangeDefaults()
        {
            Pagination ??= Pagination.Default();
        }

        public abstract IQueryable<T> GetSearch(IQueryable<T> data);

    }
}