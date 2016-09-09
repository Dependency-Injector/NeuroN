using System;
using System.Collections.Generic;
using System.Linq;
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
            return context.Posts.FirstOrDefault(p => p.Id == id);
        }

        public Post Add(Post post)
        {
            context.Posts.Add(post);
            context.SaveChanges();
            return post;
        }

        public Post Update(Post post)
        {
            var postToUpdate = Get(post.Id);
            postToUpdate.Title = post.Title;
            postToUpdate.Content = post.Content;
            postToUpdate.Created = DateTime.Now;
            context.SaveChanges();
            return post;
        }

        public Post Remove(int id)
        {
            Post postToRemove = Get(id);
            if (postToRemove != null)
            {
                context.Posts.Remove(postToRemove);
                context.SaveChanges();
            }
            return postToRemove;
        }
    }
}
