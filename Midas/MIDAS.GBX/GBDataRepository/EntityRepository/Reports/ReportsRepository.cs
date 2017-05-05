using MIDAS.GBX.EntityRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MIDAS.GBX.DataRepository.Model;
using System.Data.Entity;
using BO = MIDAS.GBX.BusinessObjects;
using System.Configuration;
using MIDAS.GBX.EN;
using Docs.Pdf;
using System.IO;
//using Docs.Pdf;

namespace MIDAS.GBX.DataRepository.EntityRepository.Common
{
    internal class ReportsRepository : BaseEntityRepo, IDisposable
    {
        public ReportsRepository(MIDASGBXEntities context) : base(context)
        { }

        public override object Get(int companyId,string month)
        {
            BO.VisitReports visitreports = new BO.VisitReports();

            var patients = _context.UserCompanies.Where(usrcomp => usrcomp.CompanyID == companyId).Select(usr => usr.UserID).ToList();
            var cases = _context.Cases.Where(cs => patients.Contains(cs.PatientId)).Select(cse => cse.Id).ToList();
            var visits = _context.PatientVisit2.Where(vis => cases.Contains((int)vis.CaseId) &&
                                                             (vis.IsDeleted.HasValue == false || (vis.IsDeleted.HasValue == true && vis.IsDeleted.Value == false))).ToList();
                        
            var scheduledvisits = _context.PatientVisit2.Where(vis => cases.Contains((int)vis.CaseId) &&
                                                             vis.VisitStatusId == 1 &&
                                                             (vis.IsDeleted.HasValue == false || (vis.IsDeleted.HasValue == true && vis.IsDeleted.Value == false))).ToList();

            var completedvisits = _context.PatientVisit2.Where(vis => cases.Contains((int)vis.CaseId) &&
                                                             vis.VisitStatusId == 2 &&                                                             
                                                             (vis.IsDeleted.HasValue == false || (vis.IsDeleted.HasValue == true && vis.IsDeleted.Value == false))).ToList();

            var noshowvisits = _context.PatientVisit2.Where(vis => cases.Contains((int)vis.CaseId) &&
                                                             vis.VisitStatusId == 4 &&                                                             
                                                             (vis.IsDeleted.HasValue == false || (vis.IsDeleted.HasValue == true && vis.IsDeleted.Value == false))).ToList();

            visitreports.TotalVisits = visits.Where(v=>v.CreateDate.ToString("MMM-yyyy").Equals(month)).ToList().Count;
            visitreports.CompletedVisits = completedvisits.Where(v => v.CreateDate.ToString("MMM-yyyy").Equals(month)).ToList().Count;
            visitreports.NoShowVisits = noshowvisits.Where(v => v.CreateDate.ToString("MMM-yyyy").Equals(month)).ToList().Count;
            visitreports.ScheduledVisits = scheduledvisits.Where(v => v.CreateDate.ToString("MMM-yyyy").Equals(month)).ToList().Count;
            visitreports.Month = month;
            visitreports.ProviderName = _context.Companies.Where(comp => comp.id == companyId).FirstOrDefault().Name.ToString();

            return (object)visitreports;
        }

        public override object Get(int companyId)
        {
            BO.VisitReports visitreports = new BO.VisitReports();

            var patients = _context.UserCompanies.Where(usrcomp => usrcomp.CompanyID == companyId).Select(usr => usr.UserID).ToList();
            var cases = _context.Cases.Where(cs => patients.Contains(cs.PatientId)).Select(cse => cse.Id).ToList();
            var visits = _context.PatientVisit2.Where(vis => cases.Contains((int)vis.CaseId) &&
                                                             (vis.IsDeleted.HasValue == false || (vis.IsDeleted.HasValue == true && vis.IsDeleted.Value == false))).ToList();

            var scheduledvisits = _context.PatientVisit2.Where(vis => cases.Contains((int)vis.CaseId) &&
                                                             vis.VisitStatusId == 1 &&
                                                             (vis.IsDeleted.HasValue == false || (vis.IsDeleted.HasValue == true && vis.IsDeleted.Value == false))).ToList();

            var completedvisits = _context.PatientVisit2.Where(vis => cases.Contains((int)vis.CaseId) &&
                                                             vis.VisitStatusId == 2 &&
                                                             (vis.IsDeleted.HasValue == false || (vis.IsDeleted.HasValue == true && vis.IsDeleted.Value == false))).ToList();

            var noshowvisits = _context.PatientVisit2.Where(vis => cases.Contains((int)vis.CaseId) &&
                                                             vis.VisitStatusId == 4 &&
                                                             (vis.IsDeleted.HasValue == false || (vis.IsDeleted.HasValue == true && vis.IsDeleted.Value == false))).ToList();

            visitreports.TotalVisits = visits.Count;
            visitreports.CompletedVisits = completedvisits.Count;
            visitreports.NoShowVisits = noshowvisits.Count;
            visitreports.ScheduledVisits = scheduledvisits.Count;
            visitreports.ProviderName = _context.Companies.Where(comp => comp.id == companyId).FirstOrDefault().Name.ToString();

            return (object)visitreports;
        }

