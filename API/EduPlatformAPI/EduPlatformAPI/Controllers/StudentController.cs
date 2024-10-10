using EduPlatformAPI.DTO;
using EduPlatformAPI.DTO.Teacher;
using EduPlatformAPI.DTO.User;
using EduPlatformAPI.Models;
using EduPlatformAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace EduPlatformAPI.Controllers
{
   [Authorize(Policy = "StudentOnly")]
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly EduPlatformDbContext context;
        private readonly LessonService vidSer;
        private readonly MediaController videos;


        public StudentController(EduPlatformDbContext context, LessonService vidSer )
        {
            this.context = context;
            this.vidSer = vidSer;
           
        }


        [HttpGet("GetStudentInfo")]
        public IActionResult GetStudentInfo()
        {
            var username = User.Identity.Name;
            var id = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrWhiteSpace(id) || !int.TryParse(id, out var newID))
            {
                return BadRequest("Invalid student ID.");
            }

            var student = context.Students.FirstOrDefault(s => s.StudentId == newID);

            if (student == null)
            {
                return NotFound("Student not found.");
            }
             
            var gradeLevel = student.GradeLevel;
            var lessons = GetLessonsByGradeLevel(gradeLevel , int.Parse(id)) as OkObjectResult;

            if (lessons == null || lessons.Value == null)
            {
                return NotFound("No lessons found for the student's grade level.");
            }

            return Ok(new
            {
                StudentInfo = new
                {
                    username,
                    id = newID,
                    gradeLevel
                },
                lessons = lessons.Value 
            });
        }


        [HttpGet("GetLessonsByGradeLevel/{gradeLevel}")]
        public IActionResult GetLessonsByGradeLevel(string gradeLevel, int id)
        {
            if (string.IsNullOrWhiteSpace(gradeLevel))
            {
                return BadRequest("Grade level cannot be null or empty.");
            }

            var NewLevel = gradeLevel switch
            {
                "F" or "f" => "One",
                "S" or "s" => "Two",
                "T" or "t" => "Three",
                _ => null
            };

            var lessons = context.Lessons
                .Where(l => l.GradeLevel.ToLower() == gradeLevel.ToLower())
                .Select(l => new
                {
                    l.LessonId,
                    l.Title, 
                    l.AccessPeriod
                    ,
                    l.Description,
                    VideoURL = vidSer.GetMediaURL(HttpContext, NewLevel, "Video",
                        context.Materials.Where(s => s.LessonId == l.LessonId && s.MaterialType == "Video")
                        .Select(w => w.MaterialLink)
                        .FirstOrDefault() ?? ""),
                    PDFURL = vidSer.GetMediaURL(HttpContext, NewLevel, "PDF",
                        context.Materials.Where(s => s.LessonId == l.LessonId && s.MaterialType == "PDF" && s.Name == "")

                        .Select(w => w.MaterialLink)
                        .FirstOrDefault() ?? ""),
                    homeworkURL = vidSer.GetMediaURL(HttpContext, NewLevel, "PDF", context.Materials.Where(s => s.LessonId == l.LessonId && s.MaterialType == "PDF" && s.Name == "Homework").Select(w => w.MaterialLink).FirstOrDefault() ?? ""),

                    l.UploadDate,
                    l.FeeAmount
                })
                .ToList();

            if (!lessons.Any())
            {
                return NotFound($"No lessons found for grade level: {gradeLevel}");
            }

          
            var lessonDTOs = lessons.Select(l => new LessonDTO
            {
                LessonId = l.LessonId,
                Title = l.Title,
                Description = l.Description,
                VideoURL = l.VideoURL,
                PDFURL = l.PDFURL,
                hasVideoAccess = HasVideoAccess(id, l.LessonId),
                UploadDate = l.UploadDate,
                FeeAmount = l.FeeAmount ,
                AccessPeriod=l.AccessPeriod,
                homeworkURL= l.homeworkURL
            }).ToList();

            return Ok(lessonDTOs);
        }

        private string HasVideoAccess(int studentID, int lessonID)
        {
            var enrollment = context.Enrollments.FirstOrDefault(e => e.LessonId == lessonID && e.StudentId == studentID);
            var currentDate = DateOnly.FromDateTime(DateTime.Now);

            if (enrollment == null || enrollment.AccessEndDate < currentDate)
            {
                return "NO";
            }

            if (enrollment.ReceiptStatus == "Pending")
            {
                return "Pending";
            }

            if (enrollment.AccessEndDate >= currentDate)
            {
                return "Yes";
            }

            return "NO"; 
        }


    }


}
