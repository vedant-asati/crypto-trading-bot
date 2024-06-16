import { signUp as signUpController } from '../../../../Api/Controllers/authController';

export default function handler(req, res) {
    if (req.method === 'POST') {
        return signUpController(req, res);
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`JSR! Method ${req.method} Not Allowed`);
    }
}
