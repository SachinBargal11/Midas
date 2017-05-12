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
            BO.Document docInfo = (BO.Document)(object)entity;
            var result = docInfo.Validate(docInfo);
            return result;
        }
        #endregion

        public override object Get(int documentId)
        {
            var documentnodeParameter = new SqlParameter("@document_node", "mergepdfs");
            var documentPath = _context.Database.SqlQuery<string>("midas_sp_get_document_path @document_node", documentnodeParameter).ToList();

            return documentPath[0] + "/";
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
                                            //.Replace("cstype", _context.Cases.Where(csid => csid.Id == uploadInfo.ObjectId).FirstOrDefault().CaseType.CaseTypeText.ToLower())
                                            .Replace("cs", "cs-" + uploadInfo.ObjectId);
                        break;
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

                return pdffiles;
            }
            else
                return new BO.ErrorObject { ErrorMessage = "Invalid object type", errorObject = "", ErrorLevel = ErrorLevel.Error };
        }

        public void Dispose() { GC.SuppressFinalize(this); }
    }
}
