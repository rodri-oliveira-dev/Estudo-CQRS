using System.Threading.Tasks;
using EmergingBooking.Infrastructure.Cqrs.Events;
using EmergingBooking.Infrastructure.KafkaProducer;
using EmergingBooking.Reservation.Application.Domain.Events;

namespace EmergingBooking.Management.Application.Handlers.Events
{
    internal class HotelAddressUpdatedHandler : IEventHandler<HotelAddressUpdated>
    {
        public async Task HandleAsync(HotelAddressUpdated @event)
        {
            using (var producer =
                new KafkaProducer<HotelAddressUpdated>(
                    "hotel-address-updated",
                    "kafkaserver:9092"))
            {
                await producer.ProduceMessage(@event);
            }
        }
    }
}
