const socket = io();

document.getElementById('registerForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const username = document.getElementById('username').value;

  // Emit an event to the server to check for available slots
  socket.emit('checkAvailability', { username });
});

// Display a message when there are no available slots
socket.on('noAvailability', function() {
  alert('Sorry, all servers are currently busy. Please try again later.');
});

// Handle user registration form submission
socket.on('registerResponse', function(response) {
  if (response.success) {
    alert('Registration successful!');
  } else {
    alert('Registration failed. Please try again.');
  }
});
