using MIDAS.GBX.DataRepository.Model;
using MIDAS.GBX.EntityRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using BO = MIDAS.GBX.BusinessObjects;
using System.Net.Http;
using System.Threading;
using System.Web;
using System.IO;
using System.Configuration;
using System.Data.Entity;
using System.Data.SqlClient;

namespace MIDAS.GBX.DataRepository.EntityRepository.FileUpload
{
    internal class DocumentManagerRepository : BaseEntityRepo, IDisposable
    {
        internal string sourcePath = string.Empty;
        internal string remotePath = string.Empty;
        private DbSet<UserCompany> _dbSet;
        private FileUploadManager fileUploadManager;

        #region Constructor
        public DocumentManagerRepository(MIDASGBXEntities context) : base(context)
        {
            fileUploadManager = new FileUploadManager(context);
            _dbSet = _context.Set<UserCompany>();
        }
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

        public override object Get(int caseId, string docuemntNode)
        {
            var documentnodeParameter = new SqlParameter("@document_node", docuemntNode);
            var documentPath = _context.Database.SqlQuery<string>("midas_sp_get_document_path @document_node", documentnodeParameter).ToList();
            var a =_context.Cases.Where(csid => csid.Id == caseId).ToList();
            return documentPath[0].Replace("cmp/", "")
                                            .Replace("cstype", _context.Cases.Where(csid => csid.Id == caseId).FirstOrDefault().CaseType.CaseTypeText.ToLower())
                                            .Replace("cs", "cs-" + caseId);
        }

        public override object Get<T>(T entity)
        {
            if (typeof(T) == typeof(BO.Common.UploadInfo))
            {
                BO.Common.UploadInfo uploadInfo = (BO.Common.UploadInfo)(object)entity;
                string path = string.Empty;

                var documentnodeParameter = new SqlParameter("@document_node", uploadInfo.DocumentType);
                var documentPath = _context.Database.SqlQuery<string>("midas_sp_get_document_path @document_node", documentnodeParameter).ToList();

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
            }
            //docInfo = (BO.Document)fileUploadManager.SaveBlob(streamContent, ObjectId, DocumentObject, uploadpath);

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
            }
            //docInfo = (BO.Document)fileUploadManager.SaveBlob(streamContent, ObjectId, DocumentObject, uploadpath);

            return docInfo;
        }


        public void Dispose() { GC.SuppressFinalize(this); }
    }
}
