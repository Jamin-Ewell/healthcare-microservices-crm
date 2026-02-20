namespace Healthcare.PatientService.Messaging.RabbitMQ
{
    public interface IRabbitMqPublisher
    {
        Task PublishAsync<T>(T message);
    }
}
