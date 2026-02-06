using System;

namespace Application.Profiles.DTOs;

public class PhotoUploadResult
{
    public string PublicId { get; set; }
    public required string Url { get; set; }
}
