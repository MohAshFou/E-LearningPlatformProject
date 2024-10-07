namespace EduPlatformAPI.DTO
{
    public class LessonDTO
    {
        public int LessonId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string? VideoURL { get; set; }
        public DateOnly UploadDate { get; set; }
        public decimal FeeAmount { get; set; }

    }
}
