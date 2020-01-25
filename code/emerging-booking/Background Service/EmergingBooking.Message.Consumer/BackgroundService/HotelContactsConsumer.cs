using System;
using System.Threading;
using System.Threading.Tasks;
using EmergingBooking.Infrastructure.KafkaConsumer;
using EmergingBooking.Message.Consumer.DataModels;
using EmergingBooking.Message.Consumer.Extensions;
using EmergingBooking.Message.Consumer.Models;
using EmergingBooking.Message.Consumer.Repository;
using Microsoft.Extensions.Hosting;

namespace EmergingBooking.Message.Consumer.BackgroundService
{

    public interface IHotelContactsConsumer : IHostedService { }

    // TODO Change from write content in Console screen to Log this issue in ELK
    public class HotelContactsConsumer : HostedService, IHotelContactsConsumer
    {
        private readonly HotelPersistenceSynchronizer _hotelPersistenceSynchronizer;

        public HotelContactsConsumer(HotelPersistenceSynchronizer hotelPersistenceSynchronizer)
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
            var consumer = new KafkaConsumer<HotelContactsMessage>("hotel-consumer-group",
                                                                   "kafkaserver:9092",
                                                                   "hotel-contacts-updated")
            {
                OnConsumingAsync = OnHotelContactsConsumingAsync
            };

            var cancellationToken = new CancellationTokenSource();
            Console.CancelKeyPress += (_, e) =>
            {
                e.Cancel = true;
                cancellationToken.Cancel();
            };

            await consumer.ConsumeAsync(cancellationToken);
        }

        private async Task OnHotelContactsConsumingAsync(HotelContactsMessage hotelContactsMessage)
        {
            await _hotelPersistenceSynchronizer.SynchronizeHotelContactsData(hotelContactsMessage.ParserTo());
        }
    }
}
