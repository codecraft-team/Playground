"use strict";

function drop(e) {
  cancel(e);

  var types = e.dataTransfer.types;
  [].forEach.call(types, function (type) {
    if (type === "Files") {
      var files = e.dataTransfer.files;
      uploadFiles(files);
    }
  });

  this.classList.remove("over");
}

function dragOver(e) {
  cancel(e);

  e.dataTransfer.dropEffect = "copy";
  this.classList.add("over");
}

function dragLeave() {
  this.classList.remove("over");
}

function cancel(e) {
  if (e.preventDefault) e.preventDefault();
  if (e.stopPropagation) e.stopPropagation();

  return false;
}

var target = document.querySelector("#dropzone");
target.addEventListener("drop", drop, false);
target.addEventListener("dragenter", cancel, false);
target.addEventListener("dragover", dragOver, false);
target.addEventListener("dragleave", dragLeave, false);