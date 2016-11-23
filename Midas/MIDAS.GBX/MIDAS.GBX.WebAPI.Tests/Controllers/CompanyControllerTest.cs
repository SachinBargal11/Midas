using System.Web.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using MIDAS.GBX.WebAPI;
using MIDAS.GBX.WebAPI.Controllers;
using Newtonsoft.Json.Linq;
using System.IO;
using System.Reflection;

namespace MIDAS.GBX.WebAPI.Tests.Controllers
{
    [TestClass]
    public class CompanyControllerTest
    {
        [TestMethod]
        public void Signup()
        {
            // Arrange
            CompanyController controller = new CompanyController();

            string path = Path.Combine(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location), @"Requests\Company.json");
            JObject jobject = JObject.Parse(File.ReadAllText(path));

        }
    }
}
