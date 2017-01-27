﻿using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects.Common
{
    public class MaritalStatus : GbObject
    {
        [JsonProperty("statustext")]
        public string StatusText { get; set; }
        
    }
}
