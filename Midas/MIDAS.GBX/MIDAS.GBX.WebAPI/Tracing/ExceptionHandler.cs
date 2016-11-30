using log4net;
using System;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http.ExceptionHandling;
using System.Web.Mvc;

namespace MIDAS.GBX.WebAPI.Controllers
{
    /// <summary>
    /// Class in charge with handleing special exception cases 
    /// </summary>
    public class ExceptionHandler : IExceptionHandler
    {
        public Task HandleAsync(ExceptionHandlerContext context, CancellationToken cancellationToken)
        {
            if (!ShouldHandle(context))
            {
                return Task.FromResult(0);
            }

            return HandleAsyncCore(context, cancellationToken);
        }

        public virtual Task HandleAsyncCore(ExceptionHandlerContext context,
                                   CancellationToken cancellationToken)
        {
            HandleCore(context);
            return Task.FromResult(0);
        }

        public virtual void HandleCore(ExceptionHandlerContext context)
        {
        }

        public virtual bool ShouldHandle(ExceptionHandlerContext context)
        {
            return context.CatchBlock.IsTopLevel;
        }
    }
}


public class ErrorHelper
{
    private static readonly ILog Log = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
}
