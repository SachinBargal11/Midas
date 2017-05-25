using System;
using System.ComponentModel;
using System.Threading;

namespace MIDAS.GBX.Common
{
    #region Implementation
    public sealed class RetryExecutor<T>
    {
        public static IExecute<T> Try(int times)
        {
            return CreateExecutor().Try(times);
        }

        public IExecute<T> TryWhenTrue(int times, RetryLitmusAction litmusAction)
        {
            return CreateExecutor().TryWhenTrue(times, litmusAction);
        }
        public static IExecute<T> Do(Func<T> workToDo)
        {
            return CreateExecutor().Do(workToDo);
        }

        public static IExecute<T> RetryFailureAction(Action<Exception> failingAction)
        {
            return CreateExecutor().RetryFailureAction(failingAction);
        }

        public static IExecute<T> WhenFailedReturn(Func<T> failedAction)
        {
            return CreateExecutor().WhenFailedReturn(failedAction);
        }

        public static T Start()
        {
            return CreateExecutor().Start();
        }

        private static IExecute<T> CreateExecutor()
        {
            return new Executor<T>();
        }

        private class Executor<U> : IExecute<U>
        {
            private int retries = 0;
            private int waitSec = 10;
            private Action<Exception> retyAction;
            private Func<U> doAction;
            private Func<U> failAction;
            private RetryLitmusAction retryLitmusActionAction;

            public IExecute<U> Try(int times)
            {
                retries = times;
                return this;
            }

            public IExecute<U> TryWhenTrue(int times, RetryLitmusAction litmusAction)
            {
                retries = times;
                retryLitmusActionAction = litmusAction;
                return this;
            }
            public IExecute<U> Wait(int waitTimeSec)
            {
                waitSec = waitTimeSec;
                return this;
            }

            public IExecute<U> Do(Func<U> workToDo)
            {
                doAction = workToDo;
                return this;
            }


            public IExecute<U> RetryFailureAction(Action<Exception> retryAction)
            {
                retyAction = retryAction;
                return this;
            }

            public IExecute<U> WhenFailedReturn(Func<U> failedAction)
            {
                failAction = failedAction;
                return this;
            }

            public U Start()
            {
                int tries = 0;

                while (tries <= retries)
                {
                    tries++;
                    try
                    {

                        return doAction();
                    }
                    catch (Exception e)
                    {
                        if (tries <= retries && (retryLitmusActionAction == null || retryLitmusActionAction(e) == true))
                        {
                            if (retyAction != null) retyAction(e);
                        }
                        else
                        {
                            if (failAction != null)
                                return failAction();
                            else
                                throw;
                        }
                        Thread.Sleep(this.waitSec * 1000);
                    }
                }
                return failAction();
            }
        }
    }
    public sealed class RetryVoidExecutor
    {
        public static IVoidExecute Try(int times)
        {
            return CreateExecutor().Try(times);
        }
        public IVoidExecute TryWhenTrue(int times, RetryLitmusAction litmusAction)
        {
            return CreateExecutor().TryWhenTrue(times, litmusAction);
        }
        public static IVoidExecute Do(Action workToDo)
        {
            return CreateExecutor().Do(workToDo);
        }

        public static IVoidExecute RetryFailureAction(Action<Exception> failingAction)
        {
            return CreateExecutor().RetryFailureAction(failingAction);
        }

        public static IVoidExecute WhenFailedReturn(Action failedAction)
        {
            return CreateExecutor().WhenFailedReturn(failedAction);
        }

        public static void Start()
        {
            CreateExecutor().Start();
        }

        private static IVoidExecute CreateExecutor()
        {
            return new Executor();
        }

        private class Executor : IVoidExecute
        {
            private int retries = 0;
            private int waitSec = 10;
            private Action<Exception> retyAction;
            private Action doAction;
            private Action failAction;
            private RetryLitmusAction retryLitmusActionAction;

            public IVoidExecute Try(int times)
            {
                retries = times;
                return this;
            }

            public IVoidExecute TryWhenTrue(int times, RetryLitmusAction litmusAction)
            {
                retries = times;
                retryLitmusActionAction = litmusAction;
                return this;
            }

            public IVoidExecute Do(Action workToDo)
            {
                doAction = workToDo;
                return this;
            }

            public IVoidExecute Wait(int waitTimeSec)
            {
                waitSec = waitTimeSec;
                return this;
            }

            public IVoidExecute RetryFailureAction(Action<Exception> retryAction)
            {
                retyAction = retryAction;
                return this;
            }

            public IVoidExecute WhenFailedReturn(Action failedAction)
            {
                failAction = failedAction;
                return this;
            }

            public void Start()
            {
                int tries = 0;

                while (tries <= retries)
                {
                    tries++;
                    try
                    {
                        doAction();
                        break;
                    }
                    catch (Exception e)
                    {
                        if (tries <= retries && (retryLitmusActionAction == null || retryLitmusActionAction(e) == true))
                        {
                            if (retyAction != null) retyAction(e);
                        }
                        else
                        {
                            if (failAction != null)
                                failAction();
                            else
                                throw;
                        }
                        Thread.Sleep(this.waitSec * 1000);
                    }
                }
            }
        }
    }
    #endregion

    #region Interfaces
    public interface IExecute<U> : IFluentInterface
    {
        IExecute<U> Try(int times);
        IExecute<U> TryWhenTrue(int times, RetryLitmusAction litmusAction);
        IExecute<U> Do(Func<U> workToDo);
        IExecute<U> RetryFailureAction(Action<Exception> failingAction);
        IExecute<U> WhenFailedReturn(Func<U> failedReturnAction);
        IExecute<U> Wait(int waitTimeSec);
        U Start();
    }
    public interface IVoidExecute : IFluentInterface
    {
        IVoidExecute Try(int times);
        IVoidExecute TryWhenTrue(int times, RetryLitmusAction litmusAction);
        IVoidExecute Do(Action workToDo);
        IVoidExecute RetryFailureAction(Action<Exception> failingAction);
        IVoidExecute WhenFailedReturn(Action failedReturnAction);
        IVoidExecute Wait(int waitTimeSec);
        void Start();
    }
    [EditorBrowsable(EditorBrowsableState.Never)]
    public interface IFluentInterface
    {
        [EditorBrowsable(EditorBrowsableState.Never)]
        bool Equals(object obj);
        [EditorBrowsable(EditorBrowsableState.Never)]
        int GetHashCode();
        [EditorBrowsable(EditorBrowsableState.Never)]
        Type GetType();
        [EditorBrowsable(EditorBrowsableState.Never)]
        string ToString();
    }
    #endregion

    public delegate bool RetryLitmusAction(Exception ex);
}
