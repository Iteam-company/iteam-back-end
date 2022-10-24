import projectRouter from './project.router';
import userRouter from './user.router';
import testRouter from './test.router';

const routers = [
	{ path: '/project', router: projectRouter },
	{ path: '/user', router: userRouter },
	{ path: '/test', router: testRouter },
];

export default routers;
