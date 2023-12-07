// Assuming you have a form element with id "interpolationForm" and an input element with id "userInput"
const form = document.getElementById('interpolationForm');
const userInputInput = document.getElementById('userInput');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  // Assuming you have an endpoint on the server to handle the interpolation request
  fetch('/interpolate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userInput: parseFloat(userInputInput.value), dataPoints: dataPoints }),
  })
    .then(response => response.json())
    .then(data => {
      console.log(data.result); // This will be the result of the interpolation
    })
    .catch(error => {
      console.error('Error:', error);
    });
});
