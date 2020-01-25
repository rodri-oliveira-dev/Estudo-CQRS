using System;
using System.Threading;
using System.Threading.Tasks;
using EmergingBooking.Infrastructure.KafkaConsumer;
using EmergingBooking.Message.Consumer.Extensions;
using EmergingBooking.Message.Consumer.Models;
using EmergingBooking.Message.Consumer.Repository;

namespace EmergingBooking.Message.Consumer.BackgroundService
{
    // TODO Change from write content in Console screen to Log this issue in ELK
    public class HotelAddressConsumer : HostedService
    {
        private readonly HotelPersistenceSynchronizer _hotelPersistenceSynchronizer;

        public HotelAddressConsumer(HotelPersistenceSynchronizer hotelPersistenceSynchronizer)
        {
            _hotelPersistenceSynchronizer = hotelPersistenceSynchronizer;
        }

        protected override async Task ExecuteAsync(CancellationToken cancellationToken)
        {
            while (!cancellationToken.IsCancellationRequested)
            {
                await ConsumeHotelMessage();

                await Task.Delay(TimeSpan.FromSeconds(5), cancellationToken);
            }
        }

        private async Task ConsumeHotelMessage()
        {
            var consumer = new KafkaConsumer<HotelAddressMessage>("hotel-consumer-group",
                                                                  "kafkaserver:9092",
                                                                  "hotel-address-updated")
            {
                OnConsumingAsync = OnHotelAddressConsumingAsync
            };

            var cancellationToken = new CancellationTokenSource();
            Console.CancelKeyPress += (_, e) =>
            {
                e.Cancel = true;
                cancellationToken.Cancel();
            };

            await consumer.ConsumeAsync(cancellationToken);
        }

        private async Task OnHotelAddressConsumingAsync(HotelAddressMessage hotelAddressMessage)
        {
            await _hotelPersistenceSynchronizer.SynchronizeHotelAddressData(hotelAddressMessage.ParserTo());
        }
    }
}
