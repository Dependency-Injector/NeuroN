using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using ApiNeuron.Models;

namespace ApiNeuron.Repositories
{
    public class GameEventRepository : IRepository<GameEvent>
    {
        private readonly NeuronContext context;
        
        public GameEventRepository(NeuronContext context)
        {
            this.context = context;
        }

        public IEnumerable<GameEvent> GetAll()
        {
            return context.Events.AsEnumerable();
        }

        public GameEvent Get(int id)
        {
            return Get(ge => ge.Id == id);
        }

        public GameEvent Get(Expression<Func<GameEvent, bool>> predicate)
        {
            return context.Events.FirstOrDefault(predicate);
        }

        public GameEvent Add(GameEvent @event)
        {
            context.Events.Add(@event);
            context.SaveChanges();
            return @event;
        }

        public GameEvent Update(GameEvent eventToRemove)
        {
            var taskToUpdate = Get(eventToRemove.Id);
            taskToUpdate.Occured = eventToRemove.Occured;
            taskToUpdate.Type = eventToRemove.Type;
            taskToUpdate.RelatedEntityId = eventToRemove.RelatedEntityId;
            taskToUpdate.Text = eventToRemove.Text;

            context.SaveChanges();
            return eventToRemove;
        }

        public GameEvent Remove(int id)
        {
            GameEvent eventToRemove = Get(id);
            if (eventToRemove != null)
            {
                context.Events.Remove(eventToRemove);
                context.SaveChanges();
            }

            return eventToRemove;
        }

        
    }
}
