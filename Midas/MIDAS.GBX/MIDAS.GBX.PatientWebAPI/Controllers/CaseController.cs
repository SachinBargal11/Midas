using MIDAS.GBX.BusinessObjects;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using MIDAS.GBX.PatientWebAPI.RequestHandler;

namespace MIDAS.GBX.PatientWebAPI.Controllers
{
    [RoutePrefix("midaspatientapi/Case")]
    public class CaseController : ApiController
    {
        private IRequestHandler<Case> requestHandler;

        public CaseController()
        {
            requestHandler = new GbApiRequestHandler<Case>();
        }

        [HttpGet]
        [Route("Get/{id}")]
        public HttpResponseMessage Get(int id)
        {
            return requestHandler.GetObject(Request, id);
        }

        [HttpGet]
        [Route("getByPatientId/{PatientId}")]
        public HttpResponseMessage GetByPatientId(int PatientId)
        {
            return requestHandler.GetByPatientId(Request, PatientId);
        }

        [HttpGet]
        [Route("getOpenCaseForPatient/{PatientId}")]
        public HttpResponseMessage GetOpenCaseForPatient(int PatientId)
        {
            return requestHandler.GetOpenCaseForPatient(Request, PatientId);
        }

        [HttpGet]
        [Route("getConsentList/{id}")]
        public HttpResponseMessage GetConsentList(int id)
        {
            return requestHandler.GetConsentList(Request, id);
        }

        [HttpGet]
        [Route("getCaseCompanies/{caseId}")]
        public HttpResponseMessage GetCaseCompanies(int caseId)
        {
            return requestHandler.GetCaseCompanies(Request, caseId);
        }

        [HttpPost]
        [Route("Save")]
        public HttpResponseMessage Post([FromBody]Case data)
        {
            return requestHandler.CreateGbObject(Request, data);
        }

        [HttpGet]
        [Route("addUploadedFileData/{id}/{FileUploadPath}")]
        public HttpResponseMessage AddUploadedFileData(int id, string FileUploadPath)
        {
            return requestHandler.AddUploadedFileData(Request, id, FileUploadPath);
        }

        [HttpGet]
        [Route("getDocumentList/{id}")]
        public HttpResponseMessage GetDocumentList(int id)
        {
            return requestHandler.GetDocumentList(Request, id);
        }

        [HttpGet]
        [Route("getReadOnly/{CaseId}/{CompanyId}")]
        public HttpResponseMessage GetReadOnly(int CaseId, int CompanyId)
        {
            return requestHandler.GetReadOnly(Request, CaseId, CompanyId);
        }

        [HttpGet]
        [Route("getOpenCaseCompaniesByPatientId/{patientId}")]
        public HttpResponseMessage GetOpenCaseCompaniesByPatientId(int patientId)
        {
            return requestHandler.GetOpenCaseCompaniesByPatientId(Request, patientId);
        }

        [HttpGet]
        [Route("Delete/{id}")]
        public HttpResponseMessage Delete(int id)
        {
            return requestHandler.Delete(Request, id);
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }
    }
}