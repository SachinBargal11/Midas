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
    public class CompanyControllerTest
{
       [TestMethod]
       public void SignupTest()
       {
           CompanyController controller = new CompanyController();

           Signup signup = new Signup();
           User userBO = new User();
           userBO.UserName = "milind.k@codearray.tech";
           userBO.MiddleName = "Micheal";
           userBO.FirstName = "MILIND";
           userBO.LastName = "Kate";
           userBO.Gender = GBEnums.Gender.Male;
           userBO.UserType = GBEnums.UserType.Staff;
           userBO.Status = GBEnums.UserStatus.Active;

           userBO.ContactInfo = new ContactInfo();
           userBO.ContactInfo.EmailAddress = "milind.k@codearray.tech";
           //userBO.DateOfBirth =;

           Company companyBO = new Company();
           
           companyBO.Name = "bond019";
           companyBO.ID = 101;
           companyBO.Status = GBEnums.AccountStatus.Active;
           companyBO.CompanyType = GBEnums.CompanyType.Testing;
           companyBO.SubsCriptionType = GBEnums.SubsCriptionType.Pro;
           companyBO.TaxID = "4488116500";
           companyBO.IsDeleted = false;

           companyBO.AddressInfo = new AddressInfo();
           companyBO.AddressInfo.ID = 1111;
           companyBO.AddressInfo.City = "Mumbai";
           companyBO.AddressInfo.Country = "India";
           companyBO.AddressInfo.ZipCode = "400603";

           companyBO.ContactInfo = new ContactInfo();
           companyBO.ContactInfo.ID = 2222;
           companyBO.ContactInfo.CellPhone = "2345678906";
           companyBO.ContactInfo.EmailAddress = "milind.k@codearray.tech";
           companyBO.ContactInfo.HomePhone = "451245135";
           companyBO.ContactInfo.WorkPhone = "187546521";
           companyBO.ContactInfo.FaxNo = "9875421545";

           AddressInfo addressBO = new AddressInfo();
           addressBO.ID = 102;
           addressBO.Name = "Thane";
           addressBO.Address1 = "asdfsds";
           addressBO.Address2 = "asdasdas";
           addressBO.City = "mumbai";
           addressBO.State = "Maharashtra";
           addressBO.ZipCode = "400604";
           addressBO.Country = "India";

           ContactInfo contactinfoBO = new ContactInfo();
           contactinfoBO.ID = 103;
           contactinfoBO.Name = "MK";
           contactinfoBO.CellPhone = "2345678906";
           contactinfoBO.EmailAddress = "milind.k@codearray.tech";
           contactinfoBO.HomePhone = "1212121";
           contactinfoBO.WorkPhone = "1233456";
           contactinfoBO.FaxNo = "123456788";
           contactinfoBO.IsDeleted = false;
           
           Role roleBO = new Role();
           roleBO.Name = "userrole";
           roleBO.RoleType = GBEnums.RoleType.Admin;
           roleBO.IsDeleted = false;
           
           roleBO.Company = new Company();
           roleBO.Company.Status = GBEnums.AccountStatus.Limited;
           roleBO.Company.CompanyType = GBEnums.CompanyType.Testing;
           roleBO.Company.SubsCriptionType = GBEnums.SubsCriptionType.Pro;
           roleBO.Company.IsDeleted = false;

           //roleBO.Company.AddressInfo = new AddressInfo();
           //roleBO.Company.AddressInfo.ID = 1111;
           //roleBO.Company.AddressInfo.City = "Mumbai";
           //roleBO.Company.AddressInfo.Country = "India";
           //roleBO.Company.AddressInfo.ZipCode = "400603";

           //roleBO.Company.ContactInfo = new ContactInfo();
           //roleBO.Company.ContactInfo.ID = 2222;
           //roleBO.Company.ContactInfo.CellPhone = "2345678906";
           //roleBO.Company.ContactInfo.EmailAddress = "milind.k@codearray.tech";
           //roleBO.Company.ContactInfo.HomePhone = "451245135";
           //roleBO.Company.ContactInfo.WorkPhone = "187546521";
           //roleBO.Company.ContactInfo.FaxNo = "9875421545"; 

           signup.user = userBO;
           signup.company = companyBO;
           signup.addressInfo = addressBO;
           signup.contactInfo = contactinfoBO;
           signup.role = roleBO;

           controller.Signup(signup);
       }
       
