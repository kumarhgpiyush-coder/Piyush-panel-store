// api/buy.js
export default async function handler(req, res) {
    // Sirf POST requests allow karne ke liye
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        // Frontend se aa rahe URLSearchParams ko read karna
        const { api_key, action, product_id, duration } = req.body || req.query;

        // Provider API ka asli endpoint jahan data bhejna hai
        const providerUrl = 'https://api.v9reseller.xyz/v1/index.php'; 

        const params = new URLSearchParams();
        params.append('api_key', api_key);
        params.append('action', action);
        params.append('product_id', product_id);
        params.append('duration', duration);

        // Server-to-Server request (Isme koi CORS error nahi aayega)
        const response = await fetch(providerUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params
        });

        const data = await response.json();
        
        // Vercel se wapas frontend ko data bhejna
        return res.status(200).json(data);

    } catch (error) {
        return res.status(500).json({ status: 'error', message: 'Backend proxy failed: ' + error.message });
    }
}
