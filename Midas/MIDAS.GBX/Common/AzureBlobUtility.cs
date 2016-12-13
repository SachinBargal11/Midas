using System;
using System.Configuration;
using System.Text;
using System.IO;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using System.IO.Compression;

namespace MIDAS.GBX.Common.BlobStorage
{
    /// <summary>
    /// Utility class for interacting with blobs including getting content, putting, copying, and deleting
    /// </summary>
    public class BlobUtility : IBlobUtility
    {
        protected string ConnectionString
        {
            get;
            set;
        }

        #region Account

        private CloudStorageAccount _account;

        /// <summary>
        /// Property for setting the Cloud Storage Account
        /// </summary>
        public CloudStorageAccount Account
        {
            get { return _account ?? (_account = CloudStorageAccount.Parse(ConnectionString)); }
            set { _account = value; }
        }

        #endregion

        static int RetryCount = ConfigReader.GetSettingsValue<int>("RetryCount", 3);
        static int RetryTimeInterval = ConfigReader.GetSettingsValue<int>("RetryTimeInterval", 10);

        /// <summary>
        /// Default constructor, sets ConnectionString to ConfigurationManager.AppSettings["CloudStorageConnectionString"] and ContainerName to "CloudStorageContainer"].
        /// </summary>
        public BlobUtility()
        {
            ConnectionString = ConfigurationManager.AppSettings["CloudStorageConnectionString"];
            ContainerName = ConfigurationManager.AppSettings["CloudStorageContainer"];
        }

        /// <summary>
        /// Constructor takes a connection string as a string and a container name
        /// </summary>
        /// <param name="connectionString">The connection string for the Azure Storage Account</param>
        /// <param name="containerName">The Blob Container</param>
        public BlobUtility(string containerName, string connectionString)
        {
            ConnectionString = connectionString;
            ContainerName = containerName;
        }

        /// <summary>
        /// Constructor takes a container name
        /// </summary>
        /// <param name="containerName">The Blob Container</param>
        public BlobUtility(string containerName)
        {
            ConnectionString = ConfigurationManager.AppSettings["CloudStorageConnectionString"];
            ContainerName = containerName;
        }

        /// <summary>
        /// Tracks the container name
        /// </summary>
        public string ContainerName = string.Empty;

        /// <summary>
        /// Read-only property for retrieving the blob container
        /// </summary>
        public CloudBlobContainer BlobContainer
        {
            get
            {
                var container = BlobClient.GetContainerReference(ContainerName.ToLower());
                container.CreateIfNotExists();
                return container;
            }
        }
        public string BlobServiceEndPoint { get { return BlobClient.BaseUri.AbsoluteUri; } }

        private CloudBlobClient BlobClient
        {
            get
            {
                return Account.CreateCloudBlobClient();
            }

        }

        #region Instance Methods

        /// <summary>
        /// Intializes the instance of BlobUtility
        /// </summary>
        /// <param name="connectionString">The connection string to use for Blog Storage</param>
        /// <param name="containerName">The container that will be accessed for blob storage</param>
        public void Initialize(string connectionString, string containerName)
        {
            ConnectionString = connectionString;
            ContainerName = containerName;
        }

        /// <summary>
        /// Put (create or update) a blob from a memory stream.
        /// </summary>
        /// <param name="stream">Memory stream to put to a blob</param>
        /// <param name="blobPath">Path to the blob</param>
        /// <param name="contentType">Content type of the blob</param>
        /// <param name="permissions">Blob Container Permissions for the blob</param>
        /// <returns></returns>
        public string PutBlob(MemoryStream stream, string blobPath, string contentType, BlobContainerPermissions permissions)
        {
            try
            {
                var blob = BlobContainer.GetBlockBlobReference(blobPath);

                // Set proper content type on the blog
                blob.Properties.ContentType = contentType;

                // Set the permissions for the file to be accessible through the internet
                BlobContainer.SetPermissions(permissions);

                // Upload to the Blob
                blob.UploadFromStream(stream);

                return blob.Uri.ToString();
            }
            catch (StorageException ex)
            {

                if (ex.RequestInformation.HttpStatusCode == 404)
                {
                    return string.Empty;
                }

                throw;
            }

        }

