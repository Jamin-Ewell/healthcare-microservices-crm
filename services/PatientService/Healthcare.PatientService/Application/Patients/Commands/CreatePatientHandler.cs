using Healthcare.PatientService.Domain.Entities;
using Healthcare.PatientService.Persistence;
using MediatR;

namespace Healthcare.PatientService.Application.Patients.Commands;

public class CreatePatientHandler
	: IRequestHandler<CreatePatientCommand, Guid>
{
	private readonly PatientDbContext _context;

	public CreatePatientHandler(PatientDbContext context)
	{
		_context = context;
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

		return patient.Id;
	}
}