using Healthcare.PatientService.Persistence;
using Microsoft.Extensions.Hosting;

public class PatientCleanupWorker : BackgroundService
{
    private readonly IServiceScopeFactory _scopeFactory;

    public PatientCleanupWorker(IServiceScopeFactory scopeFactory)
    {
        _scopeFactory = scopeFactory;
    }

    protected override async Task ExecuteAsync(
        CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            using var scope = _scopeFactory.CreateScope();
            var db = scope.ServiceProvider
                .GetRequiredService<PatientDbContext>();

            // simulate cleanup logic
            await Task.Delay(TimeSpan.FromMinutes(5), stoppingToken);
        }
    }
}