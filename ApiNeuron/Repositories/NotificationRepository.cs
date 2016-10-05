using System;
using System.Collections.Generic;
using System.Linq;
using ApiNeuron.Models;

namespace ApiNeuron.Repositories
{
    public class NotificationRepository : IRepository<Notification>
    {
        private readonly NeuronContext context;
        
        public NotificationRepository(NeuronContext context)
        {
            this.context = context;
        }
        
        public IEnumerable<Notification> GetAll()
        {
            return context.Notifications.AsEnumerable();
        }

        public Notification Get(int id)
        {
            return context.Notifications.FirstOrDefault(p => p.Id == id);
        }

        public Notification Add(Notification notification)
        {
            context.Notifications.Add(notification);
            context.SaveChanges();
            return notification;
        }

        public Notification Update(Notification notification)
        {
            var notificationToUpdate = Get(notification.Id);
            notificationToUpdate.Text = notification.Text;
            notificationToUpdate.Type = notification.Type;
            notificationToUpdate.Date = DateTime.Now;
            context.SaveChanges();
            return notification;
        }

        public Notification Remove(int id)
        {
            Notification notificationToRemove = Get(id);
            if (notificationToRemove != null)
            {
                context.Notifications.Remove(notificationToRemove);
                context.SaveChanges();
            }
            return notificationToRemove;
        }
    }
}
