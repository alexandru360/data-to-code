using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenerateAppBL
{
    public static class MyDate
    {
        public static string UTCFormat()
        {
            var dt = DateTime.UtcNow;
            dt = new DateTime(1970, 4, 16);
            return dt.ToString("yyyyMMddHHmmss");
        }
    }
}
