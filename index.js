app = require('./app');

const port = process.env.PORT || 3000;

//HTTP SERVER
app.listen(port, () => console.log(`Server start on ${port}`));
