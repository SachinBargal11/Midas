using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using Amazon;
using Amazon.S3;
using Amazon.S3.Model;
using System.IO;
using Amazon.S3.IO;
using iTextSharp.text.pdf;
using iTextSharp.text;
using System.Text.RegularExpressions;

namespace MIDAS.GBX.DocumentManager
{
    public class AmazonS3BlobService : BlobServiceProvider, IDisposable
    {
        #region privateMembers
        private static readonly string _awsAccessKey = ConfigurationManager.AppSettings["AWSAccessKey"];
        private static readonly string _awsSecretKey = ConfigurationManager.AppSettings["AWSSecretKey"];
        private string _bucketName = ConfigurationManager.AppSettings["Bucketname"];
        private string _ServiceURL = ConfigurationManager.AppSettings["ServiceURL"];
        #endregion

        public AmazonS3BlobService()
        {

        }

        public override Object Upload(string blobPath, HttpContent content, int companyId)
        {
            string returnurl = "";
            try
            {
                IAmazonS3 s3Client;
                Amazon.S3.AmazonS3Config s3Config = new Amazon.S3.AmazonS3Config();
                s3Config.ServiceURL = _ServiceURL;
                using (s3Client = new AmazonS3Client(_awsAccessKey, _awsSecretKey, s3Config))
                {
                    S3DirectoryInfo directoryInfo = new S3DirectoryInfo(s3Client, _bucketName);
                    bool fileExists = directoryInfo.Exists;// true if the bucket exists in other case false.
                    //bool fileExists = true;
                    if (fileExists)
                    {
                        using (Stream stream = content.ReadAsStreamAsync().Result)
                        {
                            blobPath = "company-" + companyId + "/" + blobPath;
                            var request = new PutObjectRequest()
                            {
                                BucketName = _bucketName,
                                CannedACL = S3CannedACL.PublicRead,//PERMISSION TO FILE PUBLIC ACCESIBLE
                                Key = string.Format(blobPath + "/{0}", content.Headers.ContentDisposition.FileName.Replace("\"", string.Empty)),
                                InputStream = stream //SEND THE FILE STREAM
                            };

                            PutObjectResponse response2 = s3Client.PutObject(request);
                            if (response2.HttpStatusCode.ToString() == "OK")
                            {
                                returnurl = s3Config.ServiceURL + "/" + request.Key;
                            }
                            else
                            {
                                returnurl = "UnableToUpload";
                            }
                        }

                    }

                }
            }
            catch (AmazonS3Exception amazonS3Exception)
            {
                if (amazonS3Exception.ErrorCode != null && (amazonS3Exception.ErrorCode.Equals("InvalidAccessKeyId") || amazonS3Exception.ErrorCode.Equals("InvalidSecurity")))
                {
                    return "UnableToUpload";
                }
                else
                {
                    return "UnableToUpload";
                }
            }
            return HttpUtility.UrlDecode(returnurl);
        }

        public override Object Upload(string blobPath, MemoryStream memorystream, int companyId)
        {
            string returnurl = "";

            try
            {
                IAmazonS3 s3Client;
                Amazon.S3.AmazonS3Config s3Config = new Amazon.S3.AmazonS3Config();
                s3Config.ServiceURL = _ServiceURL;
                using (s3Client = new AmazonS3Client(_awsAccessKey, _awsSecretKey, s3Config))
                {
                    S3DirectoryInfo directoryInfo = new S3DirectoryInfo(s3Client, _bucketName);
                    bool fileExists = directoryInfo.Exists;// true if the bucket exists in other case false.
                    //bool fileExists = true;
                    if (fileExists)
                    {
                        using (Stream stream = memorystream)
                        {
                            blobPath = "company-" + companyId + "/" + blobPath;
                            var request = new PutObjectRequest()
                            {
                                BucketName = _bucketName,
                                CannedACL = S3CannedACL.PublicRead,//PERMISSION TO FILE PUBLIC ACCESIBLE
                                Key = string.Format(blobPath),
                                InputStream = stream //SEND THE FILE STREAM
                            };

                            PutObjectResponse response2 = s3Client.PutObject(request);
                            if (response2.HttpStatusCode.ToString() == "OK")
                            {
                                returnurl = s3Config.ServiceURL + "/" + request.Key;
                            }
                            else
                            {
                                returnurl = "UnableToUpload";
                            }
                        }
                    }
                }
            }
            catch (AmazonS3Exception amazonS3Exception)
            {
                if (amazonS3Exception.ErrorCode != null && (amazonS3Exception.ErrorCode.Equals("InvalidAccessKeyId") || amazonS3Exception.ErrorCode.Equals("InvalidSecurity")))
                {
                    return "UnableToUpload";
                }
                else
                {
                    return "UnableToUpload";
                }
            }

            return HttpUtility.UrlDecode(returnurl);
        }

