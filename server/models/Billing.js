const mongoose = require('mongoose');

const BillingSchema = new mongoose.Schema({
    invoiceNumber: { type: String, required: true, unique: true },
    patientName: { type: String, required: true },
    serviceType: { type: String, required: true }, // e.g., Consultation, Surgery, Lab Test
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    method: { type: String, required: true },
    status: { 
        type: String, 
        enum: ['Paid', 'Unpaid', 'Pending'], 
        default: 'Unpaid' 
    }
    
}, { timestamps: true });

module.exports = mongoose.model('Billing', BillingSchema);