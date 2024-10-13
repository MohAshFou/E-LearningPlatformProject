namespace EduPlatformAPI.DTO.Student
{
    public class ShowStudentLessonsDTO
    {
        public int LessonId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public decimal FeeAmount { get; set; }
        public string GradeLevel { get; set; }
        public string HomeworkUrl { get; set; }
        public string PdfUrl { get; set; }
        public string VideoUrl { get; set; }
        public DateOnly UploadDate { get; set; }
        public string HomeWorkEvaluation { get; set; }
    }
}
