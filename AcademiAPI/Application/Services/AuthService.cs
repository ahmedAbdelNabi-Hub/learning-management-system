using Application.DTOs.Auth;
using Application.Interfaces.InternalServices;
using Application.Interfaces.ExternalServices;
using Domain.Interfaces.UnitOfWork;
using Application.DTOs.Response;

using Domain.Specification;
using Microsoft.EntityFrameworkCore;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
namespace Application.Services
{
    internal class AuthService : IAuthService
    {
        private readonly IJwtService _jwtService;
        private IUnitOfWork _unitOfWork;

        public AuthService(IJwtService jwtService, IUnitOfWork unitOfWork)
        {
            _jwtService = jwtService;
            _unitOfWork = unitOfWork;
        }

        public Task<BaseApiResponse> GetCurrentUserAsync(string guid)
        {
            throw new NotImplementedException();
        }

        public Task<BaseApiResponse> LoginAsync(LoginRequestDto loginRequest)
        {
            throw new NotImplementedException();
        }

        public async Task<BaseApiResponse> LogoutAsync()
        {

            _jwtService.RemoveTokenCookie();
            return await Task.FromResult(new BaseApiResponse
            {
                StatusCode = 200,
                Message = "Logged out successfully"
            });
        }

    }
}
