const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT2 || 3002;

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
    console.log(`Server 2 is running on port ${PORT}`);
});

function calculateFibonacciNumbers(n) {
    let fibSequence = [0, 1];
    
    while (fibSequence[fibSequence.length - 1] + fibSequence[fibSequence.length - 2] < n) {
        fibSequence.push(fibSequence[fibSequence.length - 1] + fibSequence[fibSequence.length - 2]);
    }

    const count = fibSequence.filter(num => num < n).length;
    return count;
}
