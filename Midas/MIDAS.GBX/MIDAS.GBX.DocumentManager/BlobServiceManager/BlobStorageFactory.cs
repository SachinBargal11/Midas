using System;
using MIDAS.GBX.DocumentManager;

namespace MIDAS.GBX
{
    public class BlobStorageFactory
    {
        public static BlobServiceProvider GetBlobServiceProviders(string serviceProvider)
        {            
            BlobServiceProvider serviceprovider = null;

            /*BlobStorage serviceProvider = _context.BlobStorages.Where(blob =>
                                                   blob.BlobStorageTypeId == (_context.Companies.Where(comp => comp.id == companyId))
                                                   .FirstOrDefault().BlobStorageTypeId)
                                                   .FirstOrDefault<BlobStorage>();
                                                   */
            if (!string.IsNullOrEmpty(serviceProvider))
            {
                switch (serviceProvider.ToUpper())
                {
                    case "AZURE":
                        serviceprovider = new AzureBlobService();
                        break;
                    case "AMAZONS3":
                        serviceprovider = new AmazonS3BlobService();
                        break;
                    default: throw new Exception("No BLOB storage provider found for this company.");
                }
            }

            return serviceprovider;
        }
    }
}