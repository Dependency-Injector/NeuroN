using System;
using System.ComponentModel.DataAnnotations;

namespace ApiNeuron.Models
{
    public class Notification
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public string Type { get; set; }
        public DateTime Date { get; set; }
    }
}