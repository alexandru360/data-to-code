using System;
using System.Collections.Generic;

namespace GenerateApp.Controllers
{
    public class Logs: List<string>
    {
        public void AddLog(string id, string s)
        {
            Console.WriteLine($"{id}=> {s}");
            base.Add(s);
        }
    }
}
