using Application.DTOs.Auth;
using Application.DTOs.Response;
using Domain.Entities;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces.InternalServices
{
    public interface IAuthService
    {
        Task<BaseApiResponse> LoginAsync(LoginRequestDto loginRequest);
        Task<BaseApiResponse> GetCurrentUserAsync(string guid);
        Task<BaseApiResponse> LogoutAsync();  

    }
}
