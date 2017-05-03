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
    internal class DocumentNodeObjectMappingRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<DocumentNodeObjectMapping> _dbSet;

        #region Constructor
        public DocumentNodeObjectMappingRepository(MIDASGBXEntities context)
            : base(context)
        {
            _dbSet = context.Set<DocumentNodeObjectMapping>();
            context.Configuration.ProxyCreationEnabled = false;
        }
        #endregion

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            DocumentNodeObjectMapping documentNodeObjectMapping = entity as DocumentNodeObjectMapping;

            if (documentNodeObjectMapping == null)
                return default(T);

            BO.DocumentNodeObjectMapping documentNodeObjectMappingBO = new BO.DocumentNodeObjectMapping();

            documentNodeObjectMappingBO.ID = documentNodeObjectMapping.id;
            documentNodeObjectMappingBO.ObjectType = documentNodeObjectMapping.ObjectType;
            documentNodeObjectMappingBO.ChildNode = documentNodeObjectMapping.ChildNode;

            return (T)(object)documentNodeObjectMappingBO;
        }
        #endregion

        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            BO.DocumentNodeObjectMapping documentNodeObjectMapping = (BO.DocumentNodeObjectMapping)(object)entity;
            var result = documentNodeObjectMapping.Validate(documentNodeObjectMapping);
            return result;
        }
        #endregion


        #region Get By ObjectType
        public override object Get(int companyId, string objectType)
        {
            var documentNodeObjectMappingDB = _context.DocumentNodeObjectMappings.Where(p => p.ObjectType == objectType && (p.companyid == 0 || p.companyid == null)).ToList<DocumentNodeObjectMapping>()
                                                                                 .Union
                                              (_context.DocumentNodeObjectMappings.Where(p => p.companyid == companyId && p.ObjectType == objectType).ToList<DocumentNodeObjectMapping>());

            List<BO.DocumentNodeObjectMapping> boDocumentNodeObjectMapping = new List<BO.DocumentNodeObjectMapping>();
            if (documentNodeObjectMappingDB == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                foreach (var EachDocumentNodeObjectMapping in documentNodeObjectMappingDB)
                {
                    boDocumentNodeObjectMapping.Add(Convert<BO.DocumentNodeObjectMapping, DocumentNodeObjectMapping>(EachDocumentNodeObjectMapping));
                }
            }

            return (object)boDocumentNodeObjectMapping;
        }
        #endregion

        public void Dispose()
        {
            // Use SupressFinalize in case a subclass 
            // of this type implements a finalizer.
            GC.SuppressFinalize(this);
        }
    }
}
