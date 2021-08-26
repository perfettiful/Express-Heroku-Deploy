const { fstat } = require('fs');
const carsData = require('./data/cars.json')
const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json({}));

app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get(["/home", "/cars"], (req, res) => {
  res.sendFile(path.join(__dirname, 'public/home.html'))
})

app.get("/api/cars", (req, res) => {
  res.status(200).json(carsData);
})

app.post("/api/cars", (req, res) => {

  console.log(req.body);

  if (req.body) {

      const { carMake, carModel, carYear } = req.body;

      res.json(`ADDED A CAR ${carYear} ${carMake}, ${carModel}`)
  }
  else {
      res.json("NO CAR ADDED")
  }

})

app.put("/api/cars", (req, res) => {
  res.json(`${req.method} was used on api/cars!`)
})

app.delete("/api/cars", (req, res) => {
  res.json(`${req.method} was used on api/cars!`)
})

app.get("*", (req, res) => {
  res.status(404).send("404 NOTHING HERE!")
})

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
