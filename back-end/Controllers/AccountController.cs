using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using FS_React_Net.Services;
using FS_React_Net.ViewModels;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ActionConstraints;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.IdentityModel.Tokens;

namespace FS_React_Net.Controllers
{
    [ApiController]
    [Route("[Controller]")]
    public class AccountController : ControllerBase
    {
        private readonly IAuthenticate _authenticate;
        private readonly IConfiguration _config;

        public AccountController(IAuthenticate authenticate, IConfiguration config)
        {
            _authenticate = authenticate;
            _config = config;
        }

        [HttpPost("RegisterUser")]
        public async Task<IActionResult> RegisterUser([FromBody] RegisterModel registerModel)
        {
            if (registerModel.Password != registerModel.ConfirmPassword)
            {
                return BadRequest("Divergent passwords");
            }

            var response = await _authenticate.RegisterUser(registerModel.Email, registerModel.Password);

            if (response)
            {
                return Ok($"User {registerModel.Email} created");
            }
            return BadRequest("Invalid register");
        }

        [HttpPost("AuthenticateUser")]
        public async Task<IActionResult> AuthenticateUser([FromBody] LoginModel loginModel)
        {
            var response = await _authenticate.AuthenticateUser(loginModel.Email, loginModel.Password);

            if (response)
            {
                var token = GenerateToken(loginModel.Email);
                return Ok(token);
            }
            return BadRequest("Invalid login attempt");
        }

        [HttpPost("Logout")]
        public async Task<IActionResult> Logout()
        {
            await _authenticate.Logout();
            return Ok();
        }

        private UserToken GenerateToken(string email)
        {
            var jwtConfig = _config.GetSection("JwtConfig");
            var key = Encoding.ASCII.GetBytes(jwtConfig["Key"]);
            var credentials = new SigningCredentials(
                new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha256
            );
            var claims = new[]
            {
                new Claim("email", email),
                new Claim(JwtRegisteredClaimNames.Sub, email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };
            var token = new JwtSecurityToken(
                issuer: jwtConfig["Issuer"],
                audience: jwtConfig["Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(2),
                signingCredentials: credentials
            ); 

            return new UserToken()
            {
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                Expiration = DateTime.UtcNow.AddHours(2)
            };
        }
    }
}