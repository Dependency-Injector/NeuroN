using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Cors;
using Microsoft.AspNet.Mvc;
using Task = Api.Model.Task;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("MyPolicy")]
    public class TasksController : Controller
    {
        private List<Task> tasks = new List<Task>()
        {
                new Task()
                {
                    Id = 0,
                    Title = "Task 1",
                    Deadline = DateTime.Now.AddDays(3)
                },
                new Task()
                {
                    Id = 1,
                    Title = "Task 2",
                    Deadline = DateTime.Now.AddDays(4)
                },
                new Task()
                {
                    Id = 2,
                    Title = "Task 3",
                    Deadline = DateTime.Now.AddDays(5)
                }
            };
    
        // GET: api/tasks
        [HttpGet]
        public JsonResult Get()
        {
            return Json(tasks);
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public Task Get(int id)
        {
            return tasks.Find(t => t.Id == id);
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
