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
        internal static string version;
        internal static string folderAspNet;
        static App()
        {
            version = Assembly.GetExecutingAssembly().GetName().Version.ToString(); ;
            folderAspNet = Path.Combine(Path.GetTempPath(), version);
        }
        private static Process process;
        public static void StartApp(Options opt)
        {
            try
            {
                if (process != null && !process.HasExited)
                {
                    process.Kill(true);
                }
                var dir = Path.Combine(opt.PathApp, "publish");
                var psi = new ProcessStartInfo(Path.Combine(dir, "GenerateFromDb.exe"));
                psi.WorkingDirectory = dir;
                psi.CreateNoWindow = true;
                psi.Arguments = "--urls " + opt.Url;
                process = Process.Start(psi);

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }

        }
        public App()
        {
            string nameFile = "GenerateFromDB.zip";
            string fullPathFile = nameFile;
            if (!File.Exists(fullPathFile))
            {
                fullPathFile = Path.Combine(Environment.CurrentDirectory, nameFile);
            }
            if (!File.Exists(fullPathFile))
            {
                fullPathFile = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, nameFile);
            }
            if (!File.Exists(fullPathFile))
            {
                MessageBox.Show($"The file {nameFile} could not be found");
                //where to search more?
            }
            if (!Directory.Exists(folderAspNet) && File.Exists(fullPathFile))
            {
                ZipFile.ExtractToDirectory(fullPathFile, folderAspNet, true);
            }
            //this.Startup += App_Startup;
            this.Exit += App_Exit;
        }

        private void App_Exit(object sender, ExitEventArgs e)
        {
            if (process != null  && !process.HasExited)
                process.Kill(true);
        }
        protected override void OnStartup(StartupEventArgs e)
        {
            base.OnStartup(e);
            //MainWindow mw = new MainWindow();
            //mw.Show();
        }

        //private void App_Startup(object sender, StartupEventArgs e)
        //{

        //}
    }
}
