
// These two lines are required to initialize Express in Cloud Code.
 express = require('express');
 app = express();

// Global app configuration section
app.set('views', 'cloud/views');  // Specify the folder to find templates
app.set('view engine', 'ejs');    // Set the template engine
app.use(express.bodyParser());    // Middleware for reading request body

// This is an example of hooking up a request handler with a specific request
// path and HTTP verb using the Express routing API.
app.get('/', function(req, res) {

  var query = new Parse.Query("DatosSensores");
  query.find({
    success: function(results) {

      var texto = "";

      for (var i = 0; i < results.length; ++i) {
        texto += "{x:new Date('"+results[i].updatedAt+"'),y:"+results[i].get("dht11")+"},";
      }

      res.render('index',{ datos: texto } );
    },
    error: function() {
      response.error("movie lookup failed");
    }
  });

});

// // Example reading from the request query string of an HTTP get request.
// app.get('/test', function(req, res) {
//   // GET http://example.parseapp.com/test?message=hello
//   res.send(req.query.message);
// });

// // Example reading from the request body of an HTTP post request.
// app.post('/test', function(req, res) {
//   // POST http://example.parseapp.com/test (with request body "message=hello")
//   res.send(req.body.message);
// });

// Attach the Express app to Cloud Code.
app.listen();