using Azure.Core;
using Microsoft.AspNetCore.Http;

namespace EduPlatformAPI.Services
{
    public class LessonService
    {
        private readonly IWebHostEnvironment env;
        public LessonService(IWebHostEnvironment env)
        {
            this.env = env;
        }

        public string GetVideoURL(HttpContext context,string level, string path)
        {
            string[] validLevels = { "One", "Two", "Three" };

            if (!validLevels.Contains(level) || string.IsNullOrWhiteSpace(path))
            {
                return "";
            }

            var filePath = Path.Combine(env.WebRootPath, "Levels", level, "Video", path);

            if (System.IO.File.Exists(filePath))
            {
                return $"{context.Request.Scheme}://{context.Request.Host}/api/Video/Videos/{level}/{path}";
            }

            return "Video not found";
        }

        public string GetPDFURL(HttpContext context, string level, string path)
        {
            string[] validLevels = { "One", "Two", "Three" };

            if (!validLevels.Contains(level) || string.IsNullOrWhiteSpace(path))
            {
                return "";
            }

            var filePath = Path.Combine(env.WebRootPath, "Levels", level, "PDF", path);

            if (System.IO.File.Exists(filePath))
            {
                return $"{context.Request.Scheme}://{context.Request.Host}/api/Video/PDF/{level}/{path}";
            }

            return "Video not found";
        }














    }
}
