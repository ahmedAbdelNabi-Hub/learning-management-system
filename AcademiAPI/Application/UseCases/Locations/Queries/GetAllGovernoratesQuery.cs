using Application.DTOs.Locations;
using Azure.Core;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.UseCases.Locations.Queries
{
    public record GetAllGovernoratesQuery() : IRequest<List<GovernorateDto>>;


}
