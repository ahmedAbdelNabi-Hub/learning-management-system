using Application.DTOs.Auth;
using Application.DTOs.Token;
using Application.Interfaces.ExternalServices;
using Domain.Entities;
using Domain.Entities.Identity;
using Infrastructure.Contexts;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace Infrastructure.Services
{
    public class JwtService : IJwtService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly TokenConfig _tokenConfig;
        private readonly UserManager<AppUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public JwtService(IHttpContextAccessor httpContextAccessor,IOptions<TokenConfig> tokenOptions ,UserManager<AppUser> userManager ,RoleManager<IdentityRole> roleManager )
        {
            _httpContextAccessor = httpContextAccessor;
            _tokenConfig = tokenOptions?.Value!;
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public async Task<TokenResponseDto> CreateJwtToken(AppUser user)
        {
            var claims = await setClaims(user);
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_tokenConfig.Key));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var expiration = DateTime.UtcNow.AddHours(_tokenConfig.Expiration);

            var token = new JwtSecurityToken(
                issuer: _tokenConfig.Issuer,
                audience: _tokenConfig.Audience,
                claims: claims,
                expires: expiration,
                signingCredentials: creds
            );

            var jwtToken = new JwtSecurityTokenHandler().WriteToken(token);
            var refreshToken = GenerateRefreshToken();

            SetTokenCookie(jwtToken, expiration);
            var roles = await _userManager.GetRolesAsync(user);

            return new TokenResponseDto
            {
                Token = jwtToken,
                RefreshToken = refreshToken,
                ExpiresAt = expiration,
                Roles = roles
            };
        }

        public string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
        }

        #region Private Helpers

        private void SetTokenCookie(string token, DateTime expires)
        {
            _httpContextAccessor.HttpContext?.Response.Cookies.Append("jwt", token, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Expires = DateTimeOffset.UtcNow.AddHours(100),
                Path = "/"
            });

        }

        public void RemoveTokenCookie()
        {
            _httpContextAccessor.HttpContext?.Response.Cookies.Append("jwt", "", new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Expires = DateTimeOffset.UtcNow.AddDays(-1),
                Path = "/"
            });
        }
        private async Task<List<Claim>> setClaims(AppUser user)
        {
            var userClaims = await _userManager.GetClaimsAsync(user);
            var userRoles = await _userManager.GetRolesAsync(user);
            var roleClaims = new List<Claim>();

            foreach (var role in userRoles)
            {
                var roleClaim = new Claim(ClaimTypes.Role, role);
                roleClaims.Add(roleClaim);
            }

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.Email, user.Email!),
                new Claim(ClaimTypes.NameIdentifier, user.Id!),
                new Claim(ClaimTypes.Name,user.UserName!)
            };

            claims.AddRange(userClaims);
            claims.AddRange(roleClaims);

            return claims;
        }


        #endregion
    }
}
