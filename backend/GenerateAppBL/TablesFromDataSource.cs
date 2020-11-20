using Org.BouncyCastle.Crypto.Modes.Gcm;
using System.Collections.Generic;

namespace GenerateApp.Controllers
{
    public class TablesFromDataSource
    {
        public bool Success { get; set; }
        public string error { get; set; }
        public Table[] tables { get; set; }

        public BaseWithColumns[] input
        {
            get
            {
                var all = new List<BaseWithColumns>();
                if (tables?.Length > 0)
                    all.AddRange(tables);
                if (views?.Length > 0)
                    all.AddRange(views);

                return all.ToArray();
            }
        }
        public View[] views { get; set; }

        public Relations[] relations { get; set; }
    }
}
