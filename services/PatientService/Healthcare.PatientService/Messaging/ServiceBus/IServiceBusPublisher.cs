namespace Healthcare.PatientService.Messaging.ServiceBus
{
    public interface IServiceBusPublisher
    {
        Task PublishAsync<T>(T message);
    }
}
