using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Midas.Common
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
            var client = new SmtpClient("smtp.mailgun.org", 25)
            {
                Credentials = new NetworkCredential("postmaster@chartingview.com", "3415338827f78363223a9d1a07dc6491"),
                EnableSsl = false
            };
            client.Send("testing@codearray.com", ToEmail, Subject, Message);
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