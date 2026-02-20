using Healthcare.PatientService.Domain.Entities;
using Healthcare.PatientService.Messaging.RabbitMQ;
using Healthcare.PatientService.Persistence;
using MediatR;

namespace Healthcare.PatientService.Application.Patients.Commands;

public class CreatePatientHandler
	: IRequestHandler<CreatePatientCommand, Guid>
{
	private readonly PatientDbContext _context;
    private readonly IRabbitMqPublisher _publisher;

    public CreatePatientHandler(
        PatientDbContext context,
        IRabbitMqPublisher publisher)
    {
        _context = context;
        _publisher = publisher;
    }

    public async Task<Guid> Handle(
		CreatePatientCommand request,
		CancellationToken cancellationToken)
	{
		var patient = new Patient
		{
			Id = Guid.NewGuid(),
			FirstName = request.FirstName,
			LastName = request.LastName,
			Email = request.Email
		};

		_context.Patients.Add(patient);
		await _context.SaveChangesAsync(cancellationToken);
        await _publisher.PublishAsync(new
        {
            patient.Id,
            patient.Email
        });
        return patient.Id;
	}
}