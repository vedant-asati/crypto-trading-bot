import { login as loginController } from '../../../../api/Controllers/authController';

export default function handler(req, res) {
    if (req.method === 'POST') {
        return loginController(req, res);
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`JSR! Method ${req.method} Not Allowed`);
    }
}
