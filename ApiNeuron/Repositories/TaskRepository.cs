using System.Collections.Generic;
using System.Linq;
using ApiNeuron.Models;
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
            return context.Tasks.ToList();
        }

        public Task Get(int id)
        {
            return context.Tasks.SingleOrDefault(t => t.Id == id);
        }

        public Task Add(Task task)
        {
            Task addedTask = context.Tasks.Add(task).Entity;
            context.SaveChanges();
            return addedTask;
        }

        public Task Update(Task task)
        {
            Task updatedTask = context.Tasks.Update(task).Entity;
            context.SaveChanges();
            return updatedTask;
        }

        public Task Remove(int id)
        {
            Task taskToRemove = Get(id);
            if (taskToRemove != null)
                context.Tasks.Remove(taskToRemove);

            return taskToRemove;
        }
    }
}
