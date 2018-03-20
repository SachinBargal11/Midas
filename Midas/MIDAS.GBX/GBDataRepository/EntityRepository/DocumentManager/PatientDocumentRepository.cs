using MIDAS.GBX.DataRepository.Model;
using MIDAS.GBX.EntityRepository;
using System;
using System.IO;
using BO = MIDAS.GBX.BusinessObjects;
using System.Linq;

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

        public override Object SaveAsBlob(int objectId, int companyId, string objectType, string documentType, string uploadpath, int createUserId, int updateUserId)
        {
            BO.Document docInfo = new BO.Document();
            string errMessage = string.Empty;
            string errDesc = string.Empty;

            using (var dbContextTransaction = _context.Database.BeginTransaction())
            {
                if (documentType.ToLower() == "profile")
                {
                    var patientProfileDocumemnts = _context.MidasDocuments.Where(mid => mid.ObjectId == objectId &&
                                                                          mid.DocumentType == documentType &&
                                                                          (mid.IsDeleted.HasValue == false || (mid.IsDeleted.HasValue == true && mid.IsDeleted.Value == false)));
                    patientProfileDocumemnts.ToList().ForEach(ppd => ppd.IsDeleted = true);
                    _context.SaveChanges();
                }

                MidasDocument midasdoc = _context.MidasDocuments.Add(new MidasDocument()
                {
                    ObjectType = documentType.ToUpper().Equals(EN.Constants.ConsentType) ? string.Concat(EN.Constants.ConsentType, "_" + companyId) : objectType,
                    ObjectId = objectId,
                    DocumentType = documentType,
                    DocumentName = Path.GetFileName(uploadpath),//streamContent.Headers.ContentDisposition.FileName.Replace("\"", string.Empty),
                    DocumentPath = uploadpath,
                    CreateDate = DateTime.UtcNow,
                    CreateUserId = createUserId,
                    CreatedCompanyId = companyId
                });
                _context.Entry(midasdoc).State = System.Data.Entity.EntityState.Added;
                _context.SaveChanges();


                PatientDocument patientDoc = _context.PatientDocuments.Add(new PatientDocument()
                {
                    MidasDocumentId = midasdoc.Id,
                    PatientId = objectId,
                    DocumentType = documentType,
                    DocumentName = Path.GetFileName(uploadpath),//streamContent.Headers.ContentDisposition.FileName.Replace("\"", string.Empty),
                    CreateDate = DateTime.UtcNow
                });
                _context.Entry(patientDoc).State = System.Data.Entity.EntityState.Added;
                _context.SaveChanges();

                //Code to update User Info with ImageLink from midasdoc.DocumentPath
                if (patientDoc.DocumentType.ToLower() == "profile".ToLower())
                {
                    int PatientId = midasdoc.ObjectId;
                    string ImageLink = midasdoc.DocumentPath;

                    var patientUser = _context.Users.Where(p => p.id == PatientId
                                                        && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                    .FirstOrDefault();

                    if (patientUser != null)
                    {
                        patientUser.ImageLink = ImageLink;
                        _context.SaveChanges();
                    }
                }

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
