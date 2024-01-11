const mysql = require("mysql2/promise");
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;

const pool = mysql.createPool({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    connectionLimit: 10,
});

async function saveResult(inputNumber, count) {
    const connection = await pool.getConnection();

    try {
        await connection.execute("INSERT INTO results (input_number, count) VALUES (?, ?)", [inputNumber, count]);
    } catch (error) {
        console.error("Error saving result to the database:", error.message);
    } finally {
        connection.release();
    }
}

async function getResult() {
    const connection = await pool.getConnection();

    try {
        await connection.execute("select from results where ", [inputNumber, count]);
    } catch (error) {
        console.error("Error saving result to the database:", error.message);
    } finally {
        connection.release();
    }
}


module.exports = { saveResult };
