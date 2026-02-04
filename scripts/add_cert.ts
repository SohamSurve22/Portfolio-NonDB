import fs from 'fs';
import path from 'path';

async function main() {
    const args = process.argv.slice(2);
    const usage = "Usage: npx tsx scripts/add_cert.ts <name> <issuer> <year> <pdfFile> [description] [--static]";

    if (args.length < 4) {
        console.error(usage);
        process.exit(1);
    }

    const staticFlag = args.includes('--static') || args.includes('-s');
    const filteredArgs = args.filter(arg => arg !== '--static' && arg !== '-s');
    const [name, issuer, date, pdfPath, description] = filteredArgs;

    if (!fs.existsSync(pdfPath)) {
        console.error(`Error: File not found: ${pdfPath}`);
        process.exit(1);
    }

    let payload: any = {
        name,
        issuer,
        date,
        description: description || `Certificate for ${name}`,
        contentType: "application/pdf"
    };

    if (staticFlag) {
        // Copy PDF to public/certifications
        const filename = path.basename(pdfPath);
        const destDir = path.join(process.cwd(), 'client', 'public', 'certifications');
        const destPath = path.join(destDir, filename);

        if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir, { recursive: true });
        }

        console.log(`Copying PDF to ${destPath}...`);
        fs.copyFileSync(pdfPath, destPath);

        payload.pdfUrl = `/certifications/${filename}`;
        console.log(`PDF will be served from: ${payload.pdfUrl}`);
    } else {
        // Store as Base64 in database
        console.log(`Reading PDF from ${pdfPath}...`);
        const pdfBuffer = fs.readFileSync(pdfPath);
        const pdfBase64 = `data:application/pdf;base64,${pdfBuffer.toString('base64')}`;
        payload.pdfData = pdfBase64;
    }

    console.log("Sending to server...");
    try {
        const response = await fetch('http://localhost:5000/api/certifications', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP Error ${response.status}: ${errorText}`);
        }

        const result = await response.json();
        console.log("Certificate added successfully!");
        console.log("ID:", result.id);
        if (staticFlag) {
            console.log("PDF stored as static file");
        } else {
            console.log("PDF stored in database");
        }
    } catch (err) {
        console.error("Failed to add certificate:", err);
        console.error("Make sure the server is running on port 5000 (npm run dev)");
    }
}

main();
