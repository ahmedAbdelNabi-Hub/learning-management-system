using Microsoft.AspNetCore.Mvc;
using Application.DTOs.Auth;
using Application.Interfaces.InternalServices;
using Infrastructure.Contexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

using System.Security.Claims;
using Application.DTOs.Response;

using System.ComponentModel.DataAnnotations.Schema;



namespace Presentation.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        public AuthController(IAuthService authService)
        {
            _authService = authService;

        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDto request)
        {
            var response = await _authService.LoginAsync(request);
            return StatusCode(response.StatusCode, response);
        }

        [Authorize]
        [HttpGet]
        [Route("current-user")]
        public async Task<IActionResult> GetCurrentUser()
        {
            var guid = User?.FindFirstValue(ClaimTypes.NameIdentifier);

            var response = await _authService.GetCurrentUserAsync(guid!.ToString());
            return StatusCode(response.StatusCode, response);
        }

        [Authorize]
        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            var response = await _authService.LogoutAsync();
            return StatusCode(response.StatusCode, response);
        }


    }
}