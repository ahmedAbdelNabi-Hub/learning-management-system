using Application.DTOs.Stage;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.UseCases.Stages.Queries
{
    public record GetDivisionsByStageIdQuery(int StageId) : IRequest<List<DivisionDto>>;

}
