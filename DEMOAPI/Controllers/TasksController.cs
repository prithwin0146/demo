using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using EmployeeApi.Models;

namespace EmployeeApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class TasksController : ControllerBase
    {
        private readonly TaskDbContext _context;

        public TasksController(TaskDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetTasks()
        {
            return Ok(_context.Tasks.ToList());
        }

        [HttpPost]
        public IActionResult CreateTask([FromBody] TodoTask task)
        {
            if (string.IsNullOrWhiteSpace(task.Title))
                return BadRequest("Task title is required");

            task.CreatedAt = DateTime.Now;
            _context.Tasks.Add(task);
            _context.SaveChanges();

            return Ok(task);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateTask(int id, [FromBody] TodoTask updatedTask)
        {
            var task = _context.Tasks.Find(id);
            if (task == null) return NotFound("Task not found");

            task.Title = updatedTask.Title;
            task.Description = updatedTask.Description;
            _context.SaveChanges();

            return Ok(task);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteTask(int id)
        {
            var task = _context.Tasks.Find(id);
            if (task == null) return NotFound("Task not found");

            _context.Tasks.Remove(task);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
