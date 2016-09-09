using Microsoft.EntityFrameworkCore;

namespace NeuronApi.Models
{
    public class NeuronContext : DbContext
    {
        public NeuronContext(DbContextOptions<NeuronContext> options) : base(options)
        {
        }

        public DbSet<Task> Tasks { get; set; }
        
    }
}
