import { login as loginController } from '../../../../Api/Controllers/authController';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        await loginController(req, res);
        return;
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`JSR! Method ${req.method} Not Allowed`);
    }
}
