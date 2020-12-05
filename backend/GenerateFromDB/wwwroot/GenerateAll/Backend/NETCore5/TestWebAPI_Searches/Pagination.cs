using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestWebAPI_Searches
{
     public record PaginatedRecords<T>(long Nr, T[] records);
     
    public class Pagination
    {
        public int PageSize { get; set; }
        public int PageNo { get; set; }
        public int SkipRecords()
        {
            
            return Math.Abs((PageNo - 1) * PageSize);
            
        }
        public int PageSizeAbsolute()
        {
            var data = Math.Abs(PageSize);
            if (data == 0)
                data = 10;
            return data;        
        }

        public static Pagination Default()
        {
            return new Pagination()
            {
                PageNo = 1,
                PageSize = 10
            };
        }
    }

}
