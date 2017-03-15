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


namespace MIDAS.GBX.DataRepository.EntityRepository.FileUpload
{
    internal class FileUploadRepository : BaseEntityRepo, IDisposable
    {
        #region Constructor
        public FileUploadRepository(MIDASGBXEntities context) : base(context)
        {
            
            FileResult fileInfo = new FileUpload.FileUploadRepository.FileResult();
        }
        #endregion       

        public class FileResult
        {
            
        }



        public void Dispose() { GC.SuppressFinalize(this); }
    }
}
