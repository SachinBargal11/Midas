using System;
using System.Linq;
using System.Web.Configuration;

namespace CAIdentityServer.Utilities
{
    public static class Utility
    {
        public static string GetConfigValue(string name)
        {
            return WebConfigurationManager.AppSettings[name];
        }

        public static int GenerateRandomNumber(int Length)
        {
            Random generator = new Random();
            String r = generator.Next(0, 1000000).ToString("D" + Length + "");
            return Convert.ToInt32(r);
        }

        public static int GenerateRandomNo()
        {
            int _min = 100000;
            int _max = 999999;
            Random _rdm = new Random();
            return _rdm.Next(_min, _max);
        }

        public static string RandomString(int length)
        {
            Random generator = new Random();
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
              .Select(s => s[generator.Next(s.Length)]).ToArray());
        }

        public static int GetIpaddress()
        {
            string strHostName = System.Net.Dns.GetHostName();
            string clientIPAddress = System.Net.Dns.GetHostAddresses(strHostName).GetValue(1).ToString();
            int ipadd = Convert.ToInt16(clientIPAddress);
            return ipadd;
        }

        public static string MachineName()
        {
            string strHostName = System.Net.Dns.GetHostName();
            string macname = strHostName;
            return macname;
        }
    }
}