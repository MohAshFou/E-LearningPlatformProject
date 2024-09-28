using EduPlatformAPI.DTO.Teacher;
using EduPlatformAPI.DTO;
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

        [HttpGet("GetLevelsWithLessonCount")]
        public IActionResult GetLevelsWithLessonCount()
        {

            var levelsWithLessonCount = context.Lessons
                .GroupBy(l => l.GradeLevel)
                .Select(g => new LevelAndLessonsInsideDTO
                {
                    GradeLevel = g.Key,
                    NumberOfLessons = g.Count(),
                    //Lessons = g.Select(l => new LessonDTO
                    //{
                       
                    //    LessonId = l.LessonId,
                    //    Title = l.Title,

         
                    //  Description= l.Description, 
                    // UploadDate  =l.UploadDate,
                    // FeeAmount  = l.FeeAmount,

                    //}).ToList()
                })
                .ToList();

            return Ok(levelsWithLessonCount);
        }

        [HttpGet("GetLessonsWithDescriptions")]
        public IActionResult GetLessonsWithDescriptions()
        {
            var lessonsWithDescriptions = context.Lessons
                .Select(l => new LessonDTO
                {
                    LessonId = l.LessonId,
                    Title = l.Title,
                    Description = l.Description,
                    UploadDate = l.UploadDate,
                    FeeAmount = l.FeeAmount
                })
                .ToList();

            return Ok(lessonsWithDescriptions);
        }

        [HttpGet("GetStudentsWithSubmittedHomeworks")]
        public IActionResult GetStudentsWithSubmittedHomeworks()
        {
            var studentsWithSubmittedHomeworks = context.Students
                .Where(s => s.Enrollments.Any(e => e.SubmissionDate != null))
                .Select(s => new StudentSubmissionDTO
                {
                    StudentId = s.StudentId,
                    GradeLevel = s.GradeLevel,
                    Governorate = s.Governorate,
                    ParentPhone = s.ParentPhone,
                    UserName = s.Enrollments.Select(e => e.UserName).FirstOrDefault(),
                    Homeworks = s.Enrollments
                        .Where(e => e.SubmissionDate != null)
                        .Select(e => new HomeworkSubmissionDTO
                        {
                            LessonId = e.LessonId,
                            LessonTitle = e.Lesson.Title,
                            SubmissionDate = e.SubmissionDate.Value,
                            SubmissionLink = e.SubmissionLink ?? "N/A"
                        })
                        .ToList()
                })
                .ToList();

            return Ok(studentsWithSubmittedHomeworks);
        }

        [HttpGet("GetLessonsByGradeLevel/{gradeLevel}")]
        public IActionResult GetLessonsByGradeLevel(string gradeLevel)
        {
            if (string.IsNullOrWhiteSpace(gradeLevel))
            {
                return BadRequest("Grade level cannot be null or empty.");
            }

            var lessons = context.Lessons
                .Where(l => l.GradeLevel.ToLower()==gradeLevel.ToLower())
                .Select(l => new LessonDTO
                {
                    LessonId = l.LessonId,
                    Title = l.Title,
                    Description = l.Description,
                    UploadDate = l.UploadDate,
                    FeeAmount = l.FeeAmount
                })
                .ToList();

            if (!lessons.Any())
            {
                return NotFound($"No lessons found for grade level: {gradeLevel}");
            }

            return Ok(lessons);
        }




    }
}
