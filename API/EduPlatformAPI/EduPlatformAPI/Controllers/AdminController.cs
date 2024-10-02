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


        // Get unapproved students
        [HttpGet("unapproved")]
        public IActionResult GetUnapprovedStudents()
        {
            var unapprovedStudents = from student in context.Students
                                     join enrollment in context.Enrollments on student.StudentId equals enrollment.StudentId
                                     join lesson in context.Lessons on enrollment.LessonId equals lesson.LessonId
                                     join receipt in context.Receipts on enrollment.ReceiptId equals receipt.ReceiptId
                                     where receipt.AdminReviewed == "n" || receipt.AdminReviewed == "N"
                                     select new
                                     {
                                         student.StudentId,
                                         student.GradeLevel,
                                         lesson.Title,
                                         receipt.ReceiptImageLink
                                     };

            return Ok(unapprovedStudents.ToList());
        }





    }
}
