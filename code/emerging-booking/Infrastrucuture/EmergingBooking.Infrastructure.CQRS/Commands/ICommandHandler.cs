using System.Threading.Tasks;

namespace EmergingBooking.Infrastructure.Cqrs.Commands
{
    public interface ICommandHandler<in TCommand>
        where TCommand : ICommand
    {
        Task<Result> ExecuteAsync(TCommand command);
    }
}
