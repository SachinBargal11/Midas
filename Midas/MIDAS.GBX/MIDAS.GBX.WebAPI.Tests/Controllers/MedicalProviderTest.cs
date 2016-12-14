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
   public class MedicalProviderTest
    {

      [TestMethod]
        public void AddTest()
        {
            MedicalProviderController controller = new MedicalProviderController();
            MedicalProvider MP = new MedicalProvider();
            MP.Name="Brooklyn aos";
            //MP.NPI=;
            MP.company = new Company();
            MP.company.Name = "bond002";
            MP.company.ID = 101;
            MP.company.Status = GBEnums.AccountStatus.Active;
            MP.company.CompanyType = GBEnums.CompanyType.Testing;
            MP.company.SubsCriptionType = GBEnums.SubsCriptionType.Pro;
            MP.company.TaxID = "7715008900";
            MP.company.IsDeleted = false;

            MP.company.AddressInfo = new AddressInfo();
            MP.company.AddressInfo.ID = 1111;
            MP.company.AddressInfo.City = "Mumbai";
            MP.company.AddressInfo.Country = "India";
            MP.company.AddressInfo.ZipCode = "400603";

            MP.company.ContactInfo = new ContactInfo();
            MP.company.ContactInfo.ID = 2222;
            MP.company.ContactInfo.CellPhone = "2345678906";
            MP.company.ContactInfo.EmailAddress = "milind.k@codearray.tech";
            MP.company.ContactInfo.HomePhone = "451245135";
            MP.company.ContactInfo.WorkPhone = "187546521";
            MP.company.ContactInfo.FaxNo = "9875421545";

            controller.Post(MP);
        }

      [TestMethod]
      public void UpdateTest()
      {
          MedicalProviderController controller = new MedicalProviderController();
          MedicalProvider MP = new MedicalProvider();
          MP.Name = "Brooklyn aos";
          //MP.NPI=;
          MP.company = new Company();
          MP.company.Name = "bond002";
          MP.company.ID = 101;
          MP.company.Status = GBEnums.AccountStatus.Active;
          MP.company.CompanyType = GBEnums.CompanyType.Testing;
          MP.company.SubsCriptionType = GBEnums.SubsCriptionType.Pro;
          MP.company.TaxID = "7715008900";
          MP.company.IsDeleted = false;

          MP.company.AddressInfo = new AddressInfo();
          MP.company.AddressInfo.ID = 1111;
          MP.company.AddressInfo.City = "Mumbai";
          MP.company.AddressInfo.Country = "India";
          MP.company.AddressInfo.ZipCode = "400603";

          MP.company.ContactInfo = new ContactInfo();
          MP.company.ContactInfo.ID = 2222;
          MP.company.ContactInfo.CellPhone = "2345678906";
          MP.company.ContactInfo.EmailAddress = "milind.k@codearray.tech";
          MP.company.ContactInfo.HomePhone = "451245135";
          MP.company.ContactInfo.WorkPhone = "187546521";
          MP.company.ContactInfo.FaxNo = "9875421545";

          controller.Put(MP);
      }

      [TestMethod]
      public void DeleteTest()
      {
          MedicalProviderController controller = new MedicalProviderController();
          MedicalProvider MP = new MedicalProvider();
          MP.Name = "Brooklyn aos";
          //MP.NPI=;
          MP.company = new Company();
          MP.company.Name = "bond002";
          MP.company.ID = 101;
          MP.company.Status = GBEnums.AccountStatus.Active;
          MP.company.CompanyType = GBEnums.CompanyType.Testing;
          MP.company.SubsCriptionType = GBEnums.SubsCriptionType.Pro;
          MP.company.TaxID = "7715008900";
          MP.company.IsDeleted = false;

          MP.company.AddressInfo = new AddressInfo();
          MP.company.AddressInfo.ID = 1111;
          MP.company.AddressInfo.City = "Mumbai";
          MP.company.AddressInfo.Country = "India";
          MP.company.AddressInfo.ZipCode = "400603";

          MP.company.ContactInfo = new ContactInfo();
          MP.company.ContactInfo.ID = 2222;
          MP.company.ContactInfo.CellPhone = "2345678906";
          MP.company.ContactInfo.EmailAddress = "milind.k@codearray.tech";
          MP.company.ContactInfo.HomePhone = "451245135";
          MP.company.ContactInfo.WorkPhone = "187546521";
          MP.company.ContactInfo.FaxNo = "9875421545";

          controller.Delete(MP);
      }

      [TestMethod]
      public void IsuniqueTest()
      {
          MedicalProviderController controller = new MedicalProviderController();
          MedicalProvider MP = new MedicalProvider();
          MP.Name = "Brooklyn aos";
          //MP.NPI=;
          MP.company = new Company();
          MP.company.Name = "bond002";
          MP.company.ID = 101;
          MP.company.Status = GBEnums.AccountStatus.Active;
          MP.company.CompanyType = GBEnums.CompanyType.Testing;
          MP.company.SubsCriptionType = GBEnums.SubsCriptionType.Pro;
          MP.company.TaxID = "7715008900";
          MP.company.IsDeleted = false;

          MP.company.AddressInfo = new AddressInfo();
          MP.company.AddressInfo.ID = 1111;
          MP.company.AddressInfo.City = "Mumbai";
          MP.company.AddressInfo.Country = "India";
          MP.company.AddressInfo.ZipCode = "400603";

          MP.company.ContactInfo = new ContactInfo();
          MP.company.ContactInfo.ID = 2222;
          MP.company.ContactInfo.CellPhone = "2345678906";
          MP.company.ContactInfo.EmailAddress = "milind.k@codearray.tech";
          MP.company.ContactInfo.HomePhone = "451245135";
          MP.company.ContactInfo.WorkPhone = "187546521";
          MP.company.ContactInfo.FaxNo = "9875421545";

          controller.IsUnique(MP);
      }

    }
}