       [TestMethod]
       public void GetAllTest()
       {
           CompanyController controller = new CompanyController();

           Company companyBO = new Company();
           companyBO.Name = "abd44";
           companyBO.ID = 101;
           companyBO.Status = GBEnums.AccountStatus.Active;
           companyBO.CompanyType = GBEnums.CompanyType.Testing;
           companyBO.SubsCriptionType = GBEnums.SubsCriptionType.Pro;
           companyBO.TaxID = "1199998977";
           companyBO.IsDeleted = false;

           companyBO.AddressInfo = new AddressInfo();
           companyBO.AddressInfo.ID = 1111;
           companyBO.AddressInfo.Address1 = "abcdefgh";
           companyBO.AddressInfo.Address2= "ijklmnopq";
           companyBO.AddressInfo.City = "Mumbai";
           companyBO.AddressInfo.Country = "India";
           companyBO.AddressInfo.ZipCode = "400603";
           companyBO.AddressInfo.Name = "Hypercity";
           companyBO.AddressInfo.State = "maharashtra";

           companyBO.ContactInfo = new ContactInfo();
           companyBO.ContactInfo.ID = 2222;
           companyBO.ContactInfo.CellPhone = "2345678906";
           companyBO.ContactInfo.EmailAddress = "milind.k@codearray.tech";
           companyBO.ContactInfo.HomePhone = "451245135";
           companyBO.ContactInfo.WorkPhone = "187546521";
           companyBO.ContactInfo.FaxNo = "9875421545";
           companyBO.ContactInfo.Name = "Virat";
           
           controller.Get(companyBO);
       }

       [TestMethod]
       public void AddTest()
       {
           CompanyController controller = new CompanyController();

           Company companyBO = new Company();
           companyBO.Name = "ab3";
           companyBO.ID = 101;
           companyBO.Status = GBEnums.AccountStatus.Active;
           companyBO.CompanyType = GBEnums.CompanyType.Testing;
           companyBO.SubsCriptionType = GBEnums.SubsCriptionType.Pro;
           companyBO.TaxID = "8875998955";
           companyBO.IsDeleted = false;

           companyBO.AddressInfo = new AddressInfo();
           companyBO.AddressInfo.ID = 1111;
           companyBO.AddressInfo.City = "Mumbai";
           companyBO.AddressInfo.Country = "India";
           companyBO.AddressInfo.ZipCode = "400603";

           companyBO.ContactInfo = new ContactInfo();
           companyBO.ContactInfo.ID = 2222;
           companyBO.ContactInfo.CellPhone = "2345678906";
           companyBO.ContactInfo.EmailAddress = "milind.k@codearray.tech";
           companyBO.ContactInfo.HomePhone = "451245135";
           companyBO.ContactInfo.WorkPhone = "187546521";
           companyBO.ContactInfo.FaxNo = "9875421545";

          
           controller.Post(companyBO);
       }

       [TestMethod]
       public void UpdateTest()
       {
           CompanyController controller = new CompanyController();

           Company companyBO = new Company();
           companyBO.Name = "abo8";
           companyBO.ID = 101;
           companyBO.Status = GBEnums.AccountStatus.Active;
           companyBO.CompanyType = GBEnums.CompanyType.Testing;
           companyBO.SubsCriptionType = GBEnums.SubsCriptionType.Pro;
           companyBO.TaxID = "9115668900";
           companyBO.IsDeleted = false;

           companyBO.AddressInfo = new AddressInfo();
           companyBO.AddressInfo.ID = 1111;
           companyBO.AddressInfo.City = "Mumbai";
           companyBO.AddressInfo.Country = "India";
           companyBO.AddressInfo.ZipCode = "400603";

           companyBO.ContactInfo = new ContactInfo();
           companyBO.ContactInfo.ID = 2222;
           companyBO.ContactInfo.CellPhone = "2345678906";
           companyBO.ContactInfo.EmailAddress = "milind.k@codearray.tech";
           companyBO.ContactInfo.HomePhone = "451245135";
           companyBO.ContactInfo.WorkPhone = "187546521";
           companyBO.ContactInfo.FaxNo = "9875421545";

           controller.Put(companyBO);
       }

