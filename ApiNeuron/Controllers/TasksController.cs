using System.Collections.Generic;
using ApiNeuron.Repositories;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Task = ApiNeuron.Models.Task;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace ApiNeuron.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("MyPolicy")]
    public class TasksController : Controller
    {
        private IRepository<Task> taskRepository;

        public TasksController(IRepository<Task> taskRepository)
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
                return NotFound();
            }

            return new ObjectResult(task);
        }

        [HttpGet("{id}")]
        public IActionResult Search(string searchTerm)
        {
            return NotFound();
            /*if (string.IsNullOrEmpty(searchTerm))
                return BadRequest("No search term");

            var task = taskRepository.Get(id);
            if (task == null)
            {
                return NotFound();
            }

            return new ObjectResult(task);*/
        }
        
        [HttpPost]
        public IActionResult Create([FromBody]Task task)
        {
            if (task == null)
                return BadRequest();

            Task addedTask = taskRepository.Add(task);
            return new ObjectResult(addedTask);
        }
        
        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody]Task task)
        {
            if (task == null || task.Id != id)
                return BadRequest();

            var existingTask = taskRepository.Get(id);
            if (existingTask == null)
                return NotFound();

            Task updatedTask = taskRepository.Update(task);
            return new ObjectResult(updatedTask);
        }
        
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            taskRepository.Remove(id);
        }
        
        [HttpPut("FinishTask/{id}")]
        public IActionResult FinishTask(int id)
        {
            Task finishedTask = taskRepository.Get(id);
            if (finishedTask == null)
                return NotFound();

            finishedTask.IsFinished = true;
            taskRepository.Update(finishedTask);
            return new ObjectResult(finishedTask);
        }
    }
}
