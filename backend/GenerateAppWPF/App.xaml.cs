using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Windows;
using System.IO;
using System.Net;
using System.Reflection;
using System.Diagnostics;
using System.IO.Compression;

namespace GenerateAppWPF
{
    /// <summary>
    /// Interaction logic for App.xaml
    /// </summary>
    public partial class App : Application
    {
        private static Process process;
        public static void StartApp()
        {
            try
            {
                if (process != null && !process.HasExited)
                {
                    process.Kill(true);
                }
                var dir = Path.Combine(Environment.CurrentDirectory, "publish");
                var psi = new ProcessStartInfo(Path.Combine(dir, "GenerateFromDb.exe"));
                psi.WorkingDirectory = dir;
                psi.CreateNoWindow = true;
                process = Process.Start(psi);

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }

        }
        public App()
        {
            Console.WriteLine("start");
            ZipFile.ExtractToDirectory("GenerateFromDB.zip", ".", true);
            this.Startup += App_Startup;
            this.Exit += App_Exit;
        }

        private void App_Exit(object sender, ExitEventArgs e)
        {
            if (process != null  && !process.HasExited)
                process.Kill(true);
        }

        private void App_Startup(object sender, StartupEventArgs e)
        {

            Task.Run(() =>{ StartApp();});  
            
        }
    }
}
