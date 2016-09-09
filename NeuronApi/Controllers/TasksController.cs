using System.Collections.Generic;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using NeuronApi.Repositories;
using Task = NeuronApi.Models.Task;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace NeuronApi.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("MyPolicy")]
    public class TasksController : Controller
    {
        private ITaskRepository taskRepository;

        public TasksController(ITaskRepository taskRepository)
        {
            this.taskRepository = taskRepository;
        }
        
        // GET: api/tasks
        [HttpGet]
        public IEnumerable<Task> GetAll()
        {
            return taskRepository.GetAll();
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var task = taskRepository.Get(id);
            if (task == null)
            {
                return HttpNotFound();
            }

            return new ObjectResult(task);
        }


        // POST api/values
        [HttpPost]
        public IActionResult Create([FromBody]Task task)
        {
            if (task == null)
                return HttpBadRequest();

            taskRepository.Add(task);
            return CreatedAtRoute("Get", new { id = task.Id }, task);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody]Task task)
        {
            if (task == null || task.Id != id)
                return HttpBadRequest();

            var existingTask = taskRepository.Get(id);
            if (existingTask == null)
                return HttpNotFound();

            taskRepository.Update(task);
            return new NoContentResult();
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            taskRepository.Remove(id);
        }
    }
}
