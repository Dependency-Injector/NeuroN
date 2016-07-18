using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using ApiNeuron.Models;
using Task = ApiNeuron.Models.Task;

namespace ApiNeuron.Repositories
{
    public class TaskRepository : ITaskRepository
    {
        private readonly NeuronContext context;

        private static ConcurrentDictionary<int, Task> tasks = new ConcurrentDictionary<int, Task>();
        private int maxId = 0;

        public TaskRepository(NeuronContext context)
        {
            this.context = context;

            /*for(int i = 0 ; i < new Random(666).Next(5, 15) ; i++)
            {
                var newTask = new Task()
                {
                    Id = maxId,
                    Title = "Task " + i,
                    Deadline = DateTime.Now.AddDays(i),
                    IsFinished = false
                };

                maxId++;

                Add(newTask);
            }*/
        }

        public IEnumerable<Task> GetAll()
        {
            return context.Tasks.ToList();
            //return tasks.Values;
        }

        public Task Get(int id)
        {
            Task task;
            tasks.TryGetValue(id, out task);
            return task;
        }

        public void Add(Task task)
        {
            task.Id = maxId++;
            tasks[task.Id] = task;
        }

        public void Update(Task task)
        {
            tasks[task.Id] = task;
        }

        public Task Remove(int id)
        {
            Task task;
            tasks.TryGetValue(id, out task);
            tasks.TryRemove(id, out task);
            return task;
        }
    }
}
