const express = require('express');
const app = express();
const port = 3000;

app.listen(port, (err) => {
  if (err) {
    throw new Error('Something bad happened...');
  }

  console.log(`Server is listening on ${port}`);
});

app.get("/", function(req, res){
    res.send('All good')
})

