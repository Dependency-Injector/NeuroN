using System;
using ApiNeuron.Common.Enums;

namespace ApiNeuron.Models
{
    public class UserProgress
    {
        public int Id { get; set; }
        public ProgressSource Source { get; set; }

        public decimal Xp { get; set; }

        public decimal XpMultiplier { get; set; }

        public DateTime Occured { get; set; }

        public int? AssociatedEntityId { get; set; }
    }
}
