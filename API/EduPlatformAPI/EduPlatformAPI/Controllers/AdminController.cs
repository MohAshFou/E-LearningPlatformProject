using EduPlatformAPI.Models;
using EduPlatformAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EduPlatformAPI.Controllers
{
    [Authorize(Policy = "AdminOnly")]
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
       
        private readonly EduPlatformDbContext context;
        private readonly GenerateUserAndPass Service;
        public AdminController(EduPlatformDbContext context, GenerateUserAndPass service)
        {
            this.context = context;
            this.Service = service;
        }



        [HttpGet("GengenerateUAndP")]
        public IActionResult GengenerateUAndP()
        {


            var NewUser = Service.GenerateRandomUserAndPassForStuden();

            return Ok(NewUser);
        }




    }
}
