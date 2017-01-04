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
    public class LocationControllerTest1
    {


        [TestMethod]
        public void LocationTest()
        {
            LocationController controller = new LocationController();
            Location Loc = new Location();
            Loc.ID = 10;
            Loc.Name = "New York";
            Loc.LocationType = GBEnums.LocationType.Testing;
            Loc.IsDefault = false;
            Loc.IsDeleted = false;
            //Loc.UpdateDate=;
            Loc.UpdateByUserID = 111;
            Loc.AddressInfo = new AddressInfo();
            Loc.AddressInfo.ID = 102;
            Loc.AddressInfo.Name = "Thane";
            Loc.AddressInfo.Address1 = "abccd";
            Loc.AddressInfo.Address2 = "rftgyhujikol";
            Loc.AddressInfo.City = "mumbai";
            Loc.AddressInfo.State = "Maharashtra";
            Loc.AddressInfo.ZipCode = "400604";
            Loc.AddressInfo.Country = "India";


            Loc.ContactInfo = new ContactInfo();
            Loc.ContactInfo.ID = 103;
            Loc.ContactInfo.Name = "MK";
            Loc.ContactInfo.CellPhone = "2345678906";
            Loc.ContactInfo.EmailAddress = "milind.k@codearray.tech";
            Loc.ContactInfo.HomePhone = "1212121";
            Loc.ContactInfo.WorkPhone = "1233456";
            Loc.ContactInfo.FaxNo = "123456788";
            Loc.ContactInfo.IsDeleted = false;

            controller.Get(Loc);

        }

        [TestMethod]
        public void SaveLocationTest()
        {
            LocationController controller = new LocationController();
            SaveLocation savelocation = new SaveLocation();
            savelocation.location = new Location();
            savelocation.location.ID = 10;
            savelocation.location.Name = "New York";
            savelocation.location.LocationType = GBEnums.LocationType.Testing;
            savelocation.location.IsDefault = false;
            savelocation.location.IsDeleted = false;
            //Loc.UpdateDate=;
            savelocation.location.UpdateByUserID = 111;
            savelocation.location.AddressInfo = new AddressInfo();
            savelocation.location.AddressInfo.ID = 102;
            savelocation.location.AddressInfo.Name = "Thane";
            savelocation.location.AddressInfo.Address1 = "abccd";
            savelocation.location.AddressInfo.Address2 = "rftgyhujikol";
            savelocation.location.AddressInfo.City = "mumbai";
            savelocation.location.AddressInfo.State = "Maharashtra";
            savelocation.location.AddressInfo.ZipCode = "400604";
            savelocation.location.AddressInfo.Country = "India";


            savelocation.location.ContactInfo = new ContactInfo();
            savelocation.location.ContactInfo.ID = 103;
            savelocation.location.ContactInfo.Name = "MK";
            savelocation.location.ContactInfo.CellPhone = "2345678906";
            savelocation.location.ContactInfo.EmailAddress = "milind.k@codearray.tech";
            savelocation.location.ContactInfo.HomePhone = "1212121";
            savelocation.location.ContactInfo.WorkPhone = "1233456";
            savelocation.location.ContactInfo.FaxNo = "123456788";
            savelocation.location.ContactInfo.IsDeleted = false;

            savelocation.company = new Company();
            savelocation.company.Name = "abc9";
            savelocation.company.ID = 101;
            savelocation.company.Status = GBEnums.AccountStatus.Active;
            savelocation.company.CompanyType = GBEnums.CompanyType.Testing;
            savelocation.company.SubsCriptionType = GBEnums.SubsCriptionType.Pro;
            savelocation.company.TaxID = "9115998900";
            savelocation.company.IsDeleted = false;

            savelocation.company.AddressInfo = new AddressInfo();
            savelocation.company.AddressInfo.ID = 1111;
            savelocation.company.AddressInfo.City = "Mumbai";
            savelocation.company.AddressInfo.Country = "India";
            savelocation.company.AddressInfo.ZipCode = "400603";

            savelocation.company.ContactInfo = new ContactInfo();
            savelocation.company.ContactInfo.ID = 2222;
            savelocation.company.ContactInfo.CellPhone = "2345678906";
            savelocation.company.ContactInfo.EmailAddress = "milind.k@codearray.tech";
            savelocation.company.ContactInfo.HomePhone = "451245135";
            savelocation.company.ContactInfo.WorkPhone = "187546521";
            savelocation.company.ContactInfo.FaxNo = "9875421545";

            savelocation.addressInfo = new AddressInfo();
            savelocation.addressInfo.ID = 102;
            savelocation.addressInfo.Name = "Thane";
            savelocation.addressInfo.Address1 = "asdfsds";
            savelocation.addressInfo.Address2 = "asdasdas";
            savelocation.addressInfo.City = "mumbai";
            savelocation.addressInfo.State = "Maharashtra";
            savelocation.addressInfo.ZipCode = "400604";
            savelocation.addressInfo.Country = "India";

            savelocation.contactInfo = new ContactInfo();
            savelocation.contactInfo.ID = 103;
            savelocation.contactInfo.Name = "MK";
            savelocation.contactInfo.CellPhone = "2345678906";
            savelocation.contactInfo.EmailAddress = "milind.k@codearray.tech";
            savelocation.contactInfo.HomePhone = "1212121";
            savelocation.contactInfo.WorkPhone = "1233456";
            savelocation.contactInfo.FaxNo = "123456788";
            savelocation.contactInfo.IsDeleted = false;

            controller.Post(savelocation);


        }



    }
}
