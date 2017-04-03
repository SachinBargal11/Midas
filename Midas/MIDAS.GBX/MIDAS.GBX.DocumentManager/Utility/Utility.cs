using MIDAS.GBX.DataRepository.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MIDAS.GBX.DocumentManager
{
    public class Utility
    {
        public string getBlob(int documentId, MIDASGBXEntities context)
        {
            string filename = string.Empty;
            filename = context.MidasDocuments.Where(doc => doc.Id == documentId).FirstOrDefault().DocumentName;

            return filename;
        }

    }
}