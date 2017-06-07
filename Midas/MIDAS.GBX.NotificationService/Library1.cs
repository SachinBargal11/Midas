using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;

namespace MIDAS.GBX.NotificationService
{
    public static class Library1
    {
        public static void WriteToLog(string message)
        {
            try
            {
                StreamWriter sw = new StreamWriter(AppDomain.CurrentDomain.BaseDirectory + @"\LogFile.txt", true);
                sw.WriteLine(DateTime.Now.ToString() + " ----- " + message);
                sw.Flush();
                sw.Close();
            }
            catch
            {
            }
        }
    }
}
