import mongoose from 'mongoose';

async function updateCert() {
    try {
        await mongoose.connect('mongodb://localhost:27017/portfolio');
        console.log('Connected to MongoDB');

        const CertificationModel = mongoose.model('Certification', new mongoose.Schema({}, { strict: false }));

        const result = await CertificationModel.findByIdAndUpdate(
            '698300d39ccabf494341d845',
            { pdfUrl: '/certifications/AWS.pdf' },
            { new: true }
        );

        console.log('Updated certificate:');
        console.log(JSON.stringify(result, null, 2));

        await mongoose.disconnect();
        console.log('Done!');
    } catch (err) {
        console.error('Error:', err);
    }
}

updateCert();
