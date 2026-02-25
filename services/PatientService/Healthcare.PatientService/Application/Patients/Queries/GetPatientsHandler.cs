using Healthcare.PatientService.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Healthcare.PatientService.Application.Patients.Queries;

public class GetPatientsHandler
    : IRequestHandler<GetPatientsQuery, List<PatientDto>>
{
    private readonly PatientDbContext _context;

    public GetPatientsHandler(PatientDbContext context)
    {
        _context = context;
    }

    public async Task<List<PatientDto>> Handle(
        GetPatientsQuery request,
        CancellationToken cancellationToken)
    {
        return await _context.Patients
            .Select(p => new PatientDto(
                p.Id,
                p.FirstName,
                p.LastName,
                p.Email,
                p.DateOfBirth))
            .ToListAsync(cancellationToken);
    }
}
