﻿namespace backend.Models
{
    public class Note: Base.EntityResponse
    {
        public int Id { get; set; }

        public string Title { get; set; } = string.Empty;

        public string? Content { get; set; }
    }
}
