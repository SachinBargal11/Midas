using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MIDAS.GBX.DataRepository.Model;
using MIDAS.GBX.DocumentManager;
using System.Net.Http;

namespace MIDAS.GBX
{
    public class BlobStorageFactory
    {
        public static BlobServiceProvider GetBlobServiceProviders(int companyId, MIDASGBXEntities _context)
        {            
            BlobServiceProvider serviceprovider = null;

            BlobStorage serviceProvider = _context.BlobStorages.Where(blob =>
                                                   blob.BlobStorageTypeId == (_context.Companies.Where(comp => comp.id == companyId))
                                                   .FirstOrDefault().BlobStorageTypeId)
                                                   .FirstOrDefault<BlobStorage>();
                                                   
            switch (serviceProvider.BlobStorageType.BlobStorageType1.ToString().ToUpper())
            {
                case "AZURE":
                    serviceprovider = new AzureBlobService(_context);
                    break;
                default: throw new Exception("No BLOB storage provider found for this company.");
            }

            return serviceprovider;
        }
    }
}