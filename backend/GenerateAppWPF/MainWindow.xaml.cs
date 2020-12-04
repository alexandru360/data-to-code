using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace GenerateAppWPF
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public Options options;
        public MainWindow()
        {
            InitializeComponent();
            options = new Options();
            options.PathApp = App.folderAspNet;
            options.Url = "http://localhost:5000/";
            this.DataContext = options;

        }

        private void MainWnd_Loaded(object sender, RoutedEventArgs e)
        {
            try
            {
                //does not work for now !Title = ThisAssembly.Info.Version;
                Title = Title + "=>" + App.version;
                btnOpenBrowser_Click(btnOpenBrowser, e);
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Exception {ex.Message}");
            }
        }
        private void btnAbout_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                var msg = $@"
                Made by Andrei Ignat & Alexandru Badita.
                Please visit https://github.com/alexandru360/data-to-code"

                var res = MessageBox.Show(msg, "Do you want to give us a star on the github repo ?", MessageBoxButton.YesNo);
                if (res != MessageBoxResult.Yes)
                    return;
                var psi = new ProcessStartInfo("https://github.com/alexandru360/data-to-code")
                {
                    UseShellExecute = true,
                    Verb = "open"
                };
                Process.Start(psi);
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Exception {ex.Message}");
            }
        }
        private void btnClose_Click(object sender, RoutedEventArgs e)
        {
            this.Close();
        }
        private void OpenBrowser(Options opt)
        {
            var psi = new ProcessStartInfo(opt.Url)
            {
                UseShellExecute = true,
                Verb = "open"
            };
            Process.Start(psi);

        }
        private async void btnOpenBrowser_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                App.StartApp(options);
                await Task.Delay(1000);
                OpenBrowser(options);
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Exception {ex.Message}");
            }
        }
    }
}
