using EduPlatformAPI.DTO.Teacher;
using EduPlatformAPI.DTO.User;
using EduPlatformAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace EduPlatformAPI.Controllers
{
   // [Authorize(Policy = "StudentOnly")]
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly EduPlatformDbContext context;
        private readonly TeacherController te;
       

        public StudentController(EduPlatformDbContext context , TeacherController te  )
        {
            this.context = context;
            this.te = te;
           
        }

        
        [HttpGet("GetStudentINfo")]
        public IActionResult GetStudentINfo()
        {
            var username = User.Identity.Name;
            var ID = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
             var newID= int.Parse(ID);
            var student = context.Students.FirstOrDefault(s=>s.StudentId== newID);

            var gradelevel = student.GradeLevel;

            var less= te.GetLessonsByGradeLevel(gradelevel);
              

            return Ok(new { username, ID  , gradelevel , less });


        }

       
    }
}
