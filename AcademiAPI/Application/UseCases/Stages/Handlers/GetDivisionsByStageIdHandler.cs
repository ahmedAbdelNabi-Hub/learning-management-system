using Application.DTOs.Stage;
using Application.UseCases.Stages.Queries;
using Domain.Entities;
using Domain.Interfaces.UnitOfWork;
using Domain.Specification.Stages;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.UseCases.Stages.Handlers
{
    public class GetDivisionsByStageIdHandler : IRequestHandler<GetDivisionsByStageIdQuery, List<DivisionDto>>
    {
        private readonly IUnitOfWork _unitOfWork;
        public GetDivisionsByStageIdHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<List<DivisionDto>> Handle(GetDivisionsByStageIdQuery request, CancellationToken cancellationToken)
        {
            var spec = new DivisionSpecification(request.StageId);
            return await _unitOfWork.Repository<Division>().GetProjectedAsync(
                selector: d => new DivisionDto
                {
                    Id = d.Id,
                    Name = d.Name,     
                } , spec);
        }
    }

}
