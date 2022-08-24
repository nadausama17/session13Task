require('dotenv').config();
const app = require('./app/app');
app.listen(process.env.PORT,()=>console.log(`We are on http://localhost:${process.env.PORT}`));