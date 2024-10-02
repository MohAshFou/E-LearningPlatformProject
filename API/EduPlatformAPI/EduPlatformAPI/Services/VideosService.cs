using Azure.Core;
using Microsoft.AspNetCore.Http;

namespace EduPlatformAPI.Services
{
    public class VideosService
    {
        private readonly IWebHostEnvironment env;
        public VideosService(IWebHostEnvironment env)
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
    }
}
