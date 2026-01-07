using Microsoft.AspNetCore.Mvc;
using EmployeeApi.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace EmployeeApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly TaskDbContext _context;
        private readonly IConfiguration _config;

        public UsersController(TaskDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        // REGISTER
        [HttpPost("register")]
        public IActionResult Register([FromBody] User user)
        {
            if (string.IsNullOrWhiteSpace(user.Username) ||
                string.IsNullOrWhiteSpace(user.Email) ||
                string.IsNullOrWhiteSpace(user.Password))
                return BadRequest("All fields are required.");

            if (_context.Users.Any(x => x.Email == user.Email))
                return BadRequest("Email already exists.");

            _context.Users.Add(user);
            _context.SaveChanges();

            return Ok("Registered!");
        }

        // LOGIN
        [HttpPost("login")]
        public IActionResult Login([FromBody] User login)
        {
            var user = _context.Users.FirstOrDefault(x =>
                x.Email == login.Email && x.Password == login.Password);

            if (user == null)
                return Unauthorized("Invalid credentials");

            var token = GenerateJwtToken(user);

            return Ok(new { token });
        }

        private string GenerateJwtToken(User user)
        {
            var key = Encoding.UTF8.GetBytes(_config["Jwt:Key"]);
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Name, user.Username)
            };

            var creds = new SigningCredentials(
                new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
