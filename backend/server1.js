const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const PORT = process.env.PORT1 || 3001;

app.use(express.static(path.join(__dirname, 'frontend')))
app.use(bodyParser.json());

const database = require("./database");

app.post("/calculate", (req, res) => {
    const inputNumber = req.body.inputNumber;

    // Perform Fibonacci calculation
    const count = calculateFibonacciNumbers(inputNumber);

    // Save result to the database
    database.saveResult(inputNumber, count);

    res.json({ count });
});

app.listen(PORT, () => {
    console.log(`Server 1 is running on port ${PORT}`);
});

function calculateFibonacciNumbers(n) {
    let fibSequence = [0, 1];
    
    while (fibSequence[fibSequence.length - 1] + fibSequence[fibSequence.length - 2] < n) {
        fibSequence.push(fibSequence[fibSequence.length - 1] + fibSequence[fibSequence.length - 2]);
    }

    const count = fibSequence.filter(num => num < n).length;
    return count;
}
