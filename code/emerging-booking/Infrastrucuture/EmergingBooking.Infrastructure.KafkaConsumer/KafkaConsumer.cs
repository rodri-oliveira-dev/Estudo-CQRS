using System;
using System.Threading;
using System.Threading.Tasks;
using Confluent.Kafka;
using Newtonsoft.Json;
using Polly;
using Polly.Retry;

namespace EmergingBooking.Infrastructure.KafkaConsumer
{
    public class KafkaConsumer<TEntity>
        where TEntity : class
    {
        private readonly RetryPolicy<ConsumeResult<Ignore, string>> _kafkaRetryPolicy;

        private readonly string _topicName;

        private readonly ConsumerConfig _consumerConfig;

        public KafkaConsumer(string group, string server, string topicName)
        {
            _kafkaRetryPolicy =
                Policy.HandleResult<ConsumeResult<Ignore, string>>(r => r == null)
                    .WaitAndRetry(3, retryAttempt => TimeSpan.FromSeconds(Math.Pow(2, retryAttempt) / 2));

            _topicName = topicName;

            _consumerConfig = new ConsumerConfig
            {
                GroupId = @group,
                BootstrapServers = server,
                EnableAutoCommit = false,
                StatisticsIntervalMs = 5000,
                SessionTimeoutMs = 6000,
                EnablePartitionEof = true,
                AutoOffsetReset = AutoOffsetReset.Earliest
            };
        }

        public Func<TEntity, Task> OnConsumingAsync;

        public async Task ConsumeAsync(CancellationTokenSource cancellationToken)
        {
            using (var consumer = new ConsumerBuilder<Ignore, string>(_consumerConfig).Build())
            {
                consumer.Subscribe(new [] { _topicName });
                
                try
                {
                    while (true)
                    {
                        try
                        {
                            var consumeResult =
                                _kafkaRetryPolicy.Execute(() => consumer.Consume(cancellationToken.Token));

                            if (consumeResult.IsPartitionEOF)
                            {
                                Console.WriteLine(
                                    $"Reached end of topic {consumeResult.Topic}, partition {consumeResult.Partition}, offset {consumeResult.Offset}.");

                                continue;
                            }

                            var entityJsonMessage = JsonConvert.DeserializeObject<TEntity>(consumeResult.Value);

                            await OnConsumingAsync(entityJsonMessage);

                            Console.WriteLine($"Consumed message '{consumeResult.Value}' at: '{consumeResult.TopicPartitionOffset}'.");
                           
                            try
                            {
                                consumer.Commit(consumeResult);
                            }
                            catch (KafkaException e)
                            {
                                Console.WriteLine($"Commit error: {e.Error.Reason}");
                            }
                        }
                        catch (ConsumeException e)
                        {
                            Console.WriteLine($"Error occured: {e.Error.Reason}");
                        }
                    }
                }
                catch (OperationCanceledException)
                {
                    // Ensure the consumer leaves the group cleanly and final offsets are committed.
                    consumer.Close();
                }
            }
        }
    }
}
