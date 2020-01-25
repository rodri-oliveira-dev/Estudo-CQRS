using System;
using System.Threading;
using System.Threading.Tasks;
using EmergingBooking.Infrastructure.KafkaConsumer;
using EmergingBooking.Message.Consumer.Extensions;
using EmergingBooking.Message.Consumer.Repository;

namespace EmergingBooking.Message.Consumer.BackgroundService
{
    // TODO Change from write content in Console screen to Log this issue in ELK
    public class ReservationConsumer : HostedService
    {
        private readonly ReservationPersistenceSynchronizer _reservationPersistenceSynchronizer;

        public ReservationConsumer(ReservationPersistenceSynchronizer reservationPersistenceSynchronizer)
        {
            _reservationPersistenceSynchronizer = reservationPersistenceSynchronizer;
        }

        protected override async Task ExecuteAsync(CancellationToken cancellationToken)
        {
            while (!cancellationToken.IsCancellationRequested)
            {
                await ConsumeRoomMessage();

                await Task.Delay(TimeSpan.FromSeconds(5), cancellationToken);
            }
        }

        private async Task ConsumeRoomMessage()
        {
            var consumer = new KafkaConsumer<Models.ReservationMessage>("hotel-consumer-group",
                                                                 "kafkaserver:9092",
                                                                 "reservation")
            {
                OnConsumingAsync = OnRoomConsumingAsync
            };

            var cancellationToken = new CancellationTokenSource();
            Console.CancelKeyPress += (_, e) =>
            {
                e.Cancel = true;
                cancellationToken.Cancel();
            };

            await consumer.ConsumeAsync(cancellationToken);
        }

        private async Task OnRoomConsumingAsync(Models.ReservationMessage reservationMessage)
        {
            await _reservationPersistenceSynchronizer.SynchronizeReservationData(reservationMessage.ParserTo());
        }
    }
}
