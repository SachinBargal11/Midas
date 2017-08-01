using CANotificationService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CANotificationService.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            return View();
        }

        //public JsonResult GetNotificationMessages()
        //{
        //    var notificationRegisterTime = Session["LastUpdated"] != null ? Convert.ToDateTime(Session["LastUpdated"]) : DateTime.Now;
        //    NotificationRepository repository = new NotificationRepository();
        //    List<NotificationMessage> notificationMessages = repository.GetNotificationMessages(notificationRegisterTime);

        //    //update session here for get only new added contacts (notification)
        //    Session["LastUpdate"] = DateTime.Now;
        //    return new JsonResult { Data = notificationMessages, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        //}

        public ActionResult Contact()
        {
            return View();
        }
    }
}