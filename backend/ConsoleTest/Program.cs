using GenerateApp.Controllers;
using System;
using System.Threading.Tasks;

namespace ConsoleTest
{
    class Program
    {
        static async Task Main(string[] args)
        {
            var payLoadConn = new PayLoadConn();
            payLoadConn.connDatabase = "als";
            payLoadConn.connType = "MSSQL";
            payLoadConn.connIntegratedSecurity = false;
            payLoadConn.connUser = "sa";
            payLoadConn.connPassword = "yourStrong(!)Password";
            payLoadConn.connHost= ".";
           
            Console.WriteLine(payLoadConn.ConnectionString());
            var q = await payLoadConn.FromPayloadConn();
            Console.WriteLine(q.tables);

        }
    }
}
