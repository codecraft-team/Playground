# Samples for downloading and uploading files
Samples tested with Microsoft Edge, Chrome, IE 11.

![ALT TAG](demo.gif)

## Download
Download can be challenging because the file to be downloaded is located e.g in a database and cannot be streamed from a file system directly. Also the GET request is protected by tokens and a header must be set before downloading the file.

- Any stream e.g. from database and not only file system
- Anonymous, cookie-, token based access
- Throughput
- Resources usage on server side

## Upload
Uploading a file can use several features like:

- Small files (buffering)
- Large files (streaming)
- Multiple files
- Progress bars
- Ajax instead for form
- Drag&Drop
- Aborting

Edge: Upload issue with large files  
https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/15099599/
