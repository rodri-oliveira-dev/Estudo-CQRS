using System.Threading.Tasks;
using EmergingBooking.Infrastructure.Cqrs.Events;
using EmergingBooking.Infrastructure.KafkaProducer;
using EmergingBooking.Management.Application.Domain.Events;

namespace EmergingBooking.Management.Application.Handlers.Events
{
    internal class RoomAddedHandler : IEventHandler<RoomAdded>
    {
        public async Task HandleAsync(RoomAdded @event)
        {
            using (var producer =
                new KafkaProducer<RoomAdded>(
                    "room-added",
                    "kafkaserver:9092"))
            {
                await producer.ProduceMessage(@event);
            }
        }
    }
}
