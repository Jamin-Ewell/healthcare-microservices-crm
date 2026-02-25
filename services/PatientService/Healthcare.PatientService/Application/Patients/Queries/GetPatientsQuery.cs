using MediatR;

namespace Healthcare.PatientService.Application.Patients.Queries;

public record GetPatientsQuery() : IRequest<List<PatientDto>>;

public record PatientDto(
    Guid Id,
    string FirstName,
    string LastName,
    string Email,
    DateTime DateOfBirth);