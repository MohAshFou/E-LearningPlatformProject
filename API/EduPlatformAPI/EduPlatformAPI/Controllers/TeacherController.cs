using EduPlatformAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EduPlatformAPI.Controllers
{
    //[Authorize(Policy = "TeacherOnly")]
    [Route("api/[controller]")]
    [ApiController]
    public class TeacherController : ControllerBase
    {
        private readonly EduPlatformDbContext context;

        public TeacherController(EduPlatformDbContext context)
        {
            this.context = context;
        }




    }
}
