using System.Threading.Tasks;
using EmergingBooking.Infrastructure.Cqrs.Events;
using EmergingBooking.Infrastructure.KafkaProducer;
using EmergingBooking.Reservation.Application.Domain.Events;

namespace EmergingBooking.Management.Application.Handlers.Events
{
    internal class HotelCreatedHandler : IEventHandler<HotelCreated>
    {
        public async Task HandleAsync(HotelCreated @event)
        {
            using (var producer =
                new KafkaProducer<HotelCreated>(
                    "hotel-created",
                    "kafkaserver:9092"))
            {
                await producer.ProduceMessage(@event);
            }
        }
    }
}
