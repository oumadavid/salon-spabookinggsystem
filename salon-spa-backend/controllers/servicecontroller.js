const db = require('../db/backend-db'); // Adjust the path if necessary

// Get all services
exports.getAllServices = (req, res) => {
  const query = 'SELECT * FROM services';

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch services' });
    }
    res.status(200).json(results);
  });
};

// Add a new service
exports.addService = (req, res) => {
  const { name, description, price } = req.body;

  const query = 'INSERT INTO services (name, description, price) VALUES (?, ?, ?)';
  db.query(query, [name, description, price], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to add service' });
    }
    res.status(201).json({ message: 'Service added successfully' });
  });
};

// Update a service
exports.updateservice = (req, res) => {
    const { id }= req.params;
    const{name,description,price}=req.body;

    const query = 'UPDATE services SET name = ?, description = ?, price = ? WHERE id = ?';
  db.query(query, [name, description, price, id], (err, result) => {
    if (err) {
        return res.status(500).json({ error: 'Failed to update service' });
    }
    res.status(200).json({ message: 'Service updated successfully' });
});
};


  


// Delete a service
exports.deleteService = (req, res) => {
const { id } = req.params;

const query = 'DELETE FROM services WHERE id = ?';
db.query(query, [id], (err, result) => {
if (err) {
  return res.status(500).json({ error: 'Failed to delete service' });
}
res.status(200).json({ message: 'Service deleted successfully' });
});
};
