using System.Collections.Generic;
using Task = NeuronApi.Models.Task;

namespace NeuronApi.Repositories
{
    public interface ITaskRepository
    {
        IEnumerable<Task> GetAll();
        Task Get(int id);
        void Add(Task task);
        void Update(Task task);
        Task Remove(int id);        
    }
}
