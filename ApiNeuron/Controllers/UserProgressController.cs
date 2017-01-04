using System.Collections.Generic;
using ApiNeuron.Models;
using ApiNeuron.Repositories;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace ApiNeuron.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("MyPolicy")]
    public class UserProgressController : Controller
    {
        private IRepository<UserProgress> progressRepository;
        //private ITaskService taskService;
        
        public UserProgressController(IRepository<UserProgress> progressRepository)
        {
            this.progressRepository = progressRepository;
        }
        
        // GET: api/tasks
        [HttpGet]
        public IEnumerable<UserProgress> GetAll()
        {
            return progressRepository.GetAll();
        }
    }
}
