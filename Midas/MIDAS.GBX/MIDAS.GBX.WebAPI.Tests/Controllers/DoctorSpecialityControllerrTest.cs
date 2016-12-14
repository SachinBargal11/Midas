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
    public class DoctorSpecialityControllerrTest
    {
        [TestMethod]
        public void AddTest()
        {
            DoctorSpecialityController controller = new DoctorSpecialityController();
            DoctorSpeciality doctorspeciality = new DoctorSpeciality();
            doctorspeciality.Doctor = new Doctor();
            doctorspeciality.Doctor.LicenseNumber = "abnbdbq122";
            doctorspeciality.Doctor.WCBAuthorization = "";
            doctorspeciality.Doctor.WcbRatingCode = "";
            doctorspeciality.Doctor.NPI = "";
            doctorspeciality.Doctor.TaxType = GBEnums.TaxType.Tax1;
            doctorspeciality.Doctor.Title = "abcd";
            doctorspeciality.Doctor.User = new User();

            doctorspeciality.Doctor.User.UserName = "milind.k@codearray.tech";
            doctorspeciality.Doctor.User.MiddleName = "Micheal";
            doctorspeciality.Doctor.User.FirstName = "MILIND";
            doctorspeciality.Doctor.User.LastName = "Kate";
            doctorspeciality.Doctor.User.Gender = GBEnums.Gender.Male;
            doctorspeciality.Doctor.User.UserType = GBEnums.UserType.Admin;
            doctorspeciality.Doctor.User.Status = GBEnums.UserStatus.Active;

            doctorspeciality.Doctor.User.ContactInfo = new ContactInfo();
            doctorspeciality.Doctor.User.ContactInfo.EmailAddress = "milind.k@codearray.tech";

            doctorspeciality.Specialty = new Specialty();
            //doctorspeciality.Specialty.CompanySpecialtyDetails ="";
            //doctorspeciality.Specialty.IsUnitApply=;
            doctorspeciality.Specialty.Name="";
            doctorspeciality.Specialty.SpecialityCode="";
            //doctorspeciality.Specialty.SpecialtyDetails="";

            controller.Post(doctorspeciality);
        }

        [TestMethod]
        public void UpdateTest()
        {
            DoctorSpecialityController controller = new DoctorSpecialityController();
            DoctorSpeciality doctorspeciality = new DoctorSpeciality();
            doctorspeciality.Doctor = new Doctor();
            doctorspeciality.Doctor.LicenseNumber = "abnbdbq122";
            doctorspeciality.Doctor.WCBAuthorization = "";
            doctorspeciality.Doctor.WcbRatingCode = "";
            doctorspeciality.Doctor.NPI = "";
            doctorspeciality.Doctor.TaxType = GBEnums.TaxType.Tax1;
            doctorspeciality.Doctor.Title = "abcd";
            doctorspeciality.Doctor.User = new User();

            doctorspeciality.Doctor.User.UserName = "milind.k@codearray.tech";
            doctorspeciality.Doctor.User.MiddleName = "Micheal";
            doctorspeciality.Doctor.User.FirstName = "MILIND";
            doctorspeciality.Doctor.User.LastName = "Kate";
            doctorspeciality.Doctor.User.Gender = GBEnums.Gender.Male;
            doctorspeciality.Doctor.User.UserType = GBEnums.UserType.Admin;
            doctorspeciality.Doctor.User.Status = GBEnums.UserStatus.Active;

            doctorspeciality.Doctor.User.ContactInfo = new ContactInfo();
            doctorspeciality.Doctor.User.ContactInfo.EmailAddress = "milind.k@codearray.tech";

            doctorspeciality.Specialty = new Specialty();
            //doctorspeciality.Specialty.CompanySpecialtyDetails ="";
            //doctorspeciality.Specialty.IsUnitApply=;
            doctorspeciality.Specialty.Name = "";
            doctorspeciality.Specialty.SpecialityCode = "";
            //doctorspeciality.Specialty.SpecialtyDetails="";

            controller.Put(doctorspeciality);
        }

        [TestMethod]
        public void DeleteTest()
        {
            DoctorSpecialityController controller = new DoctorSpecialityController();
            DoctorSpeciality doctorspeciality = new DoctorSpeciality();
            doctorspeciality.Doctor = new Doctor();
            doctorspeciality.Doctor.LicenseNumber = "abnbdbq122";
            doctorspeciality.Doctor.WCBAuthorization = "";
            doctorspeciality.Doctor.WcbRatingCode = "";
            doctorspeciality.Doctor.NPI = "";
            doctorspeciality.Doctor.TaxType = GBEnums.TaxType.Tax1;
            doctorspeciality.Doctor.Title = "abcd";
            doctorspeciality.Doctor.User = new User();

            doctorspeciality.Doctor.User.UserName = "milind.k@codearray.tech";
            doctorspeciality.Doctor.User.MiddleName = "Micheal";
            doctorspeciality.Doctor.User.FirstName = "MILIND";
            doctorspeciality.Doctor.User.LastName = "Kate";
            doctorspeciality.Doctor.User.Gender = GBEnums.Gender.Male;
            doctorspeciality.Doctor.User.UserType = GBEnums.UserType.Admin;
            doctorspeciality.Doctor.User.Status = GBEnums.UserStatus.Active;

            doctorspeciality.Doctor.User.ContactInfo = new ContactInfo();
            doctorspeciality.Doctor.User.ContactInfo.EmailAddress = "milind.k@codearray.tech";

            doctorspeciality.Specialty = new Specialty();
            //doctorspeciality.Specialty.CompanySpecialtyDetails ="";
            //doctorspeciality.Specialty.IsUnitApply=;
            doctorspeciality.Specialty.Name = "";
            doctorspeciality.Specialty.SpecialityCode = "";
            //doctorspeciality.Specialty.SpecialtyDetails="";

            controller.Delete(doctorspeciality);
        }

        [TestMethod]
        public void IsUniqueTest()
        {
            DoctorSpecialityController controller = new DoctorSpecialityController();
            DoctorSpeciality doctorspeciality = new DoctorSpeciality();
            doctorspeciality.Doctor = new Doctor();
            doctorspeciality.Doctor.LicenseNumber = "abnbdbq122";
            doctorspeciality.Doctor.WCBAuthorization = "";
            doctorspeciality.Doctor.WcbRatingCode = "";
            doctorspeciality.Doctor.NPI = "";
            doctorspeciality.Doctor.TaxType = GBEnums.TaxType.Tax1;
            doctorspeciality.Doctor.Title = "abcd";
            doctorspeciality.Doctor.User = new User();

            doctorspeciality.Doctor.User.UserName = "milind.k@codearray.tech";
            doctorspeciality.Doctor.User.MiddleName = "Micheal";
            doctorspeciality.Doctor.User.FirstName = "MILIND";
            doctorspeciality.Doctor.User.LastName = "Kate";
            doctorspeciality.Doctor.User.Gender = GBEnums.Gender.Male;
            doctorspeciality.Doctor.User.UserType = GBEnums.UserType.Admin;
            doctorspeciality.Doctor.User.Status = GBEnums.UserStatus.Active;

            doctorspeciality.Doctor.User.ContactInfo = new ContactInfo();
            doctorspeciality.Doctor.User.ContactInfo.EmailAddress = "milind.k@codearray.tech";

            doctorspeciality.Specialty = new Specialty();
            //doctorspeciality.Specialty.CompanySpecialtyDetails ="";
            //doctorspeciality.Specialty.IsUnitApply=;
            doctorspeciality.Specialty.Name = "";
            doctorspeciality.Specialty.SpecialityCode = "";
            //doctorspeciality.Specialty.SpecialtyDetails="";

            controller.IsUnique(doctorspeciality);
        }

        [TestMethod]
        public void GetTest()
        {
            DoctorSpecialityController controller = new DoctorSpecialityController();
            DoctorSpeciality doctorspeciality = new DoctorSpeciality();
            doctorspeciality.Doctor = new Doctor();
            doctorspeciality.Doctor.LicenseNumber = "abnbdbq122";
            doctorspeciality.Doctor.WCBAuthorization = "";
            doctorspeciality.Doctor.WcbRatingCode = "";
            doctorspeciality.Doctor.NPI = "";
            doctorspeciality.Doctor.TaxType = GBEnums.TaxType.Tax1;
            doctorspeciality.Doctor.Title = "abcd";
            doctorspeciality.Doctor.User = new User();

            doctorspeciality.Doctor.User.UserName = "milind.k@codearray.tech";
            doctorspeciality.Doctor.User.MiddleName = "Micheal";
            doctorspeciality.Doctor.User.FirstName = "MILIND";
            doctorspeciality.Doctor.User.LastName = "Kate";
            doctorspeciality.Doctor.User.Gender = GBEnums.Gender.Male;
            doctorspeciality.Doctor.User.UserType = GBEnums.UserType.Admin;
            doctorspeciality.Doctor.User.Status = GBEnums.UserStatus.Active;

            doctorspeciality.Doctor.User.ContactInfo = new ContactInfo();
            doctorspeciality.Doctor.User.ContactInfo.EmailAddress = "milind.k@codearray.tech";

            doctorspeciality.Specialty = new Specialty();
            //doctorspeciality.Specialty.CompanySpecialtyDetails ="";
            //doctorspeciality.Specialty.IsUnitApply=;
            doctorspeciality.Specialty.Name = "";
            doctorspeciality.Specialty.SpecialityCode = "";
            //doctorspeciality.Specialty.SpecialtyDetails="";

            controller.Get(doctorspeciality);
        }
    }
}
