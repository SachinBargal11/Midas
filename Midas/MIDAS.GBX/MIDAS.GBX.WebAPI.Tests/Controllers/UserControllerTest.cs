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
    public class UserControllerTest
    {
        [TestMethod]
        public void SigninTest()
        {
            UserController controller = new UserController();

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

            controller.Signin(userBO);
           
        }

        [TestMethod]
        public void AddUserTest()
        {
            UserController controller = new UserController();
            
            AddUser adduser = new AddUser();
            adduser.user = new User();
            adduser.user.UserName = "milind.k@codearray.tech";
            adduser.user.MiddleName = "Micheal";
            adduser.user.FirstName = "MILIND";
            adduser.user.LastName = "Kate";
            adduser.user.Gender = GBEnums.Gender.Male;
            adduser.user.UserType = GBEnums.UserType.Staff;
            adduser.user.Status = GBEnums.UserStatus.Active;

            adduser.contactInfo = new ContactInfo();
            adduser.contactInfo.ID = 103;
            adduser.contactInfo.Name = "MK";
            adduser.contactInfo.CellPhone = "2345678906";
            adduser.contactInfo.EmailAddress = "milind.k@codearray.tech";
            adduser.contactInfo.HomePhone = "1212121";
            adduser.contactInfo.WorkPhone = "1233456";
            adduser.contactInfo.FaxNo = "123456788";
            adduser.contactInfo.IsDeleted = false;

            adduser.address = new AddressInfo();
            adduser.address.ID = 102;
            adduser.address.Name = "Thane";
            adduser.address.Address1 = "asdfsds";
            adduser.address.Address2 = "asdasdas";
            adduser.address.City = "mumbai";
            adduser.address.State = "Maharashtra";
            adduser.address.ZipCode = "400604";
            adduser.address.Country = "India";

            adduser.role[0] = new Role();
            adduser.role[0].Name = "userrole";
            adduser.role[0].RoleType = GBEnums.RoleType.Admin;
            adduser.role[0].IsDeleted = false;

            adduser.company = new Company();
            adduser.company.Name = "bond002";
            adduser.company.ID = 101;
            adduser.company.Status = GBEnums.AccountStatus.Active;
            adduser.company.CompanyType = GBEnums.CompanyType.Testing;
            adduser.company.SubsCriptionType = GBEnums.SubsCriptionType.Pro;
            adduser.company.TaxID = "7715008900";
            adduser.company.IsDeleted = false;

            controller.Post(adduser);

        }

        [TestMethod]
        public void UpdateTest()
        {
            UserController controller = new UserController();

            User userBO = new User();
            userBO.UserName = "milind.k@codearray.tech";
            userBO.MiddleName = "Micheal";
            userBO.FirstName = "MILIND";
            userBO.LastName = "Kate";
            userBO.Gender = GBEnums.Gender.Male;
            userBO.UserType = GBEnums.UserType.Staff;
            userBO.Status = GBEnums.UserStatus.Active;

            controller.Put(userBO);



        }

        [TestMethod]
        public void DeleteTest()
        {
            UserController controller = new UserController();

            User userBO = new User();
            userBO.UserName = "milind.k@codearray.tech";
            userBO.MiddleName = "Micheal";
            userBO.FirstName = "MILIND";
            userBO.LastName = "Kate";
            userBO.Gender = GBEnums.Gender.Male;
            userBO.UserType = GBEnums.UserType.Staff;
            userBO.Status = GBEnums.UserStatus.Active;

            controller.Delete(userBO);


        }

        [TestMethod]
        public void IsuniqueTest()
        {
            UserController controller = new UserController();

            User userBO = new User();
            userBO.UserName = "milind.k@codearray.tech";
            userBO.MiddleName = "Micheal";
            userBO.FirstName = "MILIND";
            userBO.LastName = "Kate";
            userBO.Gender = GBEnums.Gender.Male;
            userBO.UserType = GBEnums.UserType.Staff;
            userBO.Status = GBEnums.UserStatus.Active;

            controller.IsUnique(userBO);
        }

        [TestMethod]
        public void GetAllTest()
        {
            
        }
    }
}
