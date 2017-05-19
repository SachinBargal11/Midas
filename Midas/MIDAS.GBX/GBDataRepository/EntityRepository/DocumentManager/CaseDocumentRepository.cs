using MIDAS.GBX.Common;
using MIDAS.GBX.DataRepository.EntityRepository.Common;
using MIDAS.GBX.DataRepository.Model;
using MIDAS.GBX.EN;
using MIDAS.GBX.EntityRepository;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BO = MIDAS.GBX.BusinessObjects;

namespace MIDAS.GBX.DataRepository.EntityRepository
{
    internal class CaseDocumentRepository : BaseEntityRepo,IDisposable
    {        
        #region Constructor
        public CaseDocumentRepository(MIDASGBXEntities context)
            : base(context)
        {            
            context.Configuration.ProxyCreationEnabled = false;
        }
        #endregion

        public override Object SaveAsBlob(int objectId, int companyId, string objectType, string documentType, string uploadpath)
        {
            BO.Document docInfo = new BO.Document();
            string errMessage = string.Empty;

            MidasDocument midasdoc = _context.MidasDocuments.Add(new MidasDocument()
            {
                ObjectType = documentType.ToUpper().Equals(EN.Constants.ConsentType) ? string.Concat(EN.Constants.ConsentType, "_" + companyId) : objectType,
                ObjectId = objectId,
                DocumentName = Path.GetFileName(uploadpath),//streamContent.Headers.ContentDisposition.FileName.Replace("\"", string.Empty),
                DocumentPath = uploadpath,
                CreateDate = DateTime.UtcNow
            });
            _context.Entry(midasdoc).State = System.Data.Entity.EntityState.Added;
            _context.SaveChanges();

            if (documentType.ToUpper().Equals(EN.Constants.ConsentType))
            {
                CaseDocument caseDoc = _context.CaseDocuments.Add(new CaseDocument()
                {
                    MidasDocumentId = midasdoc.Id,
                    CaseId = objectId,
                    DocumentName = Path.GetFileName(uploadpath),//streamContent.Headers.ContentDisposition.FileName.Replace("\"", string.Empty),
                    CreateDate = DateTime.UtcNow
                });
                _context.Entry(caseDoc).State = System.Data.Entity.EntityState.Added;
                _context.SaveChanges();

                BO.CompanyCaseConsentApproval companyCaseConsentApprovalBO = new BO.CompanyCaseConsentApproval();
                CompanyCaseConsentApprovalRepository CompanyCaseConsentApprovalRepository = new CompanyCaseConsentApprovalRepository(_context);
                companyCaseConsentApprovalBO.CaseId = objectId;
                companyCaseConsentApprovalBO.CompanyId = companyId;
                var result = CompanyCaseConsentApprovalRepository.Save(companyCaseConsentApprovalBO);
                if (result is BO.ErrorObject)
                {
                    return result;
                }
            }
            else
            {
                CaseCompanyConsentDocument caseCompConsentDoc = _context.CaseCompanyConsentDocuments.Add(new CaseCompanyConsentDocument()
                {
                    MidasDocumentId = midasdoc.Id,
                    CaseId = objectId,
                    CompanyId = companyId,
                    DocumentName = Path.GetFileName(uploadpath),//streamContent.Headers.ContentDisposition.FileName.Replace("\"", string.Empty),
                    CreateDate = DateTime.UtcNow
                });
                _context.Entry(caseCompConsentDoc).State = System.Data.Entity.EntityState.Added;
                _context.SaveChanges();
            }

            docInfo.Status = errMessage.Equals(string.Empty) ? "Success" : "Failed";
            docInfo.Message = errMessage;
            docInfo.DocumentId = midasdoc.Id;
            docInfo.DocumentPath = errMessage.Equals(string.Empty) ? midasdoc.DocumentPath : midasdoc.DocumentName;
            docInfo.DocumentName = midasdoc.DocumentName;
            docInfo.id = objectId;

            return (Object)docInfo;
        }

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
