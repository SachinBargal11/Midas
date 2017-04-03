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

            BlobStorage serviceProvider = null; //_context.BlobStorageCompanies.Where(p => p.CompanyId == companyId).FirstOrDefault().BlobStorage;

            switch ("AZURE")                    //serviceProvider.BlobStorageType.ToUpper())
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