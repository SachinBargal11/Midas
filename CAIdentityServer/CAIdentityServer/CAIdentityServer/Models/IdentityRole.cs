using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CAIdentityServer.Models
{
    /// <summary>
    /// Identity Role
    /// </summary>
    public class IdentityRole
    {
        /// <summary>
        /// Gets or sets Role ID
        /// </summary>
        public int ID { get; set; }

        /// <summary>
        /// Gets or sets role name
        /// </summary>
        public string Name { get; set; }
    }
}