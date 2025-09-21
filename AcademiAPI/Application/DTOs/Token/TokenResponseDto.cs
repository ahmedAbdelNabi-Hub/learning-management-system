﻿using Application.DTOs.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.Token
{
    public class TokenResponseDto 
    {
        public string Token { get; set; }    
        public string RefreshToken { get; set; }    
        public DateTime ExpiresAt { get; set; }
        public IEnumerable<string> Roles { get; set; } = Array.Empty<string>();
    }
}
