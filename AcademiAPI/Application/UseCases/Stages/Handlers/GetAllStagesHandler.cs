using Application.DTOs.Stage;
using Application.UseCases.Stages.Queries;
using Domain.Entities;
using Domain.Interfaces.UnitOfWork;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.UseCases.Stages.Handlers
{
    public class GetAllStagesHandler : IRequestHandler<GetAllStagesQuery, List<StageDto>>
    {
        private readonly IUnitOfWork _unitOfWork;
        public GetAllStagesHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<List<StageDto>> Handle(GetAllStagesQuery request, CancellationToken cancellationToken)
        {
            return await _unitOfWork.Repository<Stage>().GetProjectedAsync(
                selector: s => new StageDto
                {
                    Id = s.Id,
                    Name = s.Name,
                    DivisionCount = s.Divisions.Count 
                });
        }
    }

}
