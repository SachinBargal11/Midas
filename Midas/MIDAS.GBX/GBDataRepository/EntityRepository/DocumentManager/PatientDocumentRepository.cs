using MIDAS.GBX.DataRepository.Model;
using MIDAS.GBX.EntityRepository;
using System;
using System.IO;
using BO = MIDAS.GBX.BusinessObjects;

namespace MIDAS.GBX.DataRepository.EntityRepository
{
    internal class PatientDocumentRepository : BaseEntityRepo,IDisposable
    {        
        #region Constructor
        public PatientDocumentRepository(MIDASGBXEntities context)
            : base(context)
        {            
            context.Configuration.ProxyCreationEnabled = false;
        }
        #endregion

        public override Object SaveAsBlob(int objectId, int companyId, string objectType, string documentType, string uploadpath)
        {
            BO.Document docInfo = new BO.Document();
            string errMessage = string.Empty;
            string errDesc = string.Empty;

            using (var dbContextTransaction = _context.Database.BeginTransaction())
            {
                MidasDocument midasdoc = _context.MidasDocuments.Add(new MidasDocument()
                {
                    ObjectType = documentType.ToUpper().Equals(EN.Constants.ConsentType) ? string.Concat(EN.Constants.ConsentType, "_" + companyId) : objectType,
                    ObjectId = objectId,
                    DocumentType = documentType,
                    DocumentName = Path.GetFileName(uploadpath),//streamContent.Headers.ContentDisposition.FileName.Replace("\"", string.Empty),
                    DocumentPath = uploadpath,
                    CreateDate = DateTime.UtcNow
                });
                _context.Entry(midasdoc).State = System.Data.Entity.EntityState.Added;
                _context.SaveChanges();


                PatientDocument caseDoc = _context.PatientDocuments.Add(new PatientDocument()
                {
                    MidasDocumentId = midasdoc.Id,
                    PatientId = objectId,
                    DocumentType = documentType,
                    DocumentName = Path.GetFileName(uploadpath),//streamContent.Headers.ContentDisposition.FileName.Replace("\"", string.Empty),
                    CreateDate = DateTime.UtcNow
                });
                _context.Entry(caseDoc).State = System.Data.Entity.EntityState.Added;
                _context.SaveChanges();
                dbContextTransaction.Commit();


                docInfo.Status = errMessage.Equals(string.Empty) ? "Success" : "Failed";
                docInfo.Message = errDesc;
                docInfo.DocumentId = midasdoc.Id;
                docInfo.DocumentPath = errMessage.Equals(string.Empty) ? midasdoc.DocumentPath : midasdoc.DocumentName;
                docInfo.DocumentName = midasdoc.DocumentName;
                docInfo.DocumentType = errMessage.Equals(string.Empty) ? midasdoc.DocumentType : string.Empty;
                docInfo.id = objectId;
            }
            
            return (Object)docInfo;
        }

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
