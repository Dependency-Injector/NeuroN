using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using ApiNeuron.Models;

namespace ApiNeuron.Repositories
{
    public class PostRepository : IRepository<Post>
    {
        private readonly NeuronContext context;
        
        public PostRepository(NeuronContext context)
        {
            this.context = context;
        }
        
        public IEnumerable<Post> GetAll()
        {
            return context.Posts.AsEnumerable();
        }

        public Post Get(int id)
        {
            return Get(p => p.Id == id);
        }

        public Post Add(Post avatar)
        {
            context.Posts.Add(avatar);
            context.SaveChanges();
            return avatar;
        }

        public Post Update(Post avatar)
        {
            var avatarToUpdate = Get(avatar.Id);
            avatarToUpdate.Title = avatar.Title;
            avatarToUpdate.Content = avatar.Content;
            avatarToUpdate.Created = DateTime.Now;
            context.SaveChanges();
            return avatar;
        }

        public Post Remove(int id)
        {
            Post avatarToRemove = Get(id);
            if (avatarToRemove != null)
            {
                context.Posts.Remove(avatarToRemove);
                context.SaveChanges();
            }
            return avatarToRemove;
        }

        public Post Get(Expression<Func<Post, bool>> predicate)
        {
            return context.Posts.FirstOrDefault(predicate);
        }
    }
}
