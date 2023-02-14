const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

//add other middleware
app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

const medicalBills = [];

app.get('/items', (req, res) => {
  res.json(medicalBills);
});

// upload medical bill
app.post('/items', (req, res) => {
  console.log(req);
  const { patientName, patientAddress, hospitalName, dateOfService, billAmount } = req.body;
  const newMedicalBill = { patientName, patientAddress, hospitalName, dateOfService, billAmount };

  medicalBills.push(newMedicalBill);
  console.log(medicalBills);

  res.status(201).json(newMedicalBill);
});

//start app 
const port = process.env.PORT || 3000;

const server = app.listen(port, () => 
  console.log(`App is listening on port ${port}.`)
);

module.exports = app;