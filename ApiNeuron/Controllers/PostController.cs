﻿using System.Collections.Generic;
using ApiNeuron.Models;
using ApiNeuron.Repositories;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace ApiNeuron.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("MyPolicy")]
    public class PostController : Controller
    {
        private IRepository<Post> postRepository;

        public PostController(IRepository<Post> postRepository)
        {
            this.postRepository = postRepository;
        }
        
        // GET: api/posts
        [HttpGet]
        public IEnumerable<Post> GetAll()
        {
            return postRepository.GetAll();
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var post = postRepository.Get(id);
            if (post == null)
            {
                return NotFound();
            }

            return new ObjectResult(post);
        }
        
        [HttpPost]
        public IActionResult Create([FromBody]Post post)
        {
            if (post == null)
                return BadRequest();

            Post addedPost = postRepository.Add(post);
            return new ObjectResult(addedPost);
        }
        
        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody]Post post)
        {
            if (post == null || post.Id != id)
                return BadRequest();

            var existingPost = postRepository.Get(id);
            if (existingPost == null)
                return NotFound();

            Post updatedPost = postRepository.Update(post);
            return new ObjectResult(updatedPost);
        }
        
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            postRepository.Remove(id);
        }
    }
}
