import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomersTable = () => {
    const [customers, setCustomers] = useState([]);
    const [searchName, setSearchName] = useState('');
    const [searchLocation, setSearchLocation] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetchCustomers();
    }, [page, searchName, searchLocation, sortBy]);

    const fetchCustomers = async () => {
        try {
            const response = await axios.get(`/api/customers?page=${page}&name=${searchName}&location=${searchLocation}&sortBy=${sortBy}`);
            setCustomers(response.data);
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search by name"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Search by location"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
            />
            <select onChange={(e) => setSortBy(e.target.value)}>
                <option value="">Sort By</option>
                <option value="date">Date</option>
                <option value="time">Time</option>
            </select>
            <table>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Customer Name</th>
                        <th>Age</th>
                        <th>Phone</th>
                        <th>Location</th>
                        <th>Date</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer, index) => (
                        <tr key={customer.sno}>
                            <td>{index + 1}</td>
                            <td>{customer.customer_name}</td>
                            <td>{customer.age}</td>
                            <td>{customer.phone}</td>
                            <td>{customer.location}</td>
                            <td>{new Date(customer.created_at).toLocaleDateString()}</td>
                            <td>{new Date(customer.created_at).toLocaleTimeString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CustomersTable;
