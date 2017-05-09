﻿using MIDAS.GBX.Common;
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

            //documentNodeObjectMappingBO.ID = documentNodeObjectMapping.id;
            documentNodeObjectMappingBO.ObjectType = (BO.GBEnums.ObjectTypes)documentNodeObjectMapping.ObjectType;
            documentNodeObjectMappingBO.ChildNode = documentNodeObjectMapping.ChildNode;
            documentNodeObjectMappingBO.CompanyId = documentNodeObjectMapping.CompanyId;

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
        public override object Get(int objectId, int companyId)
        {
            //string objectType = Enum.GetName(typeof(BO.GBEnums.ObjectTypes), objectId);
            if (objectId <= 0 || !Enum.IsDefined(typeof(BO.GBEnums.ObjectTypes), objectId))
                return new BO.ErrorObject { ErrorMessage = "Please pass valid objectType.", errorObject = "", ErrorLevel = ErrorLevel.Error };

            var documentNodeObjectMappingDB = _context.DocumentNodeObjectMappings.Where(p => p.ObjectType == objectId && 
                                                                                             (p.CompanyId == 0 || p.CompanyId == null) &&
                                                                                             (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).ToList<DocumentNodeObjectMapping>()
                                                                                 .Union
                                              (_context.DocumentNodeObjectMappings.Where(p => p.CompanyId == companyId && 
                                                                                              p.ObjectType == objectId &&
                                                                                              (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).ToList<DocumentNodeObjectMapping>());

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

        #region save
        public override object Save<T>(T entity)
        {
            BO.DocumentNodeObjectMapping boDocumentNodeObjectMapping = (BO.DocumentNodeObjectMapping)(object)entity;
            
            using (var dbContextTransaction = _context.Database.BeginTransaction())
            {
                if (boDocumentNodeObjectMapping != null)
                {
                    var documentNodeObjectMappingDB = _context.DocumentNodeObjectMappings.Where(docnodes => docnodes.ObjectType == (int)boDocumentNodeObjectMapping.ObjectType &&
                                                                                                      docnodes.ChildNode.ToLower() == boDocumentNodeObjectMapping.ChildNode.ToLower() &&
                                                                                                      docnodes.CompanyId == boDocumentNodeObjectMapping.CompanyId &&
                                                                                                      (docnodes.IsDeleted.HasValue == false || (docnodes.IsDeleted.HasValue == true && docnodes.IsDeleted.Value == false)))
                                                                                                      .Union
                                                      (_context.DocumentNodeObjectMappings.Where(docnodes => docnodes.ObjectType == (int)boDocumentNodeObjectMapping.ObjectType &&
                                                                                                      docnodes.ChildNode.ToLower() == boDocumentNodeObjectMapping.ChildNode.ToLower() &&
                                                                                                      (docnodes.CompanyId == 0 || docnodes.CompanyId == null) &&
                                                                                                      (docnodes.IsDeleted.HasValue == false || (docnodes.IsDeleted.HasValue == true && docnodes.IsDeleted.Value == false))))
                                                                                                      .FirstOrDefault();
                                                                                         
                    if (documentNodeObjectMappingDB == null)
                    {
                        documentNodeObjectMappingDB = new DocumentNodeObjectMapping();
                        documentNodeObjectMappingDB.CompanyId = boDocumentNodeObjectMapping.CompanyId;
                        documentNodeObjectMappingDB.ObjectType = (byte)boDocumentNodeObjectMapping.ObjectType;
                        documentNodeObjectMappingDB.ChildNode = boDocumentNodeObjectMapping.ChildNode;

                        _context.DocumentNodeObjectMappings.Add(documentNodeObjectMappingDB);
                        _context.SaveChanges();

                        var res = Convert<BO.DocumentNodeObjectMapping, DocumentNodeObjectMapping>(documentNodeObjectMappingDB);
                        dbContextTransaction.Commit();
                    }
                    else
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Document type already exists", ErrorLevel = ErrorLevel.Error };
                    }
                }
                else
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid document type details.", ErrorLevel = ErrorLevel.Error };
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
