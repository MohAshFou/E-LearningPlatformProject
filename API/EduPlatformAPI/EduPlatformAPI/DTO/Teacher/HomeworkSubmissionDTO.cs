namespace EduPlatformAPI.DTO.Teacher
{
    public class HomeworkSubmissionDTO
    {
        public int LessonId { get; set; }
        public string LessonTitle { get; set; }
        public DateOnly SubmissionDate { get; set; }
        public string SubmissionLink { get; set; }
        public string HomeWorkEvaluation { get; set; }
    }
}
