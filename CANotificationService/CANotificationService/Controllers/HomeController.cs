using CANotificationService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CANotificationService.Repository;

namespace CANotificationService.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            var user = Request.RequestContext.HttpContext.User.Identity;
            return View();
        }

        public void UpdateMessageStatus(string username)
        {
            NotificationRepository repository = new NotificationRepository();
            repository.UpdateMessageStatus(username);
        }

        public ActionResult PushMessage()
        {
            string applicationName = "Midas";
            NotificationRepository repository = new NotificationRepository();
            ViewBag.ApplicationEvents = repository.GetApplicationEvent(applicationName)
                .Select(e => new SelectListItem { Text = e.EventName, Value = e.EventID.ToString() }).ToList();

            ViewBag.ApplicationUsers = repository.GetUsers(applicationName)
                .Select(u => new SelectListItem { Text = u.UserName, Value = u.UserName }).ToList();

            return View();
        }

        [HttpPost]
        public ActionResult PushMessage(NotificationMessage model)
        {
            if (ModelState.IsValid)
            {
                NotificationRepository repository = new NotificationRepository();
                repository.AddMessage(model.ReceiverUserID, model.Message, model.EventID);
            }

            return RedirectToAction("PushMessage");
        }
    }
}