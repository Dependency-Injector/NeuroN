using System;
using ApiNeuron.Common.Enums;
using ApiNeuron.Models;
using ApiNeuron.Repositories;

namespace ApiNeuron.Services
{
    public class GameEventService : IGameEventService
    {
        private IRepository<GameEvent> eventRepository;

        public GameEventService(IRepository<GameEvent> eventRepository)
        {
            this.eventRepository = eventRepository;
        }

        public GameEvent CreateTaskCompletedEvent(Task task)
        {
            GameEvent evt = CreateNewEvent();
            evt.Type = EventType.TaskCompleted;
            evt.RelatedEntityId = task.Id;

            this.eventRepository.Add(evt);

            return evt;
        }

        public GameEvent CreateTaskCreatedEvent(Task task)
        {
            GameEvent evt = CreateNewEvent();
            evt.Type = EventType.TaskCreated;
            evt.RelatedEntityId = task.Id;

            this.eventRepository.Add(evt);

            return evt;
        }

        public GameEvent CreateEvent(EventType type, int? relatedEntityId = null)
        {
            GameEvent evt = new GameEvent();
            evt.Occured = DateTime.Now;
            evt.Type = type;
            evt.RelatedEntityId = relatedEntityId;
            return evt;
        }

        // Creates basic event object and fills with default data
        private GameEvent CreateNewEvent()
        {
            GameEvent evt = new GameEvent();
            evt.Occured = DateTime.Now;
            return evt;
        }
    }
}
