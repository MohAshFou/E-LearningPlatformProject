using EduPlatformAPI.DTO.Teacher;
using EduPlatformAPI.DTO;
using EduPlatformAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using EduPlatformAPI.Services;

namespace EduPlatformAPI.Controllers
{
    //[Authorize(Policy = "TeacherOnly")]
    [Route("api/[controller]")]
    [ApiController]
    public class TeacherController : ControllerBase
    {
        private readonly EduPlatformDbContext context;
        private readonly VideosService vidSer;
        public TeacherController(EduPlatformDbContext context , VideosService vidSer)
        {
            this.context = context;
            this.vidSer = vidSer;
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
                .Where(s => s.Enrollments.Any(e => e.SubmissionDate != null && e.HomeWorkEvaluation=="pending"))
                .Select(s => new StudentSubmissionDTO
                {
                    StudentId = s.StudentId,
                    GradeLevel = s.GradeLevel,
                    
                   
                    UserName = context.Users.Where(d => d.UserId == s.StudentId).Select(s => s.Name).FirstOrDefault(),
                    Homeworks = s.Enrollments
                        .Where(e => e.SubmissionDate != null)
                        .Select(e => new HomeworkSubmissionDTO
                        {
                            LessonId = e.LessonId,
                            LessonTitle = e.Lesson.Title,
                            HomeWorkEvaluation= e.HomeWorkEvaluation,
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

            var NewLevel = "";
            if (gradeLevel=="F")
                    {
                        NewLevel = "One";
                    }
            else if (gradeLevel=="S") 
                    {
                            NewLevel = "Two";
                     }
             else if (gradeLevel == "T")
                
                    {
                        NewLevel = "Three";
                    }



                    var lessons = context.Lessons
                .Where(l => l.GradeLevel.ToLower()==gradeLevel.ToLower())
                .Select(l => new LessonDTO
                {
                    LessonId = l.LessonId,
                    Title = l.Title,
                    Description = l.Description,
                    VideoURL= vidSer.GetVideoURL( HttpContext  ,NewLevel, context.Materials.Where(s => s.LessonId == l.LessonId && s.MaterialType == "Video").Select(w => w.MaterialLink).FirstOrDefault() ?? ""),
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

        

        [HttpGet("QuestionAndCountOfNotReplyFromTeacher")]
        public IActionResult CountOfQuestionNotReplying()
        {
            var count = context.Comments.Count(i => string.IsNullOrEmpty(i.Reply));
            return Ok(new { Count = count });
        }

        [HttpGet("GradeLevelQuestionsAndReplies")]
        public IActionResult GetGradeLevelQuestionsAndReplies(string gradeLevel)
        {
            var questionsAndReplies = context.StudentComments
                .Where(sc => sc.Student.GradeLevel == gradeLevel)
                .Select(sc => new LessonQuestionReplyDTO
                {
                    StudentName = sc.Student.StudentNavigation.Name,
                    Question = sc.Comment.Question,
                    Reply = sc.Comment.Reply
                })
                .ToList();
            return Ok(questionsAndReplies);
        }


    }
}
