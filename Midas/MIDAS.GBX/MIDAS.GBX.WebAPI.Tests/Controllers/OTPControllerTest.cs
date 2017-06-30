using System.Web.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using MIDAS.GBX.WebAPI;
using MIDAS.GBX.WebAPI.Controllers;
using Newtonsoft.Json.Linq;
using System.IO;
using System.Reflection;
using MIDAS.GBX.BusinessObjects;

namespace MIDAS.GBX.WebAPI.Tests.Controllers
{
    [TestClass]
    public class OTPControllerTest
    {/*
        [TestMethod]
        public void AddTest()
        {
            OTPController controller = new OTPController();
            OTP otp = new OTP();
            otp.User = new User();
            otp.User.UserName = "milind.k@codearray.tech";
            otp.User.MiddleName = "Micheal";
            otp.User.FirstName = "MILIND";
            otp.User.LastName = "Kate";
            otp.User.Gender = GBEnums.Gender.Male;
            otp.User.UserType = GBEnums.UserType.Patient;
            otp.User.Status = GBEnums.UserStatus.Active;

            otp.User.ContactInfo = new ContactInfo();
            otp.User.ContactInfo.EmailAddress = "milind.k@codearray.tech";

            otp.Pin = 1233;
            otp.OTP1=1234;
            //otp.Validate=;

            controller.Post(otp);
        }

        [TestMethod]
        public void UpdateTest()
        {
            OTPController controller = new OTPController();
            OTP otp = new OTP();
            otp.User = new User();
            otp.User.UserName = "milind.k@codearray.tech";
            otp.User.MiddleName = "Micheal";
            otp.User.FirstName = "MILIND";
            otp.User.LastName = "Kate";
            otp.User.Gender = GBEnums.Gender.Male;
            otp.User.UserType = GBEnums.UserType.Staff;
            otp.User.Status = GBEnums.UserStatus.Active;

            otp.User.ContactInfo = new ContactInfo();
            otp.User.ContactInfo.EmailAddress = "milind.k@codearray.tech";

            otp.Pin = 1233;
            otp.OTP1 = 1234;
            //otp.Validate=;

            controller.Put(otp);
        }

        [TestMethod]
        public void DeleteTest()
        {
            OTPController controller = new OTPController();
            OTP otp = new OTP();
            otp.User = new User();
            otp.User.UserName = "milind.k@codearray.tech";
            otp.User.MiddleName = "Micheal";
            otp.User.FirstName = "MILIND";
            otp.User.LastName = "Kate";
            otp.User.Gender = GBEnums.Gender.Male;
            otp.User.UserType = GBEnums.UserType.Staff;
            otp.User.Status = GBEnums.UserStatus.Active;

            otp.User.ContactInfo = new ContactInfo();
            otp.User.ContactInfo.EmailAddress = "milind.k@codearray.tech";

            otp.Pin = 1233;
            otp.OTP1 = 1234;
            //otp.Validate=;

            controller.Delete(otp);
        }

        [TestMethod]
        public void IsUniqueTest()
        {
            OTPController controller = new OTPController();
            OTP otp = new OTP();
            otp.User = new User();
            otp.User.UserName = "milind.k@codearray.tech";
            otp.User.MiddleName = "Micheal";
            otp.User.FirstName = "MILIND";
            otp.User.LastName = "Kate";
            otp.User.Gender = GBEnums.Gender.Male;
            otp.User.UserType = GBEnums.UserType.Staff;
            otp.User.Status = GBEnums.UserStatus.Active;

            otp.User.ContactInfo = new ContactInfo();
            otp.User.ContactInfo.EmailAddress = "milind.k@codearray.tech";

            otp.Pin = 1233;
            otp.OTP1 = 1234;
            //otp.Validate=;

            controller.IsUnique(otp);
        }

        [TestMethod]
        public void GenerateOTPTest()
        {
            OTPController controller = new OTPController();
            OTP otp = new OTP();
            otp.User = new User();
            otp.User.UserName = "milind.k@codearray.tech";
            otp.User.MiddleName = "Micheal";
            otp.User.FirstName = "MILIND";
            otp.User.LastName = "Kate";
            otp.User.Gender = GBEnums.Gender.Male;
            otp.User.UserType = GBEnums.UserType.Staff;
            otp.User.Status = GBEnums.UserStatus.Active;

            otp.User.ContactInfo = new ContactInfo();
            otp.User.ContactInfo.EmailAddress = "milind.k@codearray.tech";

            otp.Pin = 1233;
            otp.OTP1 = 1234;
            //otp.Validate=;

            controller.GenerateOTP(otp);
        }

        [TestMethod]
        public void ValidateOTPTest()
        {
            OTPController controller = new OTPController();
            ValidateOTP validate = new ValidateOTP();
            validate.otp = new OTP();
            validate.otp.User = new User();
            validate.otp.User.UserName = "milind.k@codearray.tech";
            validate.otp.User.MiddleName = "Micheal";
            validate.otp.User.FirstName = "MILIND";
            validate.otp.User.LastName = "Kate";
            validate.otp.User.Gender = GBEnums.Gender.Male;
            validate.otp.User.UserType = GBEnums.UserType.Staff;
            validate.otp.User.Status = GBEnums.UserStatus.Active;

            validate.otp.User.ContactInfo = new ContactInfo();
            validate.otp.User.ContactInfo.EmailAddress = "milind.k@codearray.tech";

            validate.otp.Pin = 1233;
            validate.otp.OTP1 = 1234;
            
            validate.user = new User();
            validate.user.UserName = "milind.k@codearray.tech";
            validate.user.MiddleName = "Micheal";
            validate.user.FirstName = "MILIND";
            validate.user.LastName = "Kate";
            validate.user.Gender = GBEnums.Gender.Male;
            validate.user.UserType = GBEnums.UserType.Staff;
            validate.user.Status = GBEnums.UserStatus.Active;

            validate.user.ContactInfo = new ContactInfo();
            validate.user.ContactInfo.EmailAddress = "milind.k@codearray.tech";
            //validate.Validate=;
            
            controller.ValidateOTP(validate);
        }
        */
    }
}
