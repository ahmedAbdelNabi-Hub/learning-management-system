using Application.DTOs.Locations;
using Application.UseCases.Locations.Queries;
using Domain.Entities.Identity;
using Domain.Interfaces.UnitOfWork;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.UseCases.Locations.Handlers
{
    public class GetAllGovernoratesHandler : IRequestHandler<GetAllGovernoratesQuery, List<GovernorateDto>>
    {
        private readonly IUnitOfWork _unitOfWork;
        public GetAllGovernoratesHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<List<GovernorateDto>> Handle(GetAllGovernoratesQuery request, CancellationToken cancellationToken)
        {
            var governorates = await _unitOfWork.Repository<Governorate>().GetProjectedAsync(selector:g=>new GovernorateDto
            {
                Id = g.Id,
                NameAr = g.GovernorateNameAr,
                Count = g.Cities.Count,
            });
            return governorates;
        }
    }
}
