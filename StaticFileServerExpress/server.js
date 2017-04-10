let engines = require('consolidate');
let express = require('express');
let app = express();

let workingDirectory = process.cwd();

app.use(express.static(workingDirectory));

// Register html rendering engine for 404 -> index.html rendering
app.set('views', workingDirectory);
app.engine('html', engines.mustache);
app.set('view engine', 'html');

// Handle 404: every route which can not be handled by static files
app.get("/*", function (req, res) {
  res.render("index.html", {});
});

let port = process.argv[2];

app.listen(parseInt(port), function () {
  console.log(`Listening on port ${port}...`)
})