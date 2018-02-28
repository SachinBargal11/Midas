using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IdentityServer3.Core.Configuration
{
    /// <summary>
    /// Represents a the portal to login
    /// </summary>
    public class CompanyPortal
    {
        /// <summary>
        /// Gets or sets the portal id.
        /// </summary>
        /// <value>
        /// The type.
        /// </value>
        public int Id { get; set; }

        /// <summary>
        /// Gets of sets the portal name
        /// <value>
        /// The portal name</value>
        /// </summary>
        public string Name { get; set; }
    }
}
