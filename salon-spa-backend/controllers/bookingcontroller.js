exports.bookAppointment = (req, res) => {
    const { service, date, time, location } = req.body;
    console.log('Booking Received:', req.body);
  
    // You can store this in a database here
  
    res.status(201).json({ message: 'Booking successful!' });
  };
  