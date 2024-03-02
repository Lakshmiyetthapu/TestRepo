const express = require('express');
const { Pool } = require('pg');

const pool = new Pool({
    user: 'your_username',
    host: 'localhost',
    database: 'customer_data',
    password: 'your_password',
    port: 5432,
});

const app = express();
const port = 5000;

app.use(express.json());

// Get customers with search and pagination
app.get('/api/customers', async (req, res) => {
    try {
        const { name, location, page, sortBy } = req.query;
        const offset = (page - 1) * 20;

        let query = 'SELECT * FROM customers';

        // Add search conditions
        if (name || location) {
            query += ' WHERE ';
            if (name) query += `customer_name LIKE '%${name}%'`;
            if (name && location) query += ' AND ';
            if (location) query += `location LIKE '%${location}%'`;
        }

        // Add sorting conditions
        if (sortBy === 'date') {
            query += ' ORDER BY created_at::date';
        } else if (sortBy === 'time') {
            query += ' ORDER BY created_at::time';
        }

        query += ` LIMIT 20 OFFSET ${offset}`;

        const result = await pool.query(query);
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching customers:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


