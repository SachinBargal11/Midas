using MIDAS.GBX.BusinessObjects;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Web.Script.Serialization;

namespace MIDAS.GBX.Common
{
    public static class Utility
    {
        public static void ValidateEntityType<T>(Type expectedType, bool considerDerivedTypes = true)
        {
            if (!ValidateType<T>(expectedType, considerDerivedTypes))
            {
                throw new NotSupportedException("This object is not supported");
            }
        }

        public static bool ValidateType<T>(Type expectedType, bool considerDerivedTypes = true)
        {
            if (typeof(T) == expectedType || (considerDerivedTypes && typeof(T).IsSubclassOf(expectedType)))
            {
                return true;
            }

            return false;
        }

        public static void SendEmail(string Message, string Subject, string ToEmail)
        {
            var client = new SmtpClient("smtp.zoho.com", 587)
            {
                Credentials = new NetworkCredential("mangesh.s@codearray.tech", "mangesh123 "),
                EnableSsl = true,
               
            };

            var mail = new System.Net.Mail.MailMessage("mangesh.s@codearray.tech", ToEmail);
            mail.Subject = Subject;
            mail.Body = Message;
            mail.IsBodyHtml = true;
                client.Send(mail);

        }

        public static string GetConfigValue(string name)
        {
            string VerificationLink = "";
            ConfigReader.Settings.GetSettingValue<Company>(name, out VerificationLink);
            return VerificationLink;
        }

        public static int GenerateRandomNumber(int Length)
        {
            Random generator = new Random();
            String r = generator.Next(0, 1000000).ToString("D"+ Length + "");
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

    }

    public class LowercaseContractResolver : DefaultContractResolver
    {
        protected override string ResolvePropertyName(string propertyName)
        {
            return propertyName.ToLower();
        }
    }

}


public static class DataProtectionExtensions
{
    private static string RandomString(int Size)
    {
        Random random = new Random();
        string input = "abcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder builder = new StringBuilder();
        char ch;
        for (int i = 0; i < Size; i++)
        {
            ch = input[random.Next(0, input.Length)];
            builder.Append(ch);
        }
        return builder.ToString();
    }
    public static string Protect(
        this string clearText,
        string optionalEntropy = null,
        DataProtectionScope scope = DataProtectionScope.CurrentUser)
    {

        clearText = RandomString(10);
        return clearText;
        //return clearText==null? "Abc123def":clearText;
        //if (clearText == null)
        //    throw new ArgumentNullException("clearText");
        //byte[] clearBytes = Encoding.UTF8.GetBytes(clearText);
        //byte[] entropyBytes = string.IsNullOrEmpty(optionalEntropy)
        //    ? null
        //    : Encoding.UTF8.GetBytes(optionalEntropy);
        //byte[] encryptedBytes = ProtectedData.Protect(clearBytes, entropyBytes, scope);
        //return Convert.ToBase64String(encryptedBytes);
    }

    public static string Unprotect(
        this string encryptedText,
        string optionalEntropy = null,
        DataProtectionScope scope = DataProtectionScope.CurrentUser)
    {
        if (encryptedText == null)
            throw new ArgumentNullException("encryptedText");
        return encryptedText;
        //byte[] encryptedBytes = Convert.FromBase64String(encryptedText);
        //byte[] entropyBytes = string.IsNullOrEmpty(optionalEntropy)
        //    ? null
        //    : Encoding.UTF8.GetBytes(optionalEntropy);
        //byte[] clearBytes = ProtectedData.Unprotect(encryptedBytes, entropyBytes, scope);
        //return Encoding.UTF8.GetString(clearBytes);
    }


}

namespace ExtensionMethods
{
    public static class JSONHelper
    {
        public static string ToJSON(this object obj)
        {
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            return serializer.Serialize(obj);
        }

        public static string ToJSON(this object obj, int recursionDepth)
        {
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            serializer.RecursionLimit = recursionDepth;
            return serializer.Serialize(obj);
        }
    }
}