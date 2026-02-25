using MediatR;

namespace Healthcare.PatientService.Application.Patients.Commands;

public record CreatePatientCommand(
    string FirstName,
    string LastName,
    string Email,
    DateTime DateOfBirth) : IRequest<Guid>;