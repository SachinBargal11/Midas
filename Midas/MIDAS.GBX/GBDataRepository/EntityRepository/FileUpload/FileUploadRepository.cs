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

namespace MIDAS.GBX.DataRepository.EntityRepository.FileUpload
{
    internal class FileUploadRepository : BaseEntityRepo, IDisposable
    {
        internal string sourcePath = string.Empty;
        internal string remotePath = string.Empty;
        internal DirectoryInfo directinfo;

        #region Constructor
        public FileUploadRepository(MIDASGBXEntities context) : base(context)
        {
            //sourcePath = Server.MapPath("~/App_Data/uploads").ToString();
            remotePath = ConfigurationManager.AppSettings.Get("FILE_UPLOAD_PATH").ToString();
            //FileResult fileInfo = new FileUpload.FileUploadRepository.FileResult();
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

        #region Save
        public override object Save(int id,string type,List<HttpContent> streamContent)
        {
            BO.Document docInfo = new BO.Document();
            try
            {
                foreach (HttpContent content in streamContent)
                {
                    using (Stream stream = content.ReadAsStreamAsync().Result)
                    {
                        stream.Seek(0, SeekOrigin.Begin);
                        FileStream filestream = File.Create(remotePath + "/" + content.Headers.ContentDisposition.FileName.Replace("\"", string.Empty));

                        stream.CopyTo(filestream);
                        stream.Close();
                        filestream.Close();
                    }
                }
            }
            catch (Exception) { }

            return new object();
        }
        #endregion
    
        public void Dispose() { GC.SuppressFinalize(this); }
    }
}
