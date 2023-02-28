import {
  CorsOptions,
  CorsOptionsDelegate,
} from '@nestjs/common/interfaces/external/cors-options.interface';

// export const cors: boolean | CorsOptions | CorsOptionsDelegate<any> = {
//   origin: '*',
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   preflightContinue: false,
//   optionsSuccessStatus: 204,
// };

const corsAllowedUrls = ['http://localhost:3000'];

export const corsOptions: boolean | CorsOptions | CorsOptionsDelegate<any> = (
  req,
  callback,
) => {
  let corsOptions: CorsOptions;

  if (corsAllowedUrls.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { credentials: true, origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { credentials: true, origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions);
};
