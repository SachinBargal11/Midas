using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace MIDAS.GBX.WebAPI
{
    public sealed class ExceptionUtility
    {
        private ExceptionUtility()
        { }

        public static void LogException(Exception exc)
        {
            string filename = DateTime.Now.ToString("ddMMyyyyhhmmss") + ".txt";
            string path = Path.Combine("~/App_Data/ExceptionLog/", filename);
            string logFile = HttpContext.Current.Server.MapPath(path);
            if (!File.Exists(path))
            {
                using (StreamWriter sw = File.CreateText(logFile))
                {
                    sw.WriteLine("********** {0} **********", DateTime.Now);
                    if (exc.InnerException != null)
                    {
                        sw.Write("Inner Exception Type: ");
                        sw.WriteLine(exc.InnerException.GetType().ToString());
                        sw.Write("Inner Exception: ");
                        sw.WriteLine(exc.InnerException.Message);
                        sw.Write("Inner Source: ");
                        sw.WriteLine(exc.InnerException.Source);
                        if (exc.InnerException.StackTrace != null)
                        {
                            sw.WriteLine("Inner Stack Trace: ");
                            sw.WriteLine(exc.InnerException.StackTrace);
                        }
                    }
                    sw.Write("Exception Type: ");
                    sw.WriteLine(exc.GetType().ToString());
                    sw.WriteLine("Exception: " + exc.Message);
                    sw.WriteLine("Stack Trace: ");
                    if (exc.StackTrace != null)
                    {
                        sw.WriteLine(exc.StackTrace);
                        sw.WriteLine();
                    }
                    sw.Close();
                }
            }
            else
            {
                using (StreamWriter sw = File.AppendText(logFile))
                {
                    sw.WriteLine("********** {0} **********", DateTime.Now);
                    if (exc.InnerException != null)
                    {
                        sw.Write("Inner Exception Type: ");
                        sw.WriteLine(exc.InnerException.GetType().ToString());
                        sw.Write("Inner Exception: ");
                        sw.WriteLine(exc.InnerException.Message);
                        sw.Write("Inner Source: ");
                        sw.WriteLine(exc.InnerException.Source);
                        if (exc.InnerException.StackTrace != null)
                        {
                            sw.WriteLine("Inner Stack Trace: ");
                            sw.WriteLine(exc.InnerException.StackTrace);
                        }
                    }
                    sw.Write("Exception Type: ");
                    sw.WriteLine(exc.GetType().ToString());
                    sw.WriteLine("Exception: " + exc.Message);
                    sw.WriteLine("Stack Trace: ");
                    if (exc.StackTrace != null)
                    {
                        sw.WriteLine(exc.StackTrace);
                        sw.WriteLine();
                    }
                    sw.Close();
                }
            }
        }


        public static void LogExceptionData(string exc)
        {
            string filename = DateTime.Now.ToString("ddMMyyyyhhmmss") + ".txt";
            string path = Path.Combine("~/App_Data/ExceptionLog/", filename);
            string logFile = HttpContext.Current.Server.MapPath(path);
            if (!File.Exists(path))
            {
                using (StreamWriter sw = File.CreateText(logFile))
                {
                    sw.WriteLine("********** {0} **********", DateTime.Now);
                  
                        sw.WriteLine(exc);
                        sw.WriteLine();
                    
                    sw.Close();
                }
            }
           
        }


        public static void NotifySystemOps(Exception exc)
        {

        }
    }
}
