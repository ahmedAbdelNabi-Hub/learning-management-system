using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.Response
{
    public class BaseApiResponse
    {
        public int StatusCode { get; set; } = 200;
        public string Message { get; set; } = string.Empty;
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
        public object? Data { get; set; }

        public BaseApiResponse(){}
        public BaseApiResponse(int statusCode , string message)
        {
            this.StatusCode = statusCode;
            this.Message = message;
        }
    }
}
