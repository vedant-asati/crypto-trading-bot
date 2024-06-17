import { login as loginController } from '../../../../Api/Controllers/authController';

export default function handler(req, res, next) {
    if (req.method === 'POST') {
        // mongoose.connect(DB, {
        //     useNewUrlParser: true,
        //     useCreateIndex: true,
        //     useFindAndModify: true,
        // }).then(()=>{
        //     console.log("JSR! DB connected.")
        // });
        // await loginController(req, res);
        return loginController(req, res, next);
        // mongoose.disconnect();
        // return;
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`JSR! Method ${req.method} Not Allowed`);
    }
}
