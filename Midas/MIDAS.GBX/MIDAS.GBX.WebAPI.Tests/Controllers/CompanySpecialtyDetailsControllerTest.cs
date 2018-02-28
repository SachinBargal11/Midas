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
    public class CompanySpecialtyDetailsControllerTest
    {

        [TestMethod]
        public void GetAllTest()
        {
            CompanySpecialtyDetailsController controller = new CompanySpecialtyDetailsController();

            CompanySpecialtyDetails CSDetails = new CompanySpecialtyDetails();
            CSDetails.AllowMultipleVisit = true;
            CSDetails.Include1500 = true;
            CSDetails.InitialDays = 2;
            CSDetails.InitialVisitCount = 5;
            CSDetails.IsInitialEvaluation = true;
            CSDetails.MaxReval = 3;
            CSDetails.ReevalDays = 8;
            CSDetails.ReevalVisitCount = 5;

            CSDetails.Company = new Company();

            CSDetails.Company.Name = "bond018";
            CSDetails.Company.ID = 101;
            CSDetails.Company.Status = GBEnums.AccountStatus.Active;
            CSDetails.Company.CompanyType = GBEnums.CompanyType.Attorney;
            CSDetails.Company.SubsCriptionType = GBEnums.SubsCriptionType.Pro;
            CSDetails.Company.TaxID = "4488116600";
            CSDetails.Company.IsDeleted = false;

            CSDetails.Company.AddressInfo = new AddressInfo();
            CSDetails.Company.AddressInfo.ID = 1111;
            CSDetails.Company.AddressInfo.City = "Mumbai";
            CSDetails.Company.AddressInfo.Country = "India";
            CSDetails.Company.AddressInfo.ZipCode = "400603";

            CSDetails.Company.ContactInfo = new ContactInfo();
            CSDetails.Company.ContactInfo.ID = 2222;
            CSDetails.Company.ContactInfo.CellPhone = "2345678906";
            CSDetails.Company.ContactInfo.EmailAddress = "milind.k@codearray.tech";
            CSDetails.Company.ContactInfo.HomePhone = "451245135";
            CSDetails.Company.ContactInfo.WorkPhone = "187546521";
            CSDetails.Company.ContactInfo.FaxNo = "9875421545";

            CSDetails.Specialty = new Specialty();
            CSDetails.Specialty.Name = "";
            CSDetails.Specialty.SpecialityCode = "";
            CSDetails.Specialty.IsUnitApply = true;
            //CSDetails.Specialty.CompanySpecialtyDetails = ;
            //CSDetails.Specialty.SpecialtyDetails = "";

            controller.Get(CSDetails);
        }
    }
}
