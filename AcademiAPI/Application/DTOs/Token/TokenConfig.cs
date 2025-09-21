﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.Token
{
    public class TokenConfig
    {
        public string Key { get; set; }
        public double Expiration { get; set; }
        public string Issuer { get; set; }
        public string Audience { get; set; }
    }
}
