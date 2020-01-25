using System;

namespace EmergingBooking.Infrastructure.Cqrs.Commands
{
    internal static class ResultMessages
    {
        public static readonly string ErrorObjectIsNotProvidedForFailure =
            "You attempted to create a failure result, which must have an error, but a null error object was passed to the constructor.";

        public static readonly string ErrorObjectIsProvidedForSuccess =
            "You attempted to create a success result, which cannot have an error, but a non-null error object was passed to the constructor.";
    }

    public class Result
    {
        private static readonly Result OkResult = new Result(true, "");

        public Result(bool isSuccess, string errorMessage)
        {
            bool doNotExistsErrorMessage = string.IsNullOrWhiteSpace(errorMessage);
            bool doExistsErrorMessage = !doNotExistsErrorMessage;

            if (isSuccess)
            {
                if (doExistsErrorMessage)
                    throw new ArgumentException(ResultMessages.ErrorObjectIsProvidedForSuccess, nameof(errorMessage));
            }
            else
            {
                if (doNotExistsErrorMessage)
                    throw new ArgumentNullException(nameof(errorMessage), ResultMessages.ErrorObjectIsNotProvidedForFailure);
            }

            Success = isSuccess;
            ErrorMessage = errorMessage;
        }

        public string ErrorMessage { get; }
        public bool Success { get; }
        public bool Failure => !Success;

        public static Result Ok()
        {
            return OkResult;
        }

        public static Result Fail(string errorMessage)
        {
            return new Result(false, errorMessage);
        }
    }
}
