using System;
using System.Threading;
using System.Threading.Tasks;
using EmergingBooking.Infrastructure.KafkaConsumer;
using EmergingBooking.Message.Consumer.Extensions;
using EmergingBooking.Message.Consumer.Repository;

namespace EmergingBooking.Message.Consumer.BackgroundService
{
    // TODO Change from write content in Console screen to Log this issue in ELK
    public class RoomConsumer : HostedService
    {
        private readonly RoomPersistenceSynchronizer _roomPersistenceSynchronizer;

        public RoomConsumer(RoomPersistenceSynchronizer roomPersistenceSynchronizer)
        {
            _roomPersistenceSynchronizer = roomPersistenceSynchronizer;
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
            var consumer = new KafkaConsumer<Models.RoomMessage>("hotel-consumer-group",
                                                                 "kafkaserver:9092",
                                                                 "room-added")
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

        private async Task OnRoomConsumingAsync(Models.RoomMessage roomMessage)
        {
            await _roomPersistenceSynchronizer.SynchronizeRoomData(roomMessage.ParserTo());
        }
    }
}