        public string Upload(MemoryStream stream, string blobPath, bool createSas = false, int sasExpiryInDays = 45)
        {
            string sasBlobToken = "";
            try
            {
                // Connect to the storage account’s blob endpoint 
                CloudStorageAccount account = CloudStorageAccount.Parse(ConnectionString);
                CloudBlobClient client = account.CreateCloudBlobClient();

                // Create the blob storage container 
                CloudBlobContainer container = client.GetContainerReference(ContainerName.ToLower());
                container.CreateIfNotExists();

                // Create the blob in the container 
                CloudBlockBlob blob = container.GetBlockBlobReference(blobPath);
                blob.DeleteIfExists();
                // Upload the zip and store it in the blob 
                blob.UploadFromStream(stream);
                if (createSas)
                {
                    //Set the expiry time and permissions for the blob.
                    //In this case the start time is specified as a few minutes in the past, to mitigate clock skew.
                    //The shared access signature will be valid immediately.
                    SharedAccessBlobPolicy sasConstraints = new SharedAccessBlobPolicy();
                    sasConstraints.SharedAccessStartTime = DateTime.UtcNow.AddMinutes(-1);
                    sasConstraints.SharedAccessExpiryTime = DateTime.UtcNow.AddDays(sasExpiryInDays);
                    sasConstraints.Permissions = SharedAccessBlobPermissions.Read;

                    //Generate the shared access signature on the blob, setting the constraints directly on the signature.
                    sasBlobToken = blob.GetSharedAccessSignature(sasConstraints);
                }
                //Return the URI string for the container, including the SAS token.
                return blob.Uri + sasBlobToken;
            }
            catch (StorageException)
            {
                throw;
            }
        }

        /// <summary>
        /// Put (create or update) a blob from a string.
        /// </summary>
        /// <param name="content">Content to put to the blob</param>
        /// <param name="blobPath">Path to the blob</param>
        /// <param name="contentType">Content type of the blob</param>
        /// <param name="permissions">Blob Container Permissions for the blob</param>
        /// <returns>True on success, false if unable to create</returns>
        public string PutBlob(string content, string blobPath, string contentType, BlobContainerPermissions permissions)
        {
            try
            {
                var blob = BlobContainer.GetBlockBlobReference(blobPath);

                var bytes = Encoding.Unicode.GetBytes(content);

                var ms = new MemoryStream(bytes);

                PutBlob(ms, blobPath, contentType, permissions);

                return blob.Uri.ToString();
            }
            catch (StorageException ex)
            {
                if (ex.RequestInformation.HttpStatusCode == 404)
                {
                    return string.Empty;
                }

                throw;
            }
        }

        /// <summary>
        /// Retrieve the specified blob
        /// </summary>
        /// <param name="blobAddress">Address of blob to retrieve</param>
        /// <returns>Stream containing blob</returns>
        public MemoryStream GetBlob(string blobAddress)
        //public static Stream GetBlob(string blobAddress)
        {
            var stream = new MemoryStream();

            BlobContainer.GetBlockBlobReference(blobAddress).DownloadToStream(stream);

            return stream;
        }

        /// <summary>
        /// Copy a blob.
        /// </summary>
        /// <param name="sourceBlobName">Source blob</param>
        /// <param name="destBlobName">Destination blob</param>
        /// <returns>True on success, false if unable to create</returns>
        public bool CopyBlob(string sourceBlobName, string destBlobName)
        {
            try
            {
                var sourceBlob = BlobContainer.GetBlockBlobReference(sourceBlobName);
                var destBlob = BlobContainer.GetBlockBlobReference(destBlobName);
                destBlob.StartCopyAsync(sourceBlob); // async
                return true;
            }
            catch (StorageException ex)
            {
                if (ex.RequestInformation.HttpStatusCode == 404)
                {
                    return false;
                }

                throw;
            }
        }

