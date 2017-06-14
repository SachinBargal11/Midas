using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;

namespace MIDAS.GBX.NotificationService
{
    public static class WriteLog
    {
        public static void WriteLine(string ServiceName, Exception ex)
        {
            StreamWriter sw = null;
            try
            {
                sw = new StreamWriter(AppDomain.CurrentDomain.BaseDirectory + "\\" + ServiceName + " - LogFile.txt", true);
                sw.WriteLine(DateTime.Now.ToString() + ": " + ex.ToString());
                sw.WriteLine("-------------------------------------------------------");
                sw.WriteLine("");
                sw.WriteLine("");
                sw.Flush();
                sw.Close();
            }
            catch
            {
            }
        }

        public static void WriteLine(string ServiceName, string message)
        {
            StreamWriter sw = null;
            try
            {
                sw = new StreamWriter(AppDomain.CurrentDomain.BaseDirectory + "\\" + ServiceName + " - LogFile.txt", true);
                sw.WriteLine(DateTime.Now.ToString() + ": " + message);
                sw.WriteLine("-------------------------------------------------------");
                sw.WriteLine("");
                sw.WriteLine("");
                sw.Flush();
                sw.Close();
            }
            catch
            {
            }
        }
    }
}
