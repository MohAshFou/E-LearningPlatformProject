using EduPlatformAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EduPlatformAPI.Controllers
{
    [Authorize(Policy = "AdminOnly")]
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly EduPlatformDbContext context;

        public AdminController(EduPlatformDbContext context)
        {
            this.context = context;
        }

        [HttpGet("Getall")]
        public IActionResult Getall() { 
        
                List<string> users = context.Users.Select(e=> e.Name).ToList();

            if (users == null || users.Count == 0)
            {
                return NotFound("No users found.");
            }

            return Ok(users);
        }
    }
}