        public override Object Download(int companyId, string documentPath)
        {
            IAmazonS3 s3Client;
            Amazon.S3.AmazonS3Config s3Config = new Amazon.S3.AmazonS3Config();
            s3Config.ServiceURL = _ServiceURL;
            //Sample BLOB URL : https://s3-us-west-2.amazonaws.com/company-1/cs-1/consent/doorduckemail.txt
            try
            {
                using (s3Client = new AmazonS3Client(_awsAccessKey, _awsSecretKey, s3Config))
                {
                    string[] oldkey = documentPath.Split(new string[] { _ServiceURL + "/" }, StringSplitOptions.None);
                    GetObjectRequest request = new GetObjectRequest
                    {
                        BucketName = _bucketName,
                        Key = string.Format(oldkey[1].ToString())
                    };

                    using (GetObjectResponse response = s3Client.GetObject(request))
                    {
                        using (Stream responseStream = response.ResponseStream)
                        {
                            using (var ms = new MemoryStream())
                            {
                                responseStream.CopyTo(ms);
                                return (Object)new
                                {
                                    ContentType = response.Headers.ContentType,
                                    Content_Disposition = "Attachment; filename=" + Path.GetFileName(documentPath.ToString()),
                                    Content_Length = response.ContentLength.ToString(),
                                    ByteArray = ms.ToArray(),
                                    filename = Path.GetFileName(documentPath.ToString())
                                };
                            }
                        }
                    }
                }
            }
            catch (AmazonS3Exception amazonS3Exception)
            {

                if (amazonS3Exception.ErrorCode != null && (amazonS3Exception.ErrorCode.Equals("InvalidAccessKeyId") || amazonS3Exception.ErrorCode.Equals("InvalidSecurity")))
                {
                    return "UnableToDownload";
                }
                else
                {
                    return "UnableToDownload";
                }
            }

        }

        public override Object Merge(int companyId, object pdfFiles, string blobPath)
        {
            IAmazonS3 s3Client;
            Amazon.S3.AmazonS3Config s3Config = new Amazon.S3.AmazonS3Config();
            s3Config.ServiceURL = _ServiceURL;
            string tempUploadPath = HttpContext.Current.Server.MapPath("~/App_data/uploads/" + Path.GetFileName(blobPath));
            using (FileStream stream = new FileStream(tempUploadPath, FileMode.Create))
            {
                PdfReader reader = null;
                Document sourceDocument = new Document();
                List<string> lstfiles = pdfFiles as List<string>;
                PdfWriter writer = PdfWriter.GetInstance(sourceDocument, stream);
                PdfSmartCopy copy = new PdfSmartCopy(sourceDocument, stream);
                sourceDocument.Open();
                if (lstfiles == null || lstfiles.Count == 0)
                {
                    return "Please select only PDF files to merge";
                }
                using (s3Client = new AmazonS3Client(_awsAccessKey, _awsSecretKey, s3Config))
                {

                    lstfiles.ForEach(file =>
                    {

                        string[] oldkey = file.Split(new string[] { _ServiceURL + "/" }, StringSplitOptions.None);
                        GetObjectRequest request = new GetObjectRequest
                        {
                            BucketName = _bucketName,
                            Key = string.Format(oldkey[1].ToString())
                        };



                        using (GetObjectResponse response = s3Client.GetObject(request))
                        {
                            using (Stream responseStream = response.ResponseStream)
                            {
                                using (var ms = new MemoryStream())
                                {
                                    responseStream.CopyTo(ms);
                                    reader = new PdfReader(ms.ToArray());
                                    copy.AddDocument(reader);
                                    reader.Close();
                                }
                            }
                        }
                    });
                    copy.Close();
                }

            }
            var blobURL = this.Upload(blobPath, tempUploadPath, companyId);
            return (object)blobURL;
        }


