export default async function handler(req, res) {
    // 🔴 Yeh lines frontend ko connect karne ke liye zaroori hain
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        const { api_key, action, product_id, duration } = req.body || req.query;
        const providerUrl = 'https://api.v9reseller.xyz/v1/index.php'; 

        const params = new URLSearchParams();
        params.append('api_key', api_key);
        params.append('action', action);
        params.append('product_id', product_id);
        params.append('duration', duration);

        const response = await fetch(providerUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params
        });

        const data = await response.json();
        return res.status(200).json(data);

    } catch (error) {
        return res.status(500).json({ status: 'error', message: 'Backend proxy failed: ' + error.message });
    }
}
