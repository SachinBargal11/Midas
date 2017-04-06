﻿using MIDAS.GBX.DataRepository.Model;
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

namespace MIDAS.GBX.DataRepository.EntityRepository.FileUpload
{
    internal class FileUploadRepository : BaseEntityRepo, IDisposable
    {

        internal string sourcePath = string.Empty;
        internal string remotePath = string.Empty;
        private DbSet<UserCompany> _dbSet;
        private FileUploadManager fileUploadManager;

        #region Constructor
        public FileUploadRepository(MIDASGBXEntities context) : base(context)
        {
            fileUploadManager = new FileUploadManager(context);
            _dbSet = _context.Set<UserCompany>();
        }
        #endregion       

        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate(int id,string type,List<HttpContent> streamContent)
        {
            BO.Document docInfo = new BO.Document();
            var result = docInfo.Validate(id, type, streamContent);
            return result;
        }
        #endregion

        #region Get
        public override object Get(int id, string type)
        {
            List<BO.Document> docInfo = new List<BO.Document>();
            _context.MidasDocuments.Where(p => p.ObjectId == id && p.ObjectType.ToUpper() == type.ToUpper() && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).ToList().ForEach(x => docInfo.Add(new BO.Document()
            {
                id = id,
                DocumentId = x.Id,
                DocumentName = x.DocumentName,
                DocumentPath = x.DocumentPath + "/" + x.DocumentName
            }));

            return (object)docInfo;
        }
        #endregion

        #region Save
        public override object Save(int id,string type,List<HttpContent> streamContent,string uploadpath)
        {
            List<BO.Document> docInfo = new List<BO.Document>();
            StringBuilder storagePath=new StringBuilder();
            string SPECIALITY = "SPECIALITY_";
            string COMPANY = "/COMPANY_";
            string CASE= "/CASE_";
            string VISIT = "/VISIT_";

            if (type == "case" || type == "consent")
            {                
                storagePath.Append(remotePath)
                           .Append(COMPANY)
                           .Append(_dbSet.Where(xc => xc.UserID == _context.Cases.FirstOrDefault(p => p.Id == id).PatientId).FirstOrDefault().CompanyID)
                           .Append(CASE)
                           .Append(id);               
            }
            else if (type == "visit")
            {
                storagePath.Append(remotePath)
                           .Append(COMPANY)
                           .Append(_dbSet.Where(xc => xc.UserID == _context.PatientVisit2.FirstOrDefault(p => p.Id == id).PatientId).FirstOrDefault().CompanyID)
                           .Append(CASE)
                           .Append(_context.PatientVisit2.FirstOrDefault(p => p.Id == id).CaseId)
                           .Append(VISIT)
                           .Append(id);
            }

            docInfo = (List<BO.Document>)fileUploadManager.Upload(streamContent, storagePath.ToString(),id,type,uploadpath);

            return docInfo;
        }
        #endregion


        public override string Download(int caseid, int documentid)
        {
            var acc = _context.MidasDocuments.Where(p => p.ObjectType.ToUpper()=="CONSENT" && p.ObjectId == caseid
                                                 && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                 .FirstOrDefault<MidasDocument>();

            return acc.DocumentPath + "/" + acc.DocumentName;
        }

        #region Delete By ID
        public override object DeleteFile(int caseId, int id)
        {
            BO.Document docInfo = new BO.Document();
            try
            {
                var casedocument = _context.CaseDocuments.Where(p => p.CaseId == caseId && p.MidasDocumentId == id
                                                          && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                          .FirstOrDefault<CaseDocument>();

                var acc = _context.MidasDocuments.Where(p => p.Id == id
                                                 && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                 .FirstOrDefault<MidasDocument>();
                string newFile = string.Concat(Path.GetFileNameWithoutExtension(acc.DocumentName), DateTime.Now.ToString("yyyyMMddHHmm"), Path.GetExtension(acc.DocumentName));
                string oldfile = acc.DocumentName;

                if (casedocument != null)
                {
                    casedocument.IsDeleted = true;
                    casedocument.DocumentName = newFile;
                    _context.SaveChanges();
                }
                else if (casedocument == null)
                {
                    return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                }

                if (acc != null)
                {
                    acc.IsDeleted = true;
                    acc.DocumentName = newFile;
                    _context.SaveChanges();
                }
                else if (acc == null)
                {
                    return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                }

                File.Copy(acc.DocumentPath.Replace(ConfigurationManager.AppSettings.Get("BLOB_PATH"), ConfigurationManager.AppSettings.Get("LOCAL_PATH")) + "\\" + oldfile, acc.DocumentPath.Replace(ConfigurationManager.AppSettings.Get("BLOB_PATH"), ConfigurationManager.AppSettings.Get("LOCAL_PATH")) + "\\" + newFile);
                File.Delete(acc.DocumentPath.Replace(ConfigurationManager.AppSettings.Get("BLOB_PATH"), ConfigurationManager.AppSettings.Get("LOCAL_PATH")) + "\\" + oldfile);

                docInfo.id = caseId;
                docInfo.DocumentId = acc.Id;
                docInfo.DocumentName = newFile;
                docInfo.DocumentPath = acc.DocumentPath;
                docInfo.IsDeleted = acc.IsDeleted;
            }
            catch (Exception err)
            { return new BO.ErrorObject { ErrorMessage = "System error.", errorObject = err.Message.ToString(), ErrorLevel = ErrorLevel.Error }; }
            return (object)docInfo;
        }
        #endregion


        public void Dispose() { GC.SuppressFinalize(this); }
    }
}