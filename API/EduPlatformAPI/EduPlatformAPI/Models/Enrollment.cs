﻿using System;
using System.Collections.Generic;

namespace EduPlatformAPI.Models;

public partial class Enrollment
{
    public int EnrollmentId { get; set; }

    public int LessonId { get; set; }

    public int StudentId { get; set; }

    public int ReceiptId { get; set; }

    public DateOnly AccessStartDate { get; set; }

    public DateOnly AccessEndDate { get; set; }

    public DateOnly? SubmissionDate { get; set; }

    public string? SubmissionLink { get; set; }

    public string? HomeWorkEvaluation { get; set; }

    public string UserName { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string ReceiptStatus { get; set; } = null!;

    public virtual Lesson Lesson { get; set; } = null!;

    public virtual Receipt Receipt { get; set; } = null!;

    public virtual Student Student { get; set; } = null!;
}