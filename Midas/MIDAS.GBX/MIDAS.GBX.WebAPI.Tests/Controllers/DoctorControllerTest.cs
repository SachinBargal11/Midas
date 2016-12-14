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
   public class DoctorControllerTest
    {
        [TestMethod]
        public void AddTest()
        {
            DoctorController controller = new DoctorController();
            Doctor doctor = new Doctor();
            doctor.LicenseNumber = "abnbdbq122";
            doctor.WCBAuthorization = "";
            doctor.WcbRatingCode = "";
            doctor.NPI = "";
            doctor.TaxType = GBEnums.TaxType.Tax1;
            doctor.Title = "abcd";
            doctor.User = new User();

            doctor.User.UserName = "milind.k@codearray.tech";
            doctor.User.MiddleName = "Micheal";
            doctor.User.FirstName = "MILIND";
            doctor.User.LastName = "Kate";
            doctor.User.Gender = GBEnums.Gender.Male;
            doctor.User.UserType = GBEnums.UserType.Admin;
            doctor.User.Status = GBEnums.UserStatus.Active;

            doctor.User.ContactInfo = new ContactInfo();
            doctor.User.ContactInfo.EmailAddress = "milind.k@codearray.tech";

            controller.Post(doctor);
        }

        [TestMethod]
        public void UpdateTest()
        {
            DoctorController controller = new DoctorController();
            Doctor doctor = new Doctor();
            doctor.LicenseNumber = "abnbdbq122";
            doctor.WCBAuthorization = "";
            doctor.WcbRatingCode = "";
            doctor.NPI = "";
            doctor.TaxType = GBEnums.TaxType.Tax1;
            doctor.Title = "abcd";
            doctor.User = new User();

            doctor.User.UserName = "milind.k@codearray.tech";
            doctor.User.MiddleName = "Micheal";
            doctor.User.FirstName = "MILIND";
            doctor.User.LastName = "Kate";
            doctor.User.Gender = GBEnums.Gender.Male;
            doctor.User.UserType = GBEnums.UserType.Admin;
            doctor.User.Status = GBEnums.UserStatus.Active;

            doctor.User.ContactInfo = new ContactInfo();
            doctor.User.ContactInfo.EmailAddress = "milind.k@codearray.tech";

            controller.Put(doctor);
        }


        [TestMethod]
        public void DeleteTest()
        {
            DoctorController controller = new DoctorController();
            Doctor doctor = new Doctor();
            doctor.LicenseNumber = "abnbdbq122";
            doctor.WCBAuthorization = "";
            doctor.WcbRatingCode = "";
            doctor.NPI = "";
            doctor.TaxType = GBEnums.TaxType.Tax1;
            doctor.Title = "abcd";
            doctor.User = new User();

            doctor.User.UserName = "milind.k@codearray.tech";
            doctor.User.MiddleName = "Micheal";
            doctor.User.FirstName = "MILIND";
            doctor.User.LastName = "Kate";
            doctor.User.Gender = GBEnums.Gender.Male;
            doctor.User.UserType = GBEnums.UserType.Admin;
            doctor.User.Status = GBEnums.UserStatus.Active;

            doctor.User.ContactInfo = new ContactInfo();
            doctor.User.ContactInfo.EmailAddress = "milind.k@codearray.tech";

            controller.Delete(doctor);
        }

        [TestMethod]
        public void IsUniqueTest()
        {
            DoctorController controller = new DoctorController();
            Doctor doctor = new Doctor();
            doctor.LicenseNumber = "abnbdbq122";
            doctor.WCBAuthorization = "";
            doctor.WcbRatingCode = "";
            doctor.NPI = "";
            doctor.TaxType = GBEnums.TaxType.Tax1;
            doctor.Title = "abcd";
            doctor.User = new User();

            doctor.User.UserName = "milind.k@codearray.tech";
            doctor.User.MiddleName = "Micheal";
            doctor.User.FirstName = "MILIND";
            doctor.User.LastName = "Kate";
            doctor.User.Gender = GBEnums.Gender.Male;
            doctor.User.UserType = GBEnums.UserType.Admin;
            doctor.User.Status = GBEnums.UserStatus.Active;

            doctor.User.ContactInfo = new ContactInfo();
            doctor.User.ContactInfo.EmailAddress = "milind.k@codearray.tech";

            controller.IsUnique(doctor);
        }
    }
}
