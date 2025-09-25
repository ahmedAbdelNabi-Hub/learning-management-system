using Application.UseCases.Locations.Queries;
using Microsoft.AspNetCore.Mvc;
using MediatR;

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
    }
}
