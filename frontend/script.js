function calculateFibonacci() {
    const inputNumber = document.getElementById("inputNumber").value;

    document.getElementById("loadingBar").style.width = "100%";
    document.getElementById("loadingBar").classList.remove("hidden");

    // Simulate a delay for demonstration purposes
    setTimeout(() => {
        // Perform Fibonacci calculation
        const count = calculateFibonacciNumbers(inputNumber);

        // Display result
        document.getElementById("result").innerHTML = `Count of Fibonacci numbers less than ${inputNumber}: ${count}`;

        // Hide loading bar
        document.getElementById("loadingBar").classList.add("hidden");
        document.getElementById("loadingBar").style.width = "0%";
    }, 2000); // Simulated delay of 2 seconds
}

function calculateFibonacciNumbers(n) {
    let fibSequence = [0, 1];
    
    while (fibSequence[fibSequence.length - 1] + fibSequence[fibSequence.length - 2] < n) {
        fibSequence.push(fibSequence[fibSequence.length - 1] + fibSequence[fibSequence.length - 2]);
    }

    const count = fibSequence.filter(num => num < n).length;
    return count;
}
