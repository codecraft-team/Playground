// Configuration file for browser-sync used by lite-server

module.exports=function(bs){
  console.log("browser-sync available")

  return {
    "port":8080,
    "files":["index.html","./src/**/*.{html,css,js}"],
    "browser":["chrome"],
    "server":{"baseDir":"./"}
  }

}