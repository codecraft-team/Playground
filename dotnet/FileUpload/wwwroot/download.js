"use strict";

function getDownloads() {
  var request = new XMLHttpRequest();
  request.open("GET", "api/files");
  request.onload = function () {
    var downloads = JSON.parse(this.responseText);
    listDownloads(downloads);
  };
  request.send();
}

function listDownloads(downloads) {
  var downloadsElement = document.querySelector("#downloads");

  if (downloadsElement.firstChild) {
    downloadsElement.removeChild(downloadsElement.firstChild);
  }

  var list = document.createElement("ul");

  downloadsElement.appendChild(list);

  for (let i = 0; i < downloads.length; i++) {
    var anchor = document.createElement("a");
    anchor.href = "javascript: void(0)";
    anchor.innerText = downloads[i];
    anchor.onclick = function () { getDownload(this.innerText); };

    var listItem = document.createElement("li");
    listItem.appendChild(anchor);

    list.appendChild(listItem);
  }
}

function getDownload(fileName) {
  var request = new XMLHttpRequest();
  request.open("GET", "api/files/download?filename=" + fileName, true);
  request.responseType = "blob";
  request.onload = function () { openDownload(this.response, fileName); };
  request.setRequestHeader("Authorization", "Bearer xyz");
  request.send();
}

function openDownload(content, fileName) {
  var isMsBrowser = !!window.navigator.msSaveOrOpenBlob;

  if (isMsBrowser) {
    window.navigator.msSaveBlob(content, fileName);
  }
  else {
    var url = window.URL.createObjectURL(content);

    var anchor = window.document.createElement("a");
    anchor.href = url;
    anchor.download = fileName;
    anchor.click();
    window.URL.revokeObjectURL(url);
  }
}

getDownloads();