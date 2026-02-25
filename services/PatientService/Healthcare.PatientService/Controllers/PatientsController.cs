using Healthcare.PatientService.Application.Patients.Commands;
using Healthcare.PatientService.Application.Patients.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Healthcare.PatientService.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PatientsController : ControllerBase
{
    private readonly IMediator _mediator;

    public PatientsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreatePatientCommand command)
    {
        var id = await _mediator.Send(command);
        return Ok(id);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var patients = await _mediator.Send(new GetPatientsQuery());
        return Ok(patients);
    }
}