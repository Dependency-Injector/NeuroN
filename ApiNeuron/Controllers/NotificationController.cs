using System.Collections.Generic;
using ApiNeuron.Models;
using ApiNeuron.Repositories;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace ApiNeuron.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("MyPolicy")]
    public class NotificationController : Controller
    {
        private IRepository<Notification> notificationRepository;

        public NotificationController(IRepository<Notification> notificationRepository)
        {
            this.notificationRepository = notificationRepository;
        }
        
        // GET: api/notifications
        [HttpGet]
        public IEnumerable<Notification> GetAll()
        {
            return notificationRepository.GetAll();
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var notification = notificationRepository.Get(id);
            if (notification == null)
            {
                return NotFound();
            }

            return new ObjectResult(notification);
        }
        
        [HttpPost]
        public IActionResult Create([FromBody]Notification notification)
        {
            if (notification == null)
                return BadRequest();

            Notification addedNotification = notificationRepository.Add(notification);
            return new ObjectResult(addedNotification);
        }
        
        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody]Notification notification)
        {
            if (notification == null || notification.Id != id)
                return BadRequest();

            var existingNotification = notificationRepository.Get(id);
            if (existingNotification == null)
                return NotFound();

            Notification updatedNotification = notificationRepository.Update(notification);
            return new ObjectResult(updatedNotification);
        }
        
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            notificationRepository.Remove(id);
        }
    }
}
