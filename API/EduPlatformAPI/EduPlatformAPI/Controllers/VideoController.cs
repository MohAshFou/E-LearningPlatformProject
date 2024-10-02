using EduPlatformAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using System.Text.Json.Serialization;

namespace EduPlatformAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VideoController : ControllerBase
    {
        private readonly IWebHostEnvironment env;
        private readonly EduPlatformDbContext context;

        public VideoController(IWebHostEnvironment env , EduPlatformDbContext context)
        {
            this.env = env;
            this.context = context;
        }
        [HttpGet("Videos/{level}")]
        public async Task<IActionResult> GetVideos(string level)
        {

          
            var NewLevel = level switch
            {
                "F" => "One",
                "S" => "Two",
                "T" => "Three",
                _ => null
            };
            if (NewLevel == null)
            {
                return BadRequest("Invalid grade level specified.");
            }

            var lessonIDs = await context.Lessons
                                  .Where(s => s.GradeLevel == level)
                                  .Select(s => s.LessonId)
                                  .ToListAsync();

            List<string> paths = new List<string>();
            foreach (var lessonId in lessonIDs)
            {
                var videoLinks = await context.Materials
                    .Where(s => s.MaterialType == "Video" && s.LessonId == lessonId)
                    .Select(w => w.MaterialLink)
                    .ToListAsync();

                foreach (var item in videoLinks)
                {
                    var filePath = Path.Combine(env.WebRootPath, "Levels", NewLevel, "Video", item);

                
                    if (System.IO.File.Exists(filePath))
                    {
                        var videoUrl = $"{Request.Scheme}://{Request.Host}/api/Video/Videos/{NewLevel}/{item}";
                        paths.Add(videoUrl);
                    }
                }
            }

           
            if (!paths.Any())
            {
                return NotFound("No video files found.");
            }

            return Ok(paths);
        }

        [HttpGet("Videos/{level}/{fileName}")]
        public IActionResult GetVideo(string level, string fileName)
        {
            var filePath = Path.Combine(env.WebRootPath, "Levels", level, "Video", fileName);
            if (!System.IO.File.Exists(filePath))
            {
                return NotFound();
            }
            var mimeType = "video/mp4";
            return PhysicalFile(filePath, mimeType);
        }







        [HttpPost("Upload")]
        public async Task<IActionResult> UploadVideo([FromForm] IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }

            var filePath = Path.Combine(env.WebRootPath, "Levels", "One", "Video", file.FileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            return Ok(new { filePath });
        }
    }
}
