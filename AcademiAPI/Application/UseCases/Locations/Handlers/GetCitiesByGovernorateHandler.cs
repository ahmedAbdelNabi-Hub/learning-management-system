using Application.DTOs.Locations;
using Application.UseCases.Locations.Queries;
using Domain.Entities.Identity;
using Domain.Interfaces.UnitOfWork;
using Domain.Specification.Location;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.UseCases.Locations.Handlers
{
    public class GetCitiesByGovernorateHandler : IRequestHandler<GetCitiesByGovernorateIdQuery , List<CityDto>>
    {
        private readonly IUnitOfWork _unitOfWork;
        public GetCitiesByGovernorateHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<List<CityDto>> Handle(GetCitiesByGovernorateIdQuery request, CancellationToken cancellationToken)
        {
            var spec = new CitiesSpecification(request.id);
            var cities = await _unitOfWork.Repository<City>().GetProjectedAsync(selector:c=>new CityDto
            {
                Id = c.Id,
                NameAr = c.CityNameAr
            },spec); 
            return cities;
        }
    }
}
