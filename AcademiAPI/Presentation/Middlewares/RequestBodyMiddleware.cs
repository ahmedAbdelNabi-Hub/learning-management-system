using System.Text;

namespace Presentation.Middlewares
{
    public class RequestBodyMiddleware
    {
        private readonly RequestDelegate _next;

        public RequestBodyMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            context.Request.EnableBuffering();

            using var reader = new StreamReader(
                context.Request.Body,
                encoding: Encoding.UTF8,
                detectEncodingFromByteOrderMarks: false,
                bufferSize: 1024,
                leaveOpen: true);

            var body = await reader.ReadToEndAsync();
            context.Request.Body.Position = 0;
            context.Items["RequestBody"] = body;

            await _next(context);
        }
    }

}
