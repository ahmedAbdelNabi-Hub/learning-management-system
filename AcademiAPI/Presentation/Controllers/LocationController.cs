using Application.UseCases.Locations.Queries;
using Microsoft.AspNetCore.Mvc;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Presentation.Controllers
{
    [ApiController]
    [Route("api/location/")]
    public class LocationController : ControllerBase
    {
        private readonly IMediator _mediator;

        public LocationController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("governorates")]
        public async Task<IActionResult> GetGovernorates()
        {
            var result = await _mediator.Send(new GetAllGovernoratesQuery());
            return Ok(result);
        }

        [HttpGet("governorates/{Id}/cities")]
        public async Task<IActionResult> GetCitiesByGovernorate(int Id)
        {
            var result = await _mediator.Send(new GetCitiesByGovernorateIdQuery(Id));
            return Ok(result);
        }
    }
}