        public override object GetByPatientId(int patientId)
        {
            BO.VisitReports visitreports = new BO.VisitReports();
            
            var cases = _context.Cases.Where(cs => cs.PatientId== patientId).Select(cse => cse.Id).ToList();
            var visits = _context.PatientVisit2.Where(vis => cases.Contains((int)vis.CaseId) &&
                                                             (vis.IsDeleted.HasValue == false || (vis.IsDeleted.HasValue == true && vis.IsDeleted.Value == false))).ToList();
            //visits.FirstOrDefault().CreateDate.ToString("Mon-yyyy");
            var scheduledvisits = _context.PatientVisit2.Where(vis => cases.Contains((int)vis.CaseId) &&
                                                             vis.VisitStatusId == 1 &&
                                                             (vis.IsDeleted.HasValue == false || (vis.IsDeleted.HasValue == true && vis.IsDeleted.Value == false))).ToList();

            var completedvisits = _context.PatientVisit2.Where(vis => cases.Contains((int)vis.CaseId) &&
                                                             vis.VisitStatusId == 2 &&
                                                             (vis.IsDeleted.HasValue == false || (vis.IsDeleted.HasValue == true && vis.IsDeleted.Value == false))).ToList();

            var noshowvisits = _context.PatientVisit2.Where(vis => cases.Contains((int)vis.CaseId) &&
                                                             vis.VisitStatusId == 4 &&
                                                             (vis.IsDeleted.HasValue == false || (vis.IsDeleted.HasValue == true && vis.IsDeleted.Value == false))).ToList();

            visitreports.TotalVisits = visits.Count;
            visitreports.CompletedVisits = completedvisits.Count;
            visitreports.NoShowVisits = noshowvisits.Count;
            visitreports.ScheduledVisits = scheduledvisits.Count;
            visitreports.ProviderName = _context.Companies.Where(comp => comp.id == 
                                                                (_context.UserCompanies.Where(usrcmp=>usrcmp.UserID==patientId).Select(cp=>cp.CompanyID).FirstOrDefault()))
                                                                .FirstOrDefault().Name.ToString();
            visitreports.PatientName = _context.Users.Where(usr => usr.id == patientId).FirstOrDefault().FirstName + " " + _context.Users.Where(usr => usr.id == patientId).FirstOrDefault().LastName;

            return (object)visitreports;
        }

        public override object Get(int patientId, string objectType, string documentType)
        {
            List<BO.Document> documents = new List<BO.Document>();

            var cases = _context.Cases.Where(cs => cs.PatientId == patientId).Select(cse => cse.Id).ToList();

            switch (objectType)
            {
                case EN.Constants.CaseType:
                    _context.MidasDocuments.Where(md => (md.ObjectType == objectType || md.ObjectType.Contains("consent")) &&
                                                      cases.Contains(md.ObjectId) &&
                                                      (md.IsDeleted.HasValue == false || (md.IsDeleted.HasValue == true && md.IsDeleted.Value == false))).ToList().ForEach(x => //&& md.doc==documentType)
                    documents.Add(new BO.Document { DocumentName = x.DocumentName, DocumentPath = x.DocumentPath })); break;
                case EN.Constants.VisitType:
                    _context.MidasDocuments.Where(md => md.ObjectType == objectType &&
                                                      cases.Contains(md.ObjectId) &&
                                                      (md.IsDeleted.HasValue == false || (md.IsDeleted.HasValue == true && md.IsDeleted.Value == false))).ToList().ForEach(x => //&& md.doc==documentType)
                    documents.Add(new BO.Document { DocumentName = x.DocumentName, DocumentPath = x.DocumentPath })); break;
            }

            return documents;
        }
        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }

}
