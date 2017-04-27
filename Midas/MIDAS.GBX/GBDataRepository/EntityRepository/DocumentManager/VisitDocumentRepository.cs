using MIDAS.GBX.Common;
using MIDAS.GBX.DataRepository.Model;
using MIDAS.GBX.EN;
using MIDAS.GBX.EntityRepository;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data.Entity;
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
        


        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
