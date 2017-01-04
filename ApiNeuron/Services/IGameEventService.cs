using ApiNeuron.Common.Enums;
using ApiNeuron.Models;

namespace ApiNeuron.Services
{
    public interface IGameEventService
    {
        GameEvent CreateEvent(EventType type, int? relatedEntityId = null);
        GameEvent CreateTaskCompletedEvent(Task task);
        GameEvent CreateTaskCreatedEvent(Task task);
    }
}
