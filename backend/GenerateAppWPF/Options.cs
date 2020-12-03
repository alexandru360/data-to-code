using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenerateAppWPF
{
    public class Options:INotifyPropertyChanged
    {
        public void OnPropertyChanged(string name)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(name));
        }
        private string _pathApp;
        public string PathApp
        {
            get { return _pathApp; }
            set
            {
                if (value != _pathApp)
                {
                    _pathApp = value;
                    OnPropertyChanged(nameof(PathApp));
                }
            }
        }
        private string _url;
        public string Url
        {
            get { return _url; }
            set
            {
                if (value != _url)
                {
                    _url= value;
                    OnPropertyChanged(nameof(Url));
                }
            }
        }

        public event PropertyChangedEventHandler PropertyChanged;
    }
}
