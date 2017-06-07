using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Linq;
using System.ServiceProcess;
using System.Text;
using System.Threading.Tasks;
using System.Timers;

namespace MIDAS.GBX.NotificationService
{
    public partial class Service1 : ServiceBase
    {
        Timer time1;
        public Service1()
        {
            InitializeComponent();
        }

        protected override void OnStart(string[] args)
        {
            time1 = new Timer();
            time1.Interval = 60000;
            time1.Enabled = true;
            time1.Elapsed += Time1_Elapsed;
            Library1.WriteToLog("Started Service");
        }

        private void Time1_Elapsed(object sender, ElapsedEventArgs e)
        {
            Library1.WriteToLog("Timer Ticked");
        }

        protected override void OnStop()
        {
            Library1.WriteToLog("Started Service");
        }
    }
}
