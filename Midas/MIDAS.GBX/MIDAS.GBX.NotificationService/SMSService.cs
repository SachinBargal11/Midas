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
    public partial class SMSService : ServiceBase
    {
        Timer timer1 = null;
        public SMSService()
        {
            InitializeComponent();
        }

        protected override void OnStart(string[] args)
        {
            timer1 = new Timer();
            this.timer1.Interval = 180000;
            this.timer1.Elapsed += new ElapsedEventHandler(this.timer1_Tick);
            this.timer1.Enabled = true;
            WriteLog.WriteLine("SMS Window Service Started.");
        }

        private void timer1_Tick(object sender, ElapsedEventArgs e)
        {
            WriteLog.WriteLine("Timer ticked some job has been done succesfully.");
        }

        protected override void OnStop()
        {
            this.timer1.Enabled = false;
            WriteLog.WriteLine("SMS Window Service Stopped.");
        }
    }
}
