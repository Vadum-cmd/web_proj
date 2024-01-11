CREATE DATABASE IF NOT EXISTS fibonacci_app;

CREATE TABLE IF NOT EXISTS results (
    id INT AUTO_INCREMENT PRIMARY KEY,
    input_number INT,
    count INT
);
