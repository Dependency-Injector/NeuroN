using System;
using ApiNeuron.Common.Enums;

namespace ApiNeuron.Models
{
    public class GameEvent
    {
        public int Id { get; set; }
        public DateTime Occured { get; set; }
        public EventType Type { get; set; }
        public int? RelatedEntityId { get; set; }
        public string Text { get; set; }
        
        //public UserProgress Progress { get; set; }
    }
}
