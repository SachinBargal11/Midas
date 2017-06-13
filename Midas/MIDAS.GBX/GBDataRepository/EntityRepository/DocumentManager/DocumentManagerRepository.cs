using MIDAS.GBX.DataRepository.Model;
using MIDAS.GBX.EntityRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using BO = MIDAS.GBX.BusinessObjects;
using System.IO;
using System.Data.Entity;
using System.Data.SqlClient;

namespace MIDAS.GBX.DataRepository.EntityRepository
{
    internal class DocumentManagerRepository : BaseEntityRepo, IDisposable
    {
        internal string sourcePath = string.Empty;
        internal string remotePath = string.Empty;
        private DbSet<UserCompany> _dbSet;
        #region Constructor
        public DocumentManagerRepository(MIDASGBXEntities context) : base(context)
        { }
        #endregion       

        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            var result = new List<BO.BusinessValidation>();
            if (typeof(T) == typeof(BO.Document))
            {
                BO.Document docInfo = (BO.Document)(object)entity;
                result = docInfo.Validate(docInfo);
            }
            else if (typeof(T) == typeof(BO.Common.UploadInfo))
            {
                List<BO.BusinessValidation> validations = new List<BO.BusinessValidation>();
                result = validations;
            }
            return result;
        }
        #endregion

        /*public override object Get(int caseId, string docuemntNode)
        {
            var documentnodeParameter = new SqlParameter("@document_node", docuemntNode);
            var documentPath = _context.Database.SqlQuery<string>("midas_sp_get_document_path @document_node", documentnodeParameter).ToList();
            var a =_context.Cases.Where(csid => csid.Id == caseId).ToList();
            return documentPath[0].Replace("cmp/", "")
                                            .Replace("cstype", _context.Cases.Where(csid => csid.Id == caseId).FirstOrDefault().CaseType.CaseTypeText.ToLower())
                                            .Replace("cs", "cs-" + caseId);
        }*/

        public override object Get(int companyId)
        {
            BlobStorage serviceProvider = _context.BlobStorages.Where(blob =>
                                                   blob.BlobStorageTypeId == (_context.Companies.Where(comp => comp.id == companyId))
                                                   .FirstOrDefault().BlobStorageTypeId)
                                                   .FirstOrDefault<BlobStorage>();
            /*if (serviceProvider != null)
            {
                switch (serviceProvider.BlobStorageType.BlobStorageType1.ToString().ToUpper())
                {
                    case "AZURE":
                        serviceprovider = new AzureBlobService(_context);
                        break;
                    case "AMAZONS3":
                        serviceprovider = new AmazonS3BlobService(_context);
                        break;
                    default: throw new Exception("No BLOB storage provider found for this company.");
                }
            }*/
            return serviceProvider.BlobStorageType.BlobStorageType1.ToString().ToUpper();
        }

