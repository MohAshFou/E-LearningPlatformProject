namespace EduPlatformAPI.DTO.Admin
{
    public class UnapprovedStudentsDTO
    {      
       public string Name             {set; get; }
       public int    ReceiptId        {set; get; }
       public string GradeLevel       {set; get; }
       public string Title            {set; get; }
       public int EnrollmentID { set; get; }
      
       public string ReceiptImageLink { set; get; }

    }
}
