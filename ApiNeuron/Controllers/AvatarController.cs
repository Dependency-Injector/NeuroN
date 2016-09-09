using System.Collections.Generic;
using ApiNeuron.Models;
using ApiNeuron.Repositories;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace ApiNeuron.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("MyPolicy")]
    public class AvatarController : Controller
    {
        private IRepository<Avatar> avatarRepository;

        public AvatarController(IRepository<Avatar> avatarRepository)
        {
            this.avatarRepository = avatarRepository;
        }
        
        // GET: api/avatars
        [HttpGet]
        public IEnumerable<Avatar> GetAll()
        {
            return avatarRepository.GetAll();
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var avatar = avatarRepository.Get(id);
            if (avatar == null)
            {
                return NotFound();
            }

            return new ObjectResult(avatar);
        }
        
        [HttpPost]
        public IActionResult Create([FromBody]Avatar avatar)
        {
            if (avatar == null)
                return BadRequest();

            Avatar addedAvatar = avatarRepository.Add(avatar);
            return new ObjectResult(addedAvatar);
        }
        
        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody]Avatar avatar)
        {
            if (avatar == null || avatar.Id != id)
                return BadRequest();

            var existingAvatar = avatarRepository.Get(id);
            if (existingAvatar == null)
                return NotFound();

            Avatar updatedAvatar = avatarRepository.Update(avatar);
            return new ObjectResult(updatedAvatar);
        }
        
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            avatarRepository.Remove(id);
        }
    }
}
