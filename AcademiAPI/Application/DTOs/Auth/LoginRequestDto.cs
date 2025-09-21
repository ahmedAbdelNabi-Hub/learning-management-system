using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.Auth
{
    public class LoginRequestDto
    {
        public string Server { get; set; } = null!;
        public string? Mode { get; set; } = "SQL"; // SQL, Windows
        public string Username { get; set; } = null!; // SQL login
        public string Password { get; set; } = null!; // SQL login password
        public string Database { get; set; } = null!;
    }
}
