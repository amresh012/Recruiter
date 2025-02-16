const Inquiry = require('../model/inquery.model'); // Assuming you have a model for Inquiry


// get all inquery
const getinquery =  async (req, res) => {
    try {
        const inquiries = await Inquiry.find();
        res.json(inquiries);
    } catch (err) {
        res.status(500).json({ message: err.message });
        }
}

// Controller to submit inquiry form
const inquery =  async (req, res) => {
    try {
        const { name, email, mobile ,company} = req.body;
         console.log(req.body)
        // Validate input
        if (!name || !email || !company) {
          return res.status(400).json({ error: "All fields are required" });
        }

        // Create new inquiry
        const newInquiry = new Inquiry({
            company,
          name,
          email,
          mobile,
        });

        // Save inquiry to database
        await newInquiry.save();

        // Send response
        res.status(201).json({ message: 'Inquiry submitted successfully' });
    } catch (error) {
        console.error('Error submitting inquiry:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { inquery, getinquery };