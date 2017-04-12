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

        public override Object Upload(List<HttpContent> streamContent, string path, int id,string type,string uploadpath)
        {            
            List<BO.Document> docInfo = new List<BO.Document>();
            uploadpath = uploadpath + path;
            Directory.CreateDirectory(uploadpath.ToString());
            foreach (HttpContent content in streamContent)
            {
                string errMessage = string.Empty;
                string filename = string.Empty;
                using (var dbContextTransaction = _context.Database.BeginTransaction())
                {
                    try
                    {
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
                            DocumentPath = errMessage.Equals(string.Empty) ? midasdoc.DocumentPath + "/" + caseDoc.DocumentName : caseDoc.DocumentName,
                            DocumentName = caseDoc.DocumentName,
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
                            DocumentName= filename,
                            id = id
                        });
                        dbContextTransaction.Rollback();
                    }
                }
            }
            return docInfo;
        }

        public void Dispose() { GC.SuppressFinalize(this); }
    }
}