       [TestMethod]
       public void DeleteTest()
       {
           CompanyController controller = new CompanyController();

           Company companyBO = new Company();
           companyBO.Name = "abu11";
           companyBO.ID = 101;
           companyBO.Status = GBEnums.AccountStatus.Active;
           companyBO.CompanyType = GBEnums.CompanyType.Testing;
           companyBO.SubsCriptionType = GBEnums.SubsCriptionType.Pro;
           companyBO.TaxID = "0217722900";
           companyBO.IsDeleted = false;

           companyBO.AddressInfo = new AddressInfo();
           companyBO.AddressInfo.ID = 1111;
           companyBO.AddressInfo.City = "Mumbai";
           companyBO.AddressInfo.Country = "India";
           companyBO.AddressInfo.ZipCode = "400603";

           companyBO.ContactInfo = new ContactInfo();
           companyBO.ContactInfo.ID = 2222;
           companyBO.ContactInfo.CellPhone = "2345678906";
           companyBO.ContactInfo.EmailAddress = "milind.k@codearray.tech";
           companyBO.ContactInfo.HomePhone = "451245135";
           companyBO.ContactInfo.WorkPhone = "187546521";
           companyBO.ContactInfo.FaxNo = "9875421545";

           controller.Delete(companyBO);
       }

       [TestMethod]
       public void IsUniqueTest()
       {
           CompanyController controller = new CompanyController();

           Company companyBO = new Company();
           companyBO.Name = "abk7";
           companyBO.ID = 101;
           companyBO.Status = GBEnums.AccountStatus.Active;
           companyBO.CompanyType = GBEnums.CompanyType.Testing;
           companyBO.SubsCriptionType = GBEnums.SubsCriptionType.Pro;
           companyBO.TaxID = "5545998900";
           companyBO.IsDeleted = false;

           companyBO.AddressInfo = new AddressInfo();
           companyBO.AddressInfo.ID = 1111;
           companyBO.AddressInfo.City = "Mumbai";
           companyBO.AddressInfo.Country = "India";
           companyBO.AddressInfo.ZipCode = "400603";

           companyBO.ContactInfo = new ContactInfo();
           companyBO.ContactInfo.ID = 2222;
           companyBO.ContactInfo.CellPhone = "2345678906";
           companyBO.ContactInfo.EmailAddress = "milind.k@codearray.tech";
           companyBO.ContactInfo.HomePhone = "451245135";
           companyBO.ContactInfo.WorkPhone = "187546521";
           companyBO.ContactInfo.FaxNo = "9875421545";

           controller.IsUnique(companyBO);
       }

       [TestMethod]
       public void ValidinvitationTest()
       {
           CompanyController controller = new CompanyController();
           Invitation invitation = new Invitation();

           //invitation.UniqueID = ;
           invitation.Company = new Company();
           invitation.Company.Name = "age3";
           invitation.Company.ID = 101;
           invitation.Company.Status = GBEnums.AccountStatus.Active;
           invitation.Company.CompanyType = GBEnums.CompanyType.Testing;
           invitation.Company.SubsCriptionType = GBEnums.SubsCriptionType.Pro;
           invitation.Company.TaxID = "9178338900";
           invitation.Company.IsDeleted = false;

           invitation.Company.AddressInfo = new AddressInfo();
           invitation.Company.AddressInfo.ID = 1111;
           invitation.Company.AddressInfo.City = "Mumbai";
           invitation.Company.AddressInfo.Country = "India";
           invitation.Company.AddressInfo.ZipCode = "400603";

           invitation.Company.ContactInfo = new ContactInfo();
           invitation.Company.ContactInfo.ID = 2222;
           invitation.Company.ContactInfo.CellPhone = "2345678906";
           invitation.Company.ContactInfo.EmailAddress = "milind.k@codearray.tech";
           invitation.Company.ContactInfo.HomePhone = "451245135";
           invitation.Company.ContactInfo.WorkPhone = "187546521";
           invitation.Company.ContactInfo.FaxNo = "9875421545";

           invitation.User = new User();
           invitation.User.UserName = "milind.k@codearray.tech";
           invitation.User.MiddleName = "Micheal";
           invitation.User.FirstName = "MILIND";
           invitation.User.LastName = "Kate";
           invitation.User.Gender = GBEnums.Gender.Male;
           invitation.User.UserType = GBEnums.UserType.Staff;
           invitation.User.Status = GBEnums.UserStatus.Active;

           invitation.User.ContactInfo = new ContactInfo();
           invitation.User.ContactInfo.EmailAddress = "milind.k@codearray.tech";

           invitation.IsExpired = true;
           invitation.IsActivated = true;

           controller.ValidateInvitation(invitation);
       }

       [TestMethod]
       public void GetId()
       {
           //CompanyController controller = new CompanyController();
           //Company company = new Company();
           //company.ID = 200;
           //controller.Get(company);
       }

}

}
