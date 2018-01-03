using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Logging;
using Microsoft.Net.Http.Headers;

namespace FileUpload.Controllers {
  [Route("api/[controller]")]
  public class FilesController : Controller {
    private readonly ILogger _logger;
    private readonly string _targetFilePath;

    public FilesController(ILogger<FilesController> logger, IHostingEnvironment environment) {
      _logger = logger;
      _targetFilePath = Path.Combine(environment.WebRootPath, "Uploads");
    }

    [HttpGet]
    public IActionResult List() {
      List<string> files = new List<string>();

      DirectoryInfo directoryInfo = new DirectoryInfo(_targetFilePath);

      foreach (FileInfo fileInfo in directoryInfo.GetFiles()) {
        files.Add(fileInfo.Name);
      }

      return Ok(files);
    }

    [HttpGet("Download")]
    public IActionResult DownloadPhysicalFile(string filename) {
      return PhysicalFile(Path.Combine(_targetFilePath, filename), "application/octet-stream", filename);
    }

    [HttpGet("DownloadStream")]
    public IActionResult DownloadStream(string filename) {
      byte[] buffer = Encoding.Unicode.GetBytes("This is a stream content.");
      return File(new MemoryStream(buffer), "application/octet-stream", filename);
    }

    [HttpGet("DownloadCustomStream")]
    public IActionResult DownloadcustomStream(string filename) {
      Stream fileStream = System.IO.File.Open(Path.Combine(_targetFilePath, filename), FileMode.Open);
      return new CustomFileResult(fileStream, "application/octet-stream", filename, 64 * 1024);
    }

    [HttpPost]
    public async Task<IActionResult> Upload() {
      MediaTypeHeaderValue mediaTypeHeaderValue = MediaTypeHeaderValue.Parse(Request.ContentType);

      string boundary = HeaderUtilities.RemoveQuotes(mediaTypeHeaderValue.Boundary).ToString();

      MultipartReader reader = new MultipartReader(boundary, Request.Body, 64 * 1024);

      MultipartSection section = await reader.ReadNextSectionAsync();

      while (section != null) {
        ContentDispositionHeaderValue contentDispositionHeaderValue = section.GetContentDispositionHeader();

        if (!contentDispositionHeaderValue.IsFileDisposition()) {
          throw new InvalidOperationException("Only file disposition supported.");
        }

        FileMultipartSection fileSection = section.AsFileSection();

        int bufferSize = 64 * 1024;

        string fileName = Path.Combine(_targetFilePath, Path.GetFileName(fileSection.FileName));

        using (FileStream targetStream = System.IO.File.Create(fileName, bufferSize)) {
          await fileSection.FileStream.CopyToAsync(targetStream);

          _logger.LogInformation($"File uploaded to: {fileName}");
        }

        section = await reader.ReadNextSectionAsync();
      }

      return Ok();
    }
  }
}