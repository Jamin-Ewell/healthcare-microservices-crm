using Azure.Messaging.ServiceBus;
using Healthcare.PatientService.Messaging.ServiceBus;
using System.Text.Json;

public class ServiceBusPublisher : IServiceBusPublisher
{
    private readonly IConfiguration _config;

    public ServiceBusPublisher(IConfiguration config)
    {
        _config = config;
    }

    public async Task PublishAsync<T>(T message)
    {
        await using var client =
            new ServiceBusClient(_config["ServiceBus:ConnectionString"]);

        var sender = client.CreateSender("patient-created-topic");

        var serviceBusMessage =
            new ServiceBusMessage(JsonSerializer.Serialize(message));

        await sender.SendMessageAsync(serviceBusMessage);
    }
}