        public override Object Packet(int companyId, object pdfFiles, string blobPath)
        {
            IAmazonS3 s3Client;
            Amazon.S3.AmazonS3Config s3Config = new Amazon.S3.AmazonS3Config();
            s3Config.ServiceURL = _ServiceURL;
            string tempUploadPath = HttpContext.Current.Server.MapPath("~/App_data/uploads/" + Path.GetFileName(blobPath));
            tempUploadPath = tempUploadPath.Replace(Path.GetExtension(blobPath), "") + @"\src";
            if (Directory.Exists(tempUploadPath) == false)
            {
                Directory.CreateDirectory(tempUploadPath);
            }
            else
            {
                Directory.Delete(tempUploadPath, true);
                Directory.CreateDirectory(tempUploadPath);
            }

           

            List<string> lstfiles = pdfFiles as List<string>;
            if (lstfiles == null || lstfiles.Count == 0)
            {
                return "Please select only PDF files to packet";
            }
            using (s3Client = new AmazonS3Client(_awsAccessKey, _awsSecretKey, s3Config))
            {
                lstfiles.ForEach(file =>
            {
                string[] oldkey = file.Split(new string[] { _ServiceURL + "/" }, StringSplitOptions.None);
                GetObjectRequest request = new GetObjectRequest
                {
                    BucketName = _bucketName,
                    Key = string.Format(oldkey[1].ToString())
                };
                using (GetObjectResponse response = s3Client.GetObject(request))
                {
                    using (Stream responseStream = response.ResponseStream)
                    {
                        using (var ms = new MemoryStream())
                        {
                            responseStream.CopyTo(ms);
                            long fileByteLength = response.ContentLength;
                            byte[] fileContents = new byte[fileByteLength];
                            File.WriteAllBytes(tempUploadPath + @"\" + Path.GetFileName(file), ms.ToArray());
                        }
                    }
                }
            });
            }

            
            string DestinationDirZIP = tempUploadPath.Replace(@"\src", "") + @"\" + Path.GetFileName(blobPath);
            if (File.Exists(DestinationDirZIP))
            {
                File.Delete(DestinationDirZIP);
            }
            System.IO.Compression.ZipFile.CreateFromDirectory(tempUploadPath, DestinationDirZIP);
           

            var blobURL = this.Upload(blobPath, DestinationDirZIP, companyId);
            return (object)blobURL;
            //return "";
        }

        public override Object Upload(string blobPath, string serverPath, int companyId)
        {
            string returnurl = "";
            try
            {
                IAmazonS3 s3Client;
                Amazon.S3.AmazonS3Config s3Config = new Amazon.S3.AmazonS3Config();
                s3Config.ServiceURL = _ServiceURL;
                using (s3Client = new AmazonS3Client(_awsAccessKey, _awsSecretKey, s3Config))
                {
                    S3DirectoryInfo directoryInfo = new S3DirectoryInfo(s3Client, _bucketName);
                    bool fileExists = directoryInfo.Exists;// true if the bucket exists in other case false.

                    blobPath = "company-" + companyId + "/" + blobPath;

                    var request = new PutObjectRequest()
                    {
                        BucketName = _bucketName,
                        CannedACL = S3CannedACL.PublicRead,//PERMISSION TO FILE PUBLIC ACCESIBLE
                        Key = string.Format(blobPath),
                        FilePath = serverPath
                    };

                    PutObjectResponse response2 = s3Client.PutObject(request);
                    if (response2.HttpStatusCode.ToString() == "OK")
                    {
                        returnurl = s3Config.ServiceURL + "/" + request.Key;
                    }
                    else
                    {
                        returnurl = "UnableToUpload";
                    }
                }
            }
            catch (AmazonS3Exception amazonS3Exception)
            {
                if (amazonS3Exception.ErrorCode != null && (amazonS3Exception.ErrorCode.Equals("InvalidAccessKeyId") || amazonS3Exception.ErrorCode.Equals("InvalidSecurity")))
                {
                    return "UnableToUpload";
                }
                else
                {
                    return "UnableToUpload";
                }
            }

            return HttpUtility.UrlDecode(returnurl);
        }


        public bool DeleteBlob(string blobName)
        {
            IAmazonS3 s3Client;
            Amazon.S3.AmazonS3Config s3Config = new Amazon.S3.AmazonS3Config();
            s3Config.ServiceURL = _ServiceURL;
            try
            {
                using (s3Client = new AmazonS3Client(_awsAccessKey, _awsSecretKey, s3Config))
                {
                    string[] oldkey = blobName.Split(new string[] { _ServiceURL + "/" }, StringSplitOptions.None);
                    DeleteObjectRequest deleteObjectRequest = new DeleteObjectRequest
                    {
                        BucketName = _bucketName,
                        Key = string.Format(oldkey[1].ToString())
                    };
                    s3Client.DeleteObject(deleteObjectRequest);
                    return true;
                }
            }
            catch (AmazonS3Exception amazonS3Exception)
            {
                if (amazonS3Exception.ErrorCode != null && (amazonS3Exception.ErrorCode.Equals("InvalidAccessKeyId") || amazonS3Exception.ErrorCode.Equals("InvalidSecurity")))
                {
                    return false;
                }
                else
                {
                    return false;
                }

                throw;
            }
        }

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}