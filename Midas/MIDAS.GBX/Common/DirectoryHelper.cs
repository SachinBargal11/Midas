
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace MIDAS.GBX.Common
{
    public class DirectoryHelper
    {
        public static void DeleteDirectory(string directoryToDelete)
        {
            if (Directory.Exists(directoryToDelete))
            {
                foreach (var file in Directory.GetFiles(directoryToDelete, "*.*", SearchOption.AllDirectories))
                {
                    File.SetAttributes(file, FileAttributes.Normal);
                    File.Delete(file);
                }

                //Adding 2 seconds delay to avoid failures in deleting temp directory
                Thread.Sleep(2 * 1000);
                Console.WriteLine("Deleting directory '{0}'", directoryToDelete);
                Directory.Delete(directoryToDelete, true);
            }
        }

        public static string CreateTempDirectory(string tempPath = null)
        {
            if (string.IsNullOrWhiteSpace(tempPath))
                tempPath = Path.GetTempPath();

            var jobDir = Path.Combine(tempPath, Guid.NewGuid().ToString("N"));

            if (!Directory.Exists(jobDir))
            {
                Directory.CreateDirectory(jobDir);
            }

            foreach (var file in Directory.GetFiles(jobDir, "*.*", SearchOption.AllDirectories))
            {
                File.SetAttributes(file, FileAttributes.Normal);
                File.Delete(file);
            }

            foreach (var subDir in Directory.GetDirectories(jobDir, "*.*", SearchOption.AllDirectories))
            {
                Directory.Delete(subDir);
            }

            return jobDir;
        }

        /// <summary>
        /// Copy a source directory to a destination directory
        /// </summary>
        /// <param name="sourceDirName">Source directory</param>
        /// <param name="destDirName">Destination directory</param>
        /// <param name="copySubDirs">Copy sub directory flag</param>
        /// <param name="overwriteFiles">Overwrite files if they exist</param>
        public static void CopyDirectory(string sourceDirName, string destDirName, bool copySubDirs, bool overwriteFiles = false)
        {
            // Get the subdirectories for the specified directory.
            DirectoryInfo dir = new DirectoryInfo(sourceDirName);

            if (!dir.Exists)
            {
                throw new DirectoryNotFoundException("Source directory does not exist or could not be found: " + sourceDirName);
            }

            DirectoryInfo[] dirs = dir.GetDirectories();
            // If the destination directory doesn't exist, create it.
            if (!Directory.Exists(destDirName))
            {
                Directory.CreateDirectory(destDirName);
            }

            // Get the files in the directory and copy them to the new location.
            FileInfo[] files = dir.GetFiles();
            foreach (FileInfo file in files)
            {
                string temppath = Path.Combine(destDirName, file.Name);
                file.CopyTo(temppath, overwriteFiles);
            }

            // If copying subdirectories, copy them and their contents to new location.
            if (copySubDirs)
            {
                foreach (DirectoryInfo subdir in dirs)
                {
                    string temppath = Path.Combine(destDirName, subdir.Name);
                    CopyDirectory(subdir.FullName, temppath, copySubDirs, overwriteFiles);
                }
            }
        }

        public static void ValidateDirectorySize(string dir, long maxAllowedSize)
        {
            if (string.IsNullOrWhiteSpace(dir))
                throw new ArgumentNullException(dir);

            if (!Directory.Exists(dir))
                throw new Exception(string.Format("Directory '{0}' could not be found.", dir));

            long totalFileSize = 0;

            DirectoryInfo dirInfo = new DirectoryInfo(dir);

            foreach (FileInfo fi in dirInfo.EnumerateFiles("*", SearchOption.AllDirectories))
            {
                totalFileSize += fi.Length;

                if (totalFileSize > maxAllowedSize)
                {
                    throw new Exception(string.Format("Script directory '{0}' is bigger than maximum allowed size. Limit: {1} MB", dir, (int)maxAllowedSize / (1024 * 1024)));
                }
            }
        }
    }
}