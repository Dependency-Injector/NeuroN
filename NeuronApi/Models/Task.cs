using System;

namespace NeuronApi.Models
{
    public class Task
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public DateTime Deadline { get; set; }
        public bool IsFinished { get; set; }
    }
}