        public override object GetByDocumentId(int documentId)
        {
            BO.Document docInfo = new BO.Document();
            var midasDocs = _context.MidasDocuments.Where(p => p.Id == documentId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();
            return midasDocs.DocumentPath;
        }

        public override object GetByObjectIdAndType(int objectId, string objectType)
        {
            int companyId = 0;
            switch (objectType.ToUpper())
            {
                case EN.Constants.CaseType:
                    companyId = _context.CaseCompanyMappings.Where(map=>map.CaseId==objectId && map.IsOriginator == true &&
                                                                        (map.IsDeleted.HasValue == false || (map.IsDeleted.HasValue == true && map.IsDeleted.Value == false)))
                                                                        .FirstOrDefault().CompanyId;
                    break;
                /*case EN.Constants.ConsentType:
                    path = documentPath[0].Replace("cmp/", "")                              
                                        .Replace("cs", "cs-" + uploadInfo.ObjectId);
                    break;*/
                case EN.Constants.VisitType:
                    companyId = _context.CaseCompanyMappings.Where(map => map.CaseId == _context.PatientVisit2.Where(visit => visit.Id == objectId && map.IsOriginator == true &&
                                                                                                                              (visit.IsDeleted.HasValue == false || (visit.IsDeleted.HasValue == true && visit.IsDeleted.Value == false))).FirstOrDefault().CaseId &&
                                                                        (map.IsDeleted.HasValue == false || (map.IsDeleted.HasValue == true && map.IsDeleted.Value == false)))
                                                                        .FirstOrDefault().CompanyId;
                    break;
                case EN.Constants.PatientType:
                    companyId = _context.UserCompanies.Where(map => map.UserID == objectId  &&
                                                                        (map.IsDeleted.HasValue == false || (map.IsDeleted.HasValue == true && map.IsDeleted.Value == false)))
                                                                        .FirstOrDefault().CompanyID;
                    break;
            }

            return companyId;
        }

        #region Get
        public override object Get(int id, string type)
        {
            List<BO.Document> docInfo = new List<BO.Document>();
            _context.MidasDocuments.Where(p => p.ObjectId == id && p.ObjectType.ToUpper() == type.ToUpper() && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).ToList().ForEach(x => docInfo.Add(new BO.Document()
            {
                id = id,
                DocumentId = x.Id,
                DocumentName = x.DocumentName,
                DocumentType=x.DocumentType,
                DocumentPath = x.DocumentPath + "/" + x.DocumentName
            }));

            return (object)docInfo;
        }
        #endregion

        public override object Get<T>(T entity)
        {
            if (typeof(T) == typeof(BO.Common.UploadInfo))
            {
                BO.Common.UploadInfo uploadInfo = (BO.Common.UploadInfo)(object)entity;
                string path = string.Empty;

                var documentnodeParameter = new SqlParameter("@document_node", uploadInfo.DocumentType);
                var documentPath = _context.Database.SqlQuery<string>("midas_sp_get_document_path @document_node", documentnodeParameter).ToList();

                if (documentPath[0] != null)
                {
                    switch (uploadInfo.ObjectType.ToUpper())
                    {
                        case EN.Constants.CaseType:
                            path = documentPath[0].Replace("cmp/", "")
                                                .Replace("cstype", _context.Cases.Where(csid => csid.Id == uploadInfo.ObjectId).FirstOrDefault().CaseType.CaseTypeText.ToLower())
                                                .Replace("cs", "cs-" + uploadInfo.ObjectId);
                            break;
                        /*case EN.Constants.ConsentType:
                            path = documentPath[0].Replace("cmp/", "")                              
                                                .Replace("cs", "cs-" + uploadInfo.ObjectId);
                            break;*/
                        case EN.Constants.VisitType:
                            path = documentPath[0].Replace("cmp/", "")
                                                .Replace("cstype", _context.Cases.Where(csid => csid.Id == _context.PatientVisit2.Where(pvid => pvid.Id == uploadInfo.ObjectId).FirstOrDefault().CaseId)
                                                                                                           .FirstOrDefault().CaseType.CaseTypeText.ToLower())
                                                .Replace("cs", "cs-" + _context.PatientVisit2.Where(pvid => pvid.Id == uploadInfo.ObjectId).FirstOrDefault().CaseId);
                            break;
                        case EN.Constants.PatientType:
                            path = documentPath[0].Replace("cmp/", "")
                                                .Replace("patient", "patient" + _context.Patient2.Where(ptid => ptid.Id == uploadInfo.ObjectId).FirstOrDefault());
                            break;
                    }
                }
                else
                {
                    switch (uploadInfo.ObjectType.ToUpper())
                    {
                        case EN.Constants.CaseType:
                            path = "cs-" + uploadInfo.ObjectId +
                                   "/" + uploadInfo.DocumentType;//_context.Cases.Where(csid => csid.Id == uploadInfo.ObjectId).FirstOrDefault().CaseType.CaseTypeText.ToLower();
                            break;
                        /*case EN.Constants.ConsentType:
                            path = documentPath[0].Replace("cmp/", "")                              
                                                .Replace("cs", "cs-" + uploadInfo.ObjectId);
                            break;*/
                        case EN.Constants.VisitType:
                            path = "cs-" + _context.PatientVisit2.Where(pvid => pvid.Id == uploadInfo.ObjectId).FirstOrDefault().CaseId +
                                   "/" + uploadInfo.DocumentType;// _context.Cases.Where(csid => csid.Id == _context.PatientVisit2.Where(pvid => pvid.Id == uploadInfo.ObjectId).FirstOrDefault().CaseId).FirstOrDefault().CaseType.CaseTypeText.ToLower();
                            break;
                        case EN.Constants.PatientType:
                            path = "patient-" + uploadInfo.ObjectId + "/" + uploadInfo.DocumentType;// _context.Cases.Where(csid => csid.Id == _context.PatientVisit2.Where(pvid => pvid.Id == uploadInfo.ObjectId).FirstOrDefault().CaseId).FirstOrDefault().CaseType.CaseTypeText.ToLower();
                            break;
                    }
                }
                return path;
            }
            else if (typeof(T) == typeof(BO.MergePDF))
            {
                BO.MergePDF mergePDF = (BO.MergePDF)(object)entity;
                List<string> pdffiles = new List<string>();
                _context.MidasDocuments.Where(midasdoc => mergePDF.DocumentIds.Contains(midasdoc.Id)).ToList()
                                       .ForEach(x => pdffiles.Add(x.DocumentPath));

                if(!pdffiles.TrueForAll(file=>Path.GetExtension(file)==".pdf"))
                    return new BO.ErrorObject { ErrorMessage = "Please select only PDF files to merge", errorObject = "", ErrorLevel = ErrorLevel.Error };

                return pdffiles;
            }
            else
                return new BO.ErrorObject { ErrorMessage = "Invalid object type", errorObject = "", ErrorLevel = ErrorLevel.Error };
        }

        public override object SaveAsBlob(int ObjectId, int CompanyId, string DocumentObject, string DocumentType, string uploadpath)
        {
            BO.Document docInfo = new BO.Document();

            switch (DocumentObject.ToUpper())
            {
                case EN.Constants.CaseType:
                    CaseDocumentRepository CaseDocumentRepository = new CaseDocumentRepository(_context);
                    docInfo = (BO.Document)CaseDocumentRepository.SaveAsBlob(ObjectId, CompanyId, DocumentObject, DocumentType, uploadpath);
                    break;
                case EN.Constants.VisitType:
                    VisitDocumentRepository VisitDocumentRepository = new VisitDocumentRepository(_context);
                    docInfo = (BO.Document)VisitDocumentRepository.SaveAsBlob(ObjectId, CompanyId, DocumentObject, DocumentType, uploadpath);
                    break;
                case EN.Constants.PatientType:
                    PatientDocumentRepository PatientDocumentRepository = new PatientDocumentRepository(_context);
                    docInfo = (BO.Document)PatientDocumentRepository.SaveAsBlob(ObjectId, CompanyId, DocumentObject, DocumentType, uploadpath);
                    break;
            }

            return docInfo;
        }

        public override object Save<T>(T entity)
        {
            BO.Common.UploadInfo uploadInfo = (BO.Common.UploadInfo)(object)entity;
            BO.Document docInfo = new BO.Document();

            switch (uploadInfo.ObjectType.ToUpper())
            {
                case EN.Constants.CaseType:
                //case EN.Constants.ConsentType:
                    CaseDocumentRepository CaseDocumentRepository = new CaseDocumentRepository(_context);
                    docInfo = (BO.Document)CaseDocumentRepository.SaveAsBlob(uploadInfo.ObjectId, uploadInfo.CompanyId, uploadInfo.ObjectType, uploadInfo.DocumentType, uploadInfo.BlobPath);
                    break;
                case EN.Constants.VisitType:
                    VisitDocumentRepository VisitDocumentRepository = new VisitDocumentRepository(_context);
                    docInfo = (BO.Document)VisitDocumentRepository.SaveAsBlob(uploadInfo.ObjectId, uploadInfo.CompanyId, uploadInfo.ObjectType, uploadInfo.DocumentType, uploadInfo.BlobPath);
                    break;
                case EN.Constants.PatientType:
                    PatientDocumentRepository PatientDocumentRepository = new PatientDocumentRepository(_context);
                    docInfo = (BO.Document)PatientDocumentRepository.SaveAsBlob(uploadInfo.ObjectId, uploadInfo.CompanyId, uploadInfo.ObjectType, uploadInfo.DocumentType, uploadInfo.BlobPath);
                    break;
            }
            
            return docInfo;
        }

        public void Dispose() { GC.SuppressFinalize(this); }
    }
}
