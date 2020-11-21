using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
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
    public MainWindow()
    {
      InitializeComponent();
    }

    private void MainWnd_Loaded(object sender, RoutedEventArgs e)
    {
      OpenBrowser();
    }

    private void btnClose_Click(object sender, RoutedEventArgs e)
    {
      this.Close();
    }
    private void OpenBrowser()
    {
      var psi = new ProcessStartInfo("http://localhost:5000/index.html")
      {
        UseShellExecute = true,
        Verb = "open"
      };
      Process.Start(psi);

    }
    private void btnOpenBrowser_Click(object sender, RoutedEventArgs e)
    {

      OpenBrowser();
    }
  }
}
