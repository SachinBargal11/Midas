//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace MIDAS.GBX.DataRepository.Model
{
    using System;
    using System.Collections.Generic;
    
    public partial class EMailQueue
    {
        public int Id { get; set; }
        public int AppId { get; set; }
        public string FromEmail { get; set; }
        public string ToEmail { get; set; }
        public string CcEmail { get; set; }
        public string BccEmail { get; set; }
        public string EMailSubject { get; set; }
        public string EMailBody { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public Nullable<System.DateTime> DeliveryDate { get; set; }
        public int NumberOfAttempts { get; set; }
        public string ResultObject { get; set; }
    }
}
