const API_URL = 'https://localhost:3001';

export const sendContact = (naam, email, bericht, cb) => {
    fetch(`${API_URL}/mail/contact`, {
        method: `POST`,
        headers: {
            'User-Agent': 'Bull Client/1.0',
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
            naam,
            email,
            bericht
        })
    })
        .then(r => r.json())
        .then(answer => cb(answer));
};
