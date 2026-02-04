import mongoose from 'mongoose';

async function checkCert() {
    try {
        await mongoose.connect('mongodb://localhost:27017/portfolio');
        console.log('Connected to MongoDB');

        const CertificationModel = mongoose.model('Certification', new mongoose.Schema({}, { strict: false }));

        const cert = await CertificationModel.findById('698300d39ccabf494341d845');
        console.log('Certificate data:');
        console.log(JSON.stringify(cert, null, 2));

        await mongoose.disconnect();
    } catch (err) {
        console.error('Error:', err);
    }
}

checkCert();
