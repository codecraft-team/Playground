using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;

namespace FileUpload.Controllers {
  public class CustomFileResult : IActionResult {
    private readonly int _bufferSize;
    private readonly string _contentType;
    private readonly string _fileDownloadName;
    private readonly Stream _stream;

    public CustomFileResult(Stream stream, string contentType, string fileDownloadName, int bufferSize) {
      _stream = stream;
      _contentType = contentType;
      _fileDownloadName = fileDownloadName;
      _bufferSize = bufferSize;
    }

    public async Task ExecuteResultAsync(ActionContext context) {
      context.HttpContext.Response.ContentType = _contentType;

      if (_stream.CanSeek) {
        context.HttpContext.Response.ContentLength = _stream.Length;
      }

      if (!string.IsNullOrWhiteSpace(_fileDownloadName)) {
        ContentDispositionHeaderValue dispositionHeaderValue = new ContentDispositionHeaderValue("attachment");
        dispositionHeaderValue.SetHttpFileName(_fileDownloadName);

        context.HttpContext.Response.Headers["Content-Disposition"] = dispositionHeaderValue.ToString();
      }

      Stream body = context.HttpContext.Response.Body;

      try {
        await _stream.CopyToAsync(body, _bufferSize);
      }

      finally {
        _stream.Dispose();
      }
    }
  }
}