using Application.DTOs.Stage;
using Application.UseCases.Stages.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Presentation.Controllers
{
    [ApiController]
    [Route("api/stages/")]
    public class StagesController : ControllerBase
    {
        private readonly IMediator _mediator;

        public StagesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<List<StageDto>>> GetStages()
        {
            var result = await _mediator.Send(new GetAllStagesQuery());
            return Ok(result);
        }

        [HttpGet("{stageId}/divisions")]
        public async Task<ActionResult<List<DivisionDto>>> GetDivisionsByStage(int stageId)
        {
            var result = await _mediator.Send(new GetDivisionsByStageIdQuery(stageId));
            return Ok(result);
        }
    }
}
