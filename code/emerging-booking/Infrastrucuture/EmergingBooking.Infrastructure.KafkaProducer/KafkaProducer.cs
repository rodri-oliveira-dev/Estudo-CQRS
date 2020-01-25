using System;
using System.Threading.Tasks;
using Confluent.Kafka;
using Newtonsoft.Json;
using Polly;
using Polly.Retry;

namespace EmergingBooking.Infrastructure.KafkaProducer
{
    public class KafkaProducer<TEntity> : IDisposable
        where TEntity : class
    {
        private readonly AsyncRetryPolicy<DeliveryResult<Null, string>> _kafkaRetryPolicy;

        private readonly string _topicName;

        private readonly ProducerConfig _producerConfig;

        public KafkaProducer(string topicName, string server)
        {
            _kafkaRetryPolicy =
                Policy.HandleResult<DeliveryResult<Null, string>>(r => r == null)
                    .WaitAndRetryAsync(3, retryAttempt => TimeSpan.FromSeconds(Math.Pow(2, retryAttempt) / 2));

            _topicName = topicName;

            _producerConfig = new ProducerConfig
            {
                BootstrapServers = server
            };
        }

        public async Task<DeliveryResult<Null, string>> ProduceMessage(TEntity entity)
        {
            // If serializers are not specified, default serializers from
            // `Confluent.Kafka.Serializers` will be automatically used where
            // available. Note: by default strings are encoded as UTF8.
            using (var p = new ProducerBuilder<Null, string>(_producerConfig).Build())
            {
                var message = new Message<Null, string>
                {
                    Value = JsonConvert.SerializeObject(entity)
                };

                return await _kafkaRetryPolicy.ExecuteAsync(() => p.ProduceAsync(_topicName, message));
            }
        }

        public void Dispose()
        {
        }
    }
}
