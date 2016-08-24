using System.Collections.Generic;
using System.Linq;
using ApiNeuron.Models;
using Microsoft.EntityFrameworkCore;
using Task = ApiNeuron.Models.Task;

namespace ApiNeuron.Repositories
{
    public class TaskRepository : ITaskRepository
    {
        private readonly NeuronContext context;
        
        public TaskRepository(NeuronContext context)
        {
            this.context = context;
        }

        public IEnumerable<Task> GetAll()
        {
            return context.Tasks.AsEnumerable();
        }

        public Task Get(int id)
        {
            return context.Tasks.SingleOrDefault(t => t.Id == id);
        }

        public Task Add(Task task)
        {
            context.Tasks.Add(task);
            context.SaveChanges();
            return task;
        }

        public Task Update(Task task)
        {
            context.Tasks.Update(task);
            context.SaveChanges();

            //using (var ctx = new NeuronContext())
            //{
            //    context.Entry(task).State = EntityState.Modified;
            //    context.SaveChanges();
            //}

            return task;
        }

        public Task Remove(int id)
        {
            Task taskToRemove = Get(id);
            if (taskToRemove != null)
            {
                context.Tasks.Remove(taskToRemove);
                context.SaveChanges();
            }

            return taskToRemove;
        }
    }
}
