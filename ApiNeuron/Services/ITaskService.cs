using ApiNeuron.Models;

namespace ApiNeuron.Services
{
    public interface ITaskService
    {
        Task CreateTask(Task task);
        void FinishTask(int id);
    }
}
