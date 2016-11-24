using System;
using System.Configuration;
using System.Globalization;
using System.Web;

namespace MIDAS.GBX.Common
{
    public class ConfigReader
    {
        private static ConfigSettings settings = new ConfigSettings();

        public static ConfigSettings Settings
        {
            get { return settings; }
        }

        public static T GetSettingsValue<T>(string key)
        {
            string rawValue = "";
            return settings.GetSettingValue<T>(key, out rawValue);
        }

        public static T GetSettingsValue<T>(string key, T defaultValue)
        {
            string rawValue = "";
            T value = settings.GetSettingValue<T>(key, out rawValue);
            if (string.IsNullOrEmpty(rawValue.Trim()))
                value = defaultValue;
            return value;
        }
    }

    public class ConfigSettings
    {
        public string this[string key]
        {
            get
            {
                string rawValue = "";
                return GetSettingValue<String>(key, out rawValue);
            }
        }

        public T GetSettingValue<T>(string key, out string rawValue)
        {
            object settingValue = default(T);
            rawValue = "";
            string value = null;

            Type givenType = typeof(T);

            if (Type.GetTypeCode(givenType) == TypeCode.String)
            {
                settingValue = value = "";
            }


            try
            {
                if (string.IsNullOrEmpty(value))
                {
                    if (HttpContext.Current == null)
                    {
                        value = ConfigurationManager.AppSettings[key];
                    }
                    else
                    {
                        value = System.Web.Configuration.WebConfigurationManager.AppSettings[key];
                    }
                }
            }
            catch { }

            //Convert the section value
            if (string.IsNullOrEmpty(value) == false)
            {
                rawValue = value;
                settingValue = ConvertToType<T>(value);
            }

            return (T)settingValue;

        }

        public static object ConvertToType<T>(string value)
        {
            object settingValue = default(T);

            try
            {
                switch (Type.GetTypeCode(typeof(T)))
                {
                    case TypeCode.Boolean:
                        settingValue = Boolean.Parse(value.ToBooleanString());
                        break;
                    case TypeCode.Byte:
                        settingValue = Byte.Parse(value, NumberStyles.AllowTrailingWhite | NumberStyles.AllowLeadingWhite);
                        break;
                    case TypeCode.Char:
                        settingValue = (char)ushort.Parse(value, NumberStyles.AllowTrailingWhite | NumberStyles.AllowLeadingWhite);
                        break;
                    case TypeCode.DateTime:
                        settingValue = DateTime.Parse(value);
                        break;
                    case TypeCode.Decimal:
                        settingValue = decimal.Parse(value, NumberStyles.AllowTrailingWhite | NumberStyles.AllowLeadingWhite);
                        break;
                    case TypeCode.Double:
                        settingValue = double.Parse(value, NumberStyles.AllowTrailingWhite | NumberStyles.AllowLeadingWhite);
                        break;
                    case TypeCode.Int16:
                        settingValue = Int16.Parse(value, NumberStyles.AllowTrailingWhite | NumberStyles.AllowLeadingWhite);
                        break;
                    case TypeCode.Int32:
                        settingValue = Int32.Parse(value, NumberStyles.AllowTrailingWhite | NumberStyles.AllowLeadingWhite);
                        break;
                    case TypeCode.Int64:
                        settingValue = Int64.Parse(value, NumberStyles.AllowTrailingWhite | NumberStyles.AllowLeadingWhite);
                        break;
                    case TypeCode.Single:
                        settingValue = Single.Parse(value, NumberStyles.AllowTrailingWhite | NumberStyles.AllowLeadingWhite);
                        break;
                    case TypeCode.String:
                        settingValue = string.IsNullOrEmpty(value) ? string.Empty : value.Trim();
                        break;
                    case TypeCode.UInt16:
                        settingValue = UInt16.Parse(value, NumberStyles.AllowTrailingWhite | NumberStyles.AllowLeadingWhite);
                        break;
                    case TypeCode.UInt32:
                        settingValue = UInt32.Parse(value, NumberStyles.AllowTrailingWhite | NumberStyles.AllowLeadingWhite);
                        break;
                    case TypeCode.UInt64:
                        settingValue = UInt64.Parse(value, NumberStyles.AllowTrailingWhite | NumberStyles.AllowLeadingWhite);
                        break;
                }
            }

            catch (Exception)
            {
                //Return default value;
            }

            return settingValue;
        }

        #region private methods
        public static bool IsEmptyString(object objectValue)
        {
            Type givenType = objectValue.GetType();
            if (Type.GetTypeCode(givenType) == TypeCode.String)
            {
                return true;
            }
            return false;
        }
        #endregion
    }

    public static class StringBooleanExtension
    {
        public static string ToBooleanString(this string instance)
        {
            int integer = 0;
            if (Int32.TryParse(instance, out integer))
            {
                if (integer == 1) return Boolean.TrueString;
                return Boolean.FalseString;
            }
            else
            {
                return instance;
            }
        }
    }
}


