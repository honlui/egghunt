using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SignalRSimple.Controllers
{
    public class AdminController : Controller
    {
        // GET: Admin
        public ActionResult Index1024256()
        {
            ViewBag.Message = "Count those egghunters!";

            return View("Index");
        }
       
    }
}
