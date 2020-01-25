using System.Threading.Tasks;
using Confluent.Kafka;
using EmergingBooking.Infrastructure.Cqrs.Events;
using EmergingBooking.Infrastructure.KafkaProducer;
using EmergingBooking.Reservation.Application.Domain.Events;
using Newtonsoft.Json;

namespace EmergingBooking.Reservation.Application.Handlers
{
    internal class ReservationCreatedHandler : IEventHandler<ReservationCreated>
    {
        public async Task HandleAsync(ReservationCreated @event)
        {
            using (var producer =
                new KafkaProducer<ReservationCreated>(
                    "reservation",
                    "kafkaserver:9092"))
            {
                await producer.ProduceMessage(@event);
            }
        }
    }
}
