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
    public class SpecialityControllerTest
    {
        [TestMethod]
        public void AddTest()
        {
            SpecialtyController controller = new SpecialtyController();
            Specialty speciality = new Specialty();
            speciality.Name = "";
            speciality.SpecialityCode = "";
            speciality.IsUnitApply = true;
            //speciality.CompanySpecialtyDetails = ;
            //speciality.SpecialtyDetails = "";

            controller.Post(speciality);
        }

        [TestMethod]
        public void UpdateTest()
        {
            SpecialtyController controller = new SpecialtyController();
            Specialty speciality = new Specialty();
            speciality.Name = "";
            speciality.SpecialityCode = "";
            speciality.IsUnitApply = true;
            //speciality.CompanySpecialtyDetails = ;
            //speciality.SpecialtyDetails = "";

            controller.Put(speciality);
        }

        [TestMethod]
        public void DeleteTest()
        {
            SpecialtyController controller = new SpecialtyController();
            Specialty speciality = new Specialty();
            speciality.Name = "";
            speciality.SpecialityCode = "";
            speciality.IsUnitApply = true;
            //speciality.CompanySpecialtyDetails = ;
            //speciality.SpecialtyDetails = "";

            controller.Delete(speciality);
        }

        [TestMethod]
        public void IsUniqueTest()
        {
            SpecialtyController controller = new SpecialtyController();
            Specialty speciality = new Specialty();
            speciality.Name = "";
            speciality.SpecialityCode = "";
            speciality.IsUnitApply = true;
            //speciality.CompanySpecialtyDetails = ;
            //speciality.SpecialtyDetails = "";

            controller.IsUnique(speciality);
        }
    }
}
