const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send(`giona.tech API's`);
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
// [END run_helloworld_service]

// Exports for testing purposes.
module.exports = app;
