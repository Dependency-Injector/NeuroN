using Microsoft.EntityFrameworkCore;

namespace ApiNeuron.Models
{
    public class NeuronContext : DbContext
    {
        public NeuronContext(DbContextOptions<NeuronContext> options) : base(options)
        {
        }

        public DbSet<Task> Tasks { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Avatar> Avatars { get; set; }
        public DbSet<Notification> Notifications { get; set; }
    }
}
