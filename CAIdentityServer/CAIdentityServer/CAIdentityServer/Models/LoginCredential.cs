using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CAIdentityServer.Models
{
    /// <summary>
    /// Models the inputs to be submitted to the local login endpoint.
    /// </summary>
    public class LoginCredential
    {
        /// <summary>
        /// Gets or sets the username.
        /// </summary>
        /// <value>
        /// The username.
        /// </value>
        public string Username { get; set; }

        /// <summary>
        /// Gets or sets the password.
        /// </summary>
        /// <value>
        /// The password.
        /// </value>
        public string Password { get; set; }

        /// <summary>
        /// Gets or sets the remember me.
        /// </summary>
        /// <value>
        /// The remember me.
        /// </value>
        public bool RememberMe { get; set; }

        public static string cururl { get; set; }

        public static bool Isotpverified { get; set; }

        public static string Cookieusername { get; set; }
    }
}