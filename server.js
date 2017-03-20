var express = require('express');
var path = require('path');
var app = express();
app.use(express.static(path.resolve(__dirname, 'www')));
app.set('port', process.env.PORT || 3000);
app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