        /// <summary>
        /// Delete a blob.
        /// </summary>
        /// <param name="blobName">Name of blob to delete from container</param>
        /// <returns>True on success, false if unable to create</returns>
        public bool DeleteBlob(string blobName)
        {
            try
            {
                var blob = BlobContainer.GetBlockBlobReference(blobName);
                blob.Delete();
                return true;
            }
            catch (StorageException ex)
            {
                if (ex.RequestInformation.HttpStatusCode == 404)
                {
                    return false;
                }

                throw;
            }
        }

        /// <summary>
        /// Checks if a blob exists in the current container
        /// </summary>
        /// <param name="blobPath">Path to the blob</param>
        /// <returns>True on success, false if unable to create</returns>
        public bool Exists(string blobPath)
        {
            var blob = BlobContainer.GetBlockBlobReference(blobPath);

            try
            {
                blob.FetchAttributes();
                return true;
            }
            catch (StorageException ex)
            {
                if (ex.RequestInformation.HttpStatusCode == 404)
                {
                    return false;
                }
            }
            return false;
        }

        /// <summary>
        /// Renames a blob
        /// </summary>
        /// <param name="origBlobName">Original blob name</param>
        /// <param name="newBlobName">New blob name</param>
        /// <returns>True on success, false if unable to create</returns>
        public bool RenameBlob(string origBlobName, string newBlobName)
        {
            try
            {
                if (CopyBlob(origBlobName, newBlobName))
                {
                    return DeleteBlob(origBlobName);
                }
            }
            catch (Exception)
            {
                return false;
            }

            return false;
        }

        public static void UploadDirectory(string sourceDirectory, string targetFileName)
        {
            string tempPath = ConfigReader.GetSettingsValue("UploadWorkingDirectory", Path.GetTempPath());
            string tempDir = DirectoryHelper.CreateTempDirectory(tempPath);

            RetryVoidExecutor.Do(() =>
            {
                try
                {
                    if (!Directory.Exists(tempDir))
                    {
                        Directory.CreateDirectory(tempDir);
                    }

                    string zipPath = Path.Combine(tempDir, targetFileName);

                    ZipFile.CreateFromDirectory(sourceDirectory, zipPath);

                    using (MemoryStream ms = new MemoryStream(File.ReadAllBytes(zipPath)))
                    {
                        BlobUtility blobUtility = new BlobUtility();
                        blobUtility.Upload(ms, targetFileName);
                    }
                }

                catch (Exception)
                {
                    throw;
                }

                finally
                {
                    if (Directory.Exists(tempDir))
                        DirectoryHelper.DeleteDirectory(tempDir);
                }
            })
            .Try(RetryCount)
            .Wait(RetryTimeInterval)
            .Start();
        }

        public static void DownloadFiles(string path, string fileName)
        {

            RetryVoidExecutor.Do(() =>
            {
                BlobUtility utility = new BlobUtility();
                MemoryStream ms = utility.GetBlob(fileName);

                if (ms == null)
                    throw new Exception(string.Format("File download failed for stream '{0}'", fileName));

                using (ZipArchive archive = new ZipArchive(ms))
                {
                    foreach (ZipArchiveEntry file in archive.Entries)
                    {
                        string completeFileName = Path.Combine(path, file.FullName);
                        //create subdirectory if not exists
                        string fileDir = Path.GetDirectoryName(completeFileName);
                        if (!Directory.Exists(fileDir))
                        {
                            Directory.CreateDirectory(fileDir);
                        }

                        // if the file being extracted is an empty directory, don't try to extract since it is invalid
                        if (!string.IsNullOrWhiteSpace(Path.GetFileName(completeFileName)))
                        {
                            file.ExtractToFile(completeFileName, true);
                        }
                    }
                }
            })
            .Try(RetryCount)
            .Wait(RetryTimeInterval)
            .Start();
        }

        #endregion
    }

}
