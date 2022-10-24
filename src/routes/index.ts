import testRouter from './test.router';
import userRouter from './user.router';

const routers = [
	{ path: '/user', router: userRouter },
	{ path: '/test', router: testRouter },
];

export default routers;
