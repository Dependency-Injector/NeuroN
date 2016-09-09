using System.Collections.Generic;
using System.Linq;
using ApiNeuron.Models;

namespace ApiNeuron.Repositories
{
    public class AvatarRepository : IRepository<Avatar>
    {
        private readonly NeuronContext context;
        
        public AvatarRepository(NeuronContext context)
        {
            this.context = context;
        }
        
        public IEnumerable<Avatar> GetAll()
        {
            return context.Avatars.AsEnumerable();
        }

        public Avatar Get(int id)
        {
            return context.Avatars.FirstOrDefault(p => p.Id == id);
        }

        public Avatar Add(Avatar avatar)
        {
            context.Avatars.Add(avatar);
            context.SaveChanges();
            return avatar;
        }

        public Avatar Update(Avatar avatar)
        {
            var avatarToUpdate = Get(avatar.Id);
            avatarToUpdate.Name = avatar.Name;
            avatarToUpdate.Xp = avatar.Xp;
            avatarToUpdate.Level = avatar.Level;
            context.SaveChanges();
            return avatar;
        }

        public Avatar Remove(int id)
        {
            Avatar avatarToRemove = Get(id);
            if (avatarToRemove != null)
            {
                context.Avatars.Remove(avatarToRemove);
                context.SaveChanges();
            }
            return avatarToRemove;
        }
    }
}
