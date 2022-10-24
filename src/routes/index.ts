import authRouter from './auth.router';
import testRouter from './test.router';
import userRouter from './user.router';

const routers = [
	{ path: '/user', router: userRouter },
	{ path: '/test', router: testRouter },
	{ path: '/auth', router: authRouter },
];

export default routers;
