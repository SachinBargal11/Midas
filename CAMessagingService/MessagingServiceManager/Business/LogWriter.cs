using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MessagingServiceManager.Business
{
    public static class LogWriter
    {
        public static void WriteLine(string ServiceName, Exception ex)
        {
            StreamWriter sw = null;
            sw = new StreamWriter(AppDomain.CurrentDomain.BaseDirectory + "\\" + ServiceName + DateTime.Now.ToString("dd_MM_YYYY") + " - LogFile.txt", true);
            sw.WriteLine(DateTime.Now.ToString() + ": " + ex.ToString());
            sw.WriteLine("-------------------------------------------------------");
            sw.WriteLine("");
            sw.WriteLine("");
            sw.Flush();
            sw.Close();
        }

        public static void WriteLine(string ServiceName, string message)
        {
            StreamWriter sw = null;
            sw = new StreamWriter(AppDomain.CurrentDomain.BaseDirectory + "\\" + ServiceName + DateTime.Now.ToString("dd_MM_YYYY") + " - LogFile.txt", true);
            sw.WriteLine(DateTime.Now.ToString() + ": " + message);
            sw.WriteLine("-------------------------------------------------------");
            sw.WriteLine("");
            sw.WriteLine("");
            sw.Flush();
            sw.Close();
        }
    }
}