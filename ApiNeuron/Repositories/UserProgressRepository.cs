using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using ApiNeuron.Models;

namespace ApiNeuron.Repositories
{
    public class UserProgressRepository : IRepository<UserProgress>
    {
        private readonly NeuronContext context;

        public UserProgressRepository(NeuronContext context)
        {
            this.context = context;
        }

        public IEnumerable<UserProgress> GetAll()
        {
            return context.Progresses.AsEnumerable();
        }

        public UserProgress Get(int id)
        {
            return Get(up => up.Id == id);
        }

        public UserProgress Get(Expression<Func<UserProgress, bool>> predicate)
        {
            return context.Progresses.FirstOrDefault(predicate);
        }

        public UserProgress Add(UserProgress progress)
        {
            context.Progresses.Add(progress);
            context.SaveChanges();
            return progress;
        }

        public UserProgress Update(UserProgress progress)
        {
            var progressToUpdate = Get(progress.Id);
            progressToUpdate.AssociatedEntityId = progress.AssociatedEntityId;
            progressToUpdate.Source = progress.Source;
            progressToUpdate.Occured = progress.Occured;
            progressToUpdate.Xp = progress.Xp;
            context.SaveChanges();
            return progress;
        }

        public UserProgress Remove(int id)
        {
            UserProgress progressToRemove = Get(id);
            if (progressToRemove != null)
            {
                context.Progresses.Remove(progressToRemove);
                context.SaveChanges();
            }

            return progressToRemove;
        }
    }
}
