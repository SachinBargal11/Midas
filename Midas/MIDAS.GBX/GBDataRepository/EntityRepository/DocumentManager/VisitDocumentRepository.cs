using MIDAS.GBX.Common;
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
    internal class VisitDocumentRepository : BaseEntityRepo,IDisposable
    {       
        #region Constructor
        public VisitDocumentRepository(MIDASGBXEntities context)
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
                ObjectType = objectType,
                ObjectId = objectId,
                DocumentName = Path.GetFileName(uploadpath),//streamContent.Headers.ContentDisposition.FileName.Replace("\"", string.Empty),
                DocumentPath = uploadpath,
                CreateDate = DateTime.UtcNow
            });
            _context.Entry(midasdoc).State = System.Data.Entity.EntityState.Added;
            _context.SaveChanges();

            VisitDocument visitDoc = _context.VisitDocuments.Add(new VisitDocument()
            {
                MidasDocumentId = midasdoc.Id,
                PatientVisitId = objectId,
                DocumentName = Path.GetFileName(uploadpath),//streamContent.Headers.ContentDisposition.FileName.Replace("\"", string.Empty),
                CreateDate = DateTime.UtcNow
            });
            _context.Entry(visitDoc).State = System.Data.Entity.EntityState.Added;
            _context.SaveChanges();

            docInfo.Status = errMessage.Equals(string.Empty) ? "Success" : "Failed";
            docInfo.Message = errMessage;
            docInfo.DocumentId = midasdoc.Id;
            docInfo.DocumentPath = errMessage.Equals(string.Empty) ? midasdoc.DocumentPath + "/" + midasdoc.DocumentName : midasdoc.DocumentName;
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
