using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http.Tracing;
using System.Net.Http;
using System.Text;
using SystemTrace = System.Diagnostics;
using Midas.Common;
namespace GbWebAPI.Helpers
{
    /// <summary>
    /// Public class to log Error/info messages to the access log file
    /// </summary>
    public sealed class HTTPRequestLogger : ITraceWriter
    {
        #region Private member variables.
        //  private static readonly Logger ClassLogger = NLog.LogManager.GetCurrentClassLogger();


        private static Dictionary<System.Web.Http.Tracing.TraceLevel, System.Diagnostics.TraceLevel> TraceMap = new Dictionary<System.Web.Http.Tracing.TraceLevel, System.Diagnostics.TraceLevel>()
        {
             {TraceLevel.Error , SystemTrace.TraceLevel.Error }
            ,{TraceLevel.Info   , SystemTrace.TraceLevel.Info }
            ,{TraceLevel.Warn   , SystemTrace.TraceLevel.Warning }

        };

        #endregion

        #region Public member methods.

        public void Trace(HttpRequestMessage request, string category, TraceLevel level, Action<TraceRecord> traceAction)
        {
            if (level != TraceLevel.Off)
            {
                if (traceAction != null && traceAction.Target != null)
                {
                    category = category + Environment.NewLine + "Action Parameters : " + traceAction.Target.ToString();
                }
                var record = new TraceRecord(request, category, level);
                if (traceAction != null) traceAction(record);
                Log(record);
            }
        }
        #endregion

        #region Private member methods.
        private void Log(TraceRecord record)
        {
            var message = new StringBuilder();

            if (!string.IsNullOrWhiteSpace(record.Message))
                message.Append("").Append(record.Message + Environment.NewLine);
            if (record.Request != null)
            {
                if (record.Request.Method != null)
                    message.Append("Method: " + record.Request.Method + Environment.NewLine);

                if (record.Request.RequestUri != null)
                    message.Append("").Append("URL: " + record.Request.RequestUri + Environment.NewLine);

                if (record.Request.Headers != null && record.Request.Headers.Contains("Token") && record.Request.Headers.GetValues("Token") != null && record.Request.Headers.GetValues("Token").FirstOrDefault() != null)
                    message.Append("").Append("Token: " + record.Request.Headers.GetValues("Token").FirstOrDefault() + Environment.NewLine);
            }
            if (!string.IsNullOrWhiteSpace(record.Category))
                message.Append("").Append(record.Category);

            if (!string.IsNullOrWhiteSpace(record.Operator))
                message.Append(" ").Append(record.Operator).Append(" ").Append(record.Operation);

            if (record.Exception != null && !string.IsNullOrWhiteSpace(record.Exception.GetBaseException().Message))
            {
                var exceptionType = record.Exception.GetType();
                message.Append(Environment.NewLine);
                if (exceptionType.IsSubclassOf(typeof(GbException)))
                {
                    GbException exception = (GbException)Convert.ChangeType(record.Exception, exceptionType);
                    message.Append("").Append("Error : " + exception.ToString() + Environment.NewLine);
                }
                else
                    message.Append("").Append("Error: " + record.Exception.GetBaseException().Message + Environment.NewLine);
            }
            //Diagnostics.LogManager.Log(Convert.ToString(message) + Environment.NewLine, TraceMap[record.Level]);
        }
        #endregion
    }
}