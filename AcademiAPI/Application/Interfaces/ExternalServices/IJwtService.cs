using Application.DTOs.Auth;
using Application.DTOs.Token;
using Domain.Entities;
using Domain.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces.ExternalServices
{
    public interface IJwtService 
    {
        Task<TokenResponseDto> CreateJwtToken(AppUser user);  
        string GenerateRefreshToken();
        void RemoveTokenCookie();

    }
}
