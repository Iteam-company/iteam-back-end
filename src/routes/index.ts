import authRouter from './auth.router';
import projectRouter from './project.router';
import userRouter from './user.router';
import testRouter from './test.router';
import applicationRouter from './application.router';

const routers = [
	{ path: '/project', router: projectRouter },
	{ path: '/user', router: userRouter },
	{ path: '/test', router: testRouter },
	{ path: '/auth', router: authRouter },
	{ path: '/application', router: applicationRouter },
];

export default routers;
