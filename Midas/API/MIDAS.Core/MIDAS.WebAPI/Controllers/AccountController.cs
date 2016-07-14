using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using MIDAS.Core.Entities.Account;
using MIDAS.Infrastructure;

namespace MIDAS.WebAPI.Controllers
{
    public class AccountController : ApiController
    {
        private AccountDataContext db = new AccountDataContext();

        // GET api/Account
        public IEnumerable<Account> GetAccount()
        {
            return db.Account.AsEnumerable();
        }

        // GET api/Account/5
        public Account GetAccount(int id)
        {
            Account account = db.Account.Find(id);
            if (account == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return account;
        }

        // PUT api/Account/5
        public HttpResponseMessage PutAccount(int id, Account account)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != account.ID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(account).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        // POST api/Account
        public HttpResponseMessage PostAccount(Account account)
        {
            if (ModelState.IsValid)
            {
                db.Account.Add(account);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, account);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = account.ID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/Account/5
        public HttpResponseMessage DeleteAccount(int id)
        {
            Account account = db.Account.Find(id);
            if (account == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.Account.Remove(account);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, account);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}