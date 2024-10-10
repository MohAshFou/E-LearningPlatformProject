using EduPlatformAPI.DTO.Admin;
using EduPlatformAPI.Models;
using EduPlatformAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;

namespace EduPlatformAPI.Controllers
{
   // [Authorize(Policy = "AdminOnly")]
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
       
        private readonly EduPlatformDbContext context;
        private readonly GenerateUserAndPass Service;
        private readonly LessonService vidSer;
        public AdminController(EduPlatformDbContext context, GenerateUserAndPass service , LessonService vidSer)
        {
            this.context = context;
            this.Service = service;
            this.vidSer= vidSer;
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
                                     join user in context.Users on student.StudentId equals user.UserId
                                     join lesson in context.Lessons on enrollment.LessonId equals lesson.LessonId
                                     join receipt in context.Receipts on enrollment.ReceiptId equals receipt.ReceiptId
                                     where receipt.AdminReviewed == "n" || receipt.AdminReviewed == "N"
                                     select new
                                     {
                                         UserName = user.Name,
                                         ReceiptId = receipt.ReceiptId,
                                         GradeLevel = student.GradeLevel,
                                         LessonTitle = lesson.Title,
                                         ReceiptImageLink = receipt.ReceiptImageLink,
                                         EnrollmentId = enrollment.EnrollmentId
                                     };

            var unapprovedStudentsList = unapprovedStudents.ToList();

            var result = unapprovedStudentsList.Select(x => new UnapprovedStudentsDTO
            {
                Name = x.UserName,
                ReceiptId = x.ReceiptId,
                GradeLevel = x.GradeLevel,
                Title = x.LessonTitle,
                ReceiptImageLink = vidSer.GetMediaURL(HttpContext, newlevel(x.GradeLevel), "ReceiptImages", x.ReceiptImageLink),
                EnrollmentID = x.EnrollmentId
            }).ToList();

            return Ok(result);
        }


        [HttpGet("UpdateRecepit")]
        public IActionResult UpdateRecepit(int EnrollmentID, int ReceiptId, string state) {
            var rec = context.Receipts.FirstOrDefault(i => i.ReceiptId == ReceiptId);
            if (rec == null) {

                return BadRequest();
            }
            var enr = context.Enrollments.FirstOrDefault(i => i.EnrollmentId == EnrollmentID && i.ReceiptId==ReceiptId);
            if (enr == null) {
                return BadRequest();
            }
            if (!(state== "accept"|| state == "reject"))
            {
                return BadRequest();
            }
            rec.AdminReviewed = "Y";
            enr.ReceiptStatus = state;
            context.SaveChanges();
            return Ok();
        }


        private string newlevel(string gradeLevel) {

            var NewLevel = gradeLevel switch
            {
                "F" or "f" => "One",
                "S" or "s" => "Two",
                "T" or "t" => "Three",
                _ => ""
            };

            return NewLevel;


        }




    }
}
