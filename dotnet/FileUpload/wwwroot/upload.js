"use strict";

var uploadRequest = null;

function uploadFiles(files) {
  var startTime = Date.now();

  var prog = document.getElementById("progress");
  prog.value = 0;
  prog.max = 100;

  var formData = new FormData();

  for (var i = 0; i < files.length; i++) {
    formData.append("file", files[i]);
  };

  uploadRequest = new XMLHttpRequest();
  uploadRequest.open("POST", "api/files");
  uploadRequest.onerror = function (e) { alert(e); };
  uploadRequest.onload = function () {
    document.getElementById("percent").innerHTML = "100%";

    prog.value = prog.max;
  };
  uploadRequest.upload.onprogress = function (e) {
    var stopTime = (Date.now() - startTime) / 1000;
    var bandwidth = Math.round(e.loaded / stopTime / 1024 / 1024);

    document.querySelector("#bandwidth").innerText = bandwidth;

    var p = Math.round(100 / e.total * e.loaded);

    document.getElementById("progress").value = p;
    document.getElementById("percent").innerHTML = p + "%";
  };
  uploadRequest.onabort = function () { alert("Upload aborted"); };
  uploadRequest.send(formData);
}

function onFileChange() {
  document.getElementById("progress").value = 0;
  document.getElementById("percent").innerHTML = "0%";
}

function onUpload() {
  var files = document.getElementById("files").files;

  uploadFiles(files);
}

function onAbort() {
  uploadRequest.abort();
}

document.querySelector("#files").onchange = onFileChange;
document.querySelector("#upload").onclick = onUpload;
document.querySelector("#abort").onclick = onAbort;