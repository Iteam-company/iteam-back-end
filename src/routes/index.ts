import authRouter from './auth.router';
import projectRouter from './project.router';
import userRouter from './user.router';
import applicationRouter from './application.router';
import technologyRouter from './technology.router';
import candidateRouter from './candidate.router';
import commentRouter from './comment.router';
import suggestionRouter from './suggestion.router';
import loggerRouter from './logger.router';

const routers = [
	{ path: '/project', router: projectRouter },
	{ path: '/user', router: userRouter },
	{ path: '/auth', router: authRouter },
	{ path: '/application', router: applicationRouter },
	{ path: '/technology', router: technologyRouter },
	{ path: '/candidate', router: candidateRouter },
	{ path: '/comment', router: commentRouter },
	{ path: '/suggestion', router: suggestionRouter },
	{ path: '/log', router: loggerRouter },
];

export default routers;
