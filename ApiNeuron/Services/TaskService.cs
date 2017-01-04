using System;
using ApiNeuron.Common.Enums;
using ApiNeuron.Models;
using ApiNeuron.Repositories;
using Task = ApiNeuron.Models.Task;

namespace ApiNeuron.Services
{
    public class TaskService : ITaskService
    {
        private IRepository<Task> taskRepository;
        private IRepository<Avatar> avatarRepository;
        private IUserProgressService progressService;
        private IGameEventService eventService;

        public static int MyAvatarId = 2;

        public TaskService(IRepository<Task> taskRepository, IRepository<Avatar> avatarRepository, IUserProgressService progressService, IGameEventService eventService)
        {
            this.taskRepository = taskRepository;
            this.avatarRepository = avatarRepository;
            this.progressService = progressService;
            this.eventService = eventService;
        }

        public Task CreateTask(Task task)
        {
            Task addedTask = taskRepository.Add(task);

            this.eventService.CreateTaskCreatedEvent(addedTask);

            this.progressService.ApplyUserProgress(ProgressSource.TaskCreation, addedTask.Id);
            
            return addedTask;
        }
        
        public void FinishTask(int id)
        {
            // Obtain task, mark as finished and save
            Task finishedTask = taskRepository.Get(id);
            finishedTask.IsFinished = true;
            taskRepository.Update(finishedTask);

            // Save info about task completion
            eventService.CreateTaskCompletedEvent(finishedTask);
            
            // Apply progress for task completion
            progressService.ApplyUserProgress(ProgressSource.TaskCompletion, finishedTask.Id);
        }
    }
}
