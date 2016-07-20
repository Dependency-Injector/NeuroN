﻿using System.Collections.Generic;
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
                return NotFound();
            }

            return new ObjectResult(task);
        }


        // POST api/tasks
        [HttpPost]
        public IActionResult Create([FromBody]Task task)
        {
            if (task == null)
                return BadRequest();

            Task addedTask = taskRepository.Add(task);
            return new ObjectResult(addedTask); //CreatedAtRoute("Get", new { id = addedTask.Id }, addedTask);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody]Task task)
        {
            if (task == null || task.Id != id)
                return BadRequest();

            var existingTask = taskRepository.Get(id);
            if (existingTask == null)
                return NotFound();

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
