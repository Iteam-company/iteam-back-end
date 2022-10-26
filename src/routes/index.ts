import authRouter from './auth.router';
import projectRouter from './project.router';
import userRouter from './user.router';
import applicationRouter from './application.router';

const routers = [
	{ path: '/project', router: projectRouter },
	{ path: '/user', router: userRouter },
	{ path: '/auth', router: authRouter },
	{ path: '/application', router: applicationRouter },
];

export default routers;
