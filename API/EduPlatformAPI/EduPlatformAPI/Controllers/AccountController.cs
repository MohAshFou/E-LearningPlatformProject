using EduPlatformAPI.DTO;
using EduPlatformAPI.DTO.User;
using EduPlatformAPI.Models;
using EduPlatformAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;


namespace EduPlatformAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly AuthService authService;
        private readonly IConfiguration config;

        public AccountController(AuthService _authService, IConfiguration config)
        {
            authService = _authService;
            this.config = config;
        }
        [HttpPost("login")]
        public IActionResult Login([FromBody] UserDTO us) {

            if (ModelState.IsValid) {
                var user = authService.AuthenticateUser(us);
                if (user == null)
                {
                    return Unauthorized();
                }

                var token = GenerateJwtToken(user);

                return Ok(new { token ,user.Role });



            }
            return BadRequest();
        }
        private string GenerateJwtToken(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
            new Claim(JwtRegisteredClaimNames.Sub, user.Name),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
             new Claim(ClaimTypes.Name, user.Name),
            new Claim(ClaimTypes.Role, user.Role)
             };

            var token = new JwtSecurityToken(
                issuer: config["Jwt:Issuer"],
                audience: config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }



        [HttpGet("getuserinfo")]
        [Authorize]
        // extract name and role from token
        public IActionResult GetUserInfo()
        {
            var username = User.Identity.Name;
            var role = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value;

            var userInfo = new UserInfoDto
            {
                Username = username,
                Role = role
            };


            return Ok(userInfo);


        }

    }
   
    }

