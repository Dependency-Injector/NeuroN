using System;

namespace Api.Model
{
    public class Task
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public DateTime Deadline { get; set; }
    }
}