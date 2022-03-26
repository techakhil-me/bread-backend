const express = require('express');

const app = express();
const PORT = process.env.PORT || 8000;
const userRoutes = require('./routes/user');
const offerRoutes = require('./routes/offer');
const cardRoutes = require('./routes/card');

app.use(express.json());

// app.use(flash());
app.use(express.urlencoded({ extended: false }));

//routes
app.use('/user', userRoutes);
app.use('/offer', offerRoutes);
app.use('/card', cardRoutes);

app.listen(PORT, () => {
  console.log(`Server Working On Port: ${PORT}`);
});
