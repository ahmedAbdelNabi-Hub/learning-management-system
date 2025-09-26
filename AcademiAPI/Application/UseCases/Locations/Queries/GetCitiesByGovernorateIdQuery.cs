using Application.DTOs.Locations;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.UseCases.Locations.Queries
{
    public record GetCitiesByGovernorateIdQuery(int id) : IRequest<List<CityDto>>;
   
}
