using EduPlatformAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EduPlatformAPI.Controllers
{
    [Authorize(Policy = "StudentOnly")]
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly EduPlatformDbContext context;

        public StudentController(EduPlatformDbContext context)
        {
            this.context = context;
        }




       
    }
}
