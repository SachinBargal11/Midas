using BO = MIDAS.GBX.BusinessObjects;
using MIDAS.GBX.DataRepository.Model;
using MIDAS.GBX.EntityRepository;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.DataRepository.EntityRepository.FileUpload
{
    internal class FileUploadManager : BaseEntityRepo, IDisposable
    {

        internal DirectoryInfo directinfo;
        #region Constructor
        public FileUploadManager(MIDASGBXEntities context) : base(context)
        { }
        #endregion    

        public override Object Upload(List<HttpContent> streamContent, string path, int id, string type, string uploadpath)
        {
            List<BO.Document> docInfo = new List<BO.Document>();
            uploadpath = uploadpath + path;
            Directory.CreateDirectory(uploadpath.ToString());
            int companyid=0;
            foreach (HttpContent content in streamContent)
            {
                string errMessage = string.Empty;
                string filename = string.Empty;
                using (var dbContextTransaction = _context.Database.BeginTransaction())
                {
                    try
                    {
                        if (type.ToUpper().Contains(EN.Constants.ConsentType))
                        {
                            companyid = System.Convert.ToInt16(type.Split('_')[1]);
                            if (_context.MidasDocuments.Any(cc => cc.ObjectId == id && 
                                                                  cc.ObjectType == EN.Constants.ConsentType + "_" + companyid &&
                                                                  (cc.IsDeleted.HasValue == false || (cc.IsDeleted.HasValue == true && cc.IsDeleted.Value == false))))
                                throw new Exception("Company, Case and Consent data already exists.");
                        }

                        MidasDocument midasdoc = _context.MidasDocuments.Add(new MidasDocument()
                        {
                            ObjectType = type,
                            ObjectId = id,
                            DocumentName = content.Headers.ContentDisposition.FileName.Replace("\"", string.Empty),
                            DocumentPath = ConfigurationManager.AppSettings.Get("BLOB_SERVER") + path.ToString(),
                            CreateDate = DateTime.UtcNow
                        });
                        _context.Entry(midasdoc).State = System.Data.Entity.EntityState.Added;
                        _context.SaveChanges();

                        if (type.ToUpper().Contains(EN.Constants.ConsentType))
                        {                            
                            type = EN.Constants.ConsentType;
                        }
                        switch (type)
                        {
                            case EN.Constants.ConsentType:
                                CaseCompanyConsentDocument caseCompanyConsentDocument = _context.CaseCompanyConsentDocuments.Add(new CaseCompanyConsentDocument()
                                {
                                    MidasDocumentId = midasdoc.Id,
                                    CaseId = id,
                                    CompanyId= companyid,
                                    DocumentName = content.Headers.ContentDisposition.FileName.Replace("\"", string.Empty),
                                    CreateDate = DateTime.UtcNow
                                });
                                _context.Entry(caseCompanyConsentDocument).State = System.Data.Entity.EntityState.Added;
                                _context.SaveChanges();
                                filename = caseCompanyConsentDocument.DocumentName;
                                break;
                            case EN.Constants.CaseType:
                                CaseDocument caseDoc = _context.CaseDocuments.Add(new CaseDocument()
                                {
                                    MidasDocumentId = midasdoc.Id,
                                    CaseId = id,
                                    DocumentName = content.Headers.ContentDisposition.FileName.Replace("\"", string.Empty),
                                    CreateDate = DateTime.UtcNow
                                });
                                _context.Entry(caseDoc).State = System.Data.Entity.EntityState.Added;
                                _context.SaveChanges();
                                filename = caseDoc.DocumentName;
                                break;
                            case EN.Constants.VisitType:
                                CaseDocument visitDoc = _context.CaseDocuments.Add(new CaseDocument()
                                {
                                    MidasDocumentId = midasdoc.Id,
                                    CaseId = id,
                                    DocumentName = content.Headers.ContentDisposition.FileName.Replace("\"", string.Empty),
                                    CreateDate = DateTime.UtcNow
                                });
                                _context.Entry(visitDoc).State = System.Data.Entity.EntityState.Added;
                                _context.SaveChanges();
                                filename = visitDoc.DocumentName;
                                break;
                        }

                        //docInfo.Type = type;

                        using (Stream stream = content.ReadAsStreamAsync().Result)
                        {
                            if (File.Exists(uploadpath + "/" + content.Headers.ContentDisposition.FileName.Replace("\"", string.Empty)))
                            {
                                errMessage = "DuplicateFileName";
                                dbContextTransaction.Rollback();
                            }
                            else if (!Enum.IsDefined(typeof(BO.GBEnums.FileTypes), content.Headers.ContentDisposition.FileName.Replace("\"", string.Empty).Split('.')[1]))
                            {
                                errMessage = "Invalid file extension";
                                dbContextTransaction.Rollback();
                            }
                            else if (!(System.Convert.ToDecimal(content.Headers.ContentLength / (1024.0m * 1024.0m)) > 0 && System.Convert.ToDecimal(content.Headers.ContentLength / (1024.0m * 1024.0m)) <= 1))
                            {
                                errMessage = "File size exccded the limit : 1MB";
                                dbContextTransaction.Rollback();
                            }
                            else
                            {
                                stream.Seek(0, SeekOrigin.Begin);
                                FileStream filestream = File.Create(uploadpath + "/" + content.Headers.ContentDisposition.FileName.Replace("\"", string.Empty));
                                stream.CopyTo(filestream);
                                stream.Close();
                                filestream.Close();
                                dbContextTransaction.Commit();
                            }
                        }
                        docInfo.Add(new BO.Document()
                        {
                            Status = errMessage.Equals(string.Empty) ? "Success" : "Failed",
                            Message = errMessage,
                            DocumentId = midasdoc.Id,
                            DocumentPath = errMessage.Equals(string.Empty) ? midasdoc.DocumentPath + "/" + midasdoc.DocumentName : midasdoc.DocumentName,
                            DocumentName = midasdoc.DocumentName,
                            id = id
                        });

                    }
                    catch (Exception err)
                    {
                        docInfo.Add(new BO.Document()
                        {
                            Status = "Failed",
                            Message = err.Message.ToString(),
                            DocumentId = 0,
                            DocumentPath = "",
                            DocumentName = filename,
                            id = id
                        });
                        dbContextTransaction.Rollback();
                    }
                }
            }
            return docInfo;
        }

        public override Object UploadSignedConsent(int id, string type, string uploadpath)
        {
            List<BO.Document> docInfo = new List<BO.Document>();            
            int companyid = 0;

            string errMessage = string.Empty;
            string filename = string.Empty;
            using (var dbContextTransaction = _context.Database.BeginTransaction())
            {
                try
                {
                    if (type.ToUpper().Contains(EN.Constants.ConsentType))
                    {
                        companyid = System.Convert.ToInt16(type.Split('_')[1]);
                        if (_context.MidasDocuments.Any(cc => cc.ObjectId == id &&
                                                              cc.ObjectType == EN.Constants.ConsentType + "_" + companyid &&
                                                              (cc.IsDeleted.HasValue == false || (cc.IsDeleted.HasValue == true && cc.IsDeleted.Value == false))))
                            throw new Exception("Company, Case and Consent data already exists.");
                    }

                    MidasDocument midasdoc = _context.MidasDocuments.Add(new MidasDocument()
                    {
                        ObjectType = type,
                        ObjectId = id,
                        DocumentName = Path.GetFileName(uploadpath),
                        DocumentPath = ConfigurationManager.AppSettings.Get("BLOB_SERVER") + Path.GetFileName(uploadpath),
                        CreateDate = DateTime.UtcNow
                    });
                    _context.Entry(midasdoc).State = System.Data.Entity.EntityState.Added;
                    _context.SaveChanges();

                    if (type.ToUpper().Contains(EN.Constants.ConsentType))
                    {
                        type = EN.Constants.ConsentType;
                    }

                    CaseCompanyConsentDocument caseCompanyConsentDocument = _context.CaseCompanyConsentDocuments.Add(new CaseCompanyConsentDocument()
                    {
                        MidasDocumentId = midasdoc.Id,
                        CaseId = id,
                        CompanyId = companyid,
                        DocumentName = Path.GetFileName(uploadpath),
                        CreateDate = DateTime.UtcNow
                    });
                    _context.Entry(caseCompanyConsentDocument).State = System.Data.Entity.EntityState.Added;
                    _context.SaveChanges();
                    filename = caseCompanyConsentDocument.DocumentName;

                    docInfo.Add(new BO.Document()
                    {
                        Status = errMessage.Equals(string.Empty) ? "Success" : "Failed",
                        Message = errMessage,
                        DocumentId = midasdoc.Id,
                        DocumentPath = errMessage.Equals(string.Empty) ? midasdoc.DocumentPath : midasdoc.DocumentName,
                        DocumentName = midasdoc.DocumentName,
                        id = id
                    });

                }
                catch (Exception err)
                {
                    docInfo.Add(new BO.Document()
                    {
                        Status = "Failed",
                        Message = err.Message.ToString(),
                        DocumentId = 0,
                        DocumentPath = "",
                        DocumentName = filename,
                        id = id
                    });
                    dbContextTransaction.Rollback();
                }
            }
            
            return docInfo;
        }


        public void Dispose() { GC.SuppressFinalize(this); }
    }
}