import { AuthenticationService, JWTStrategy } from '@feathersjs/authentication';
import { LocalStrategy } from '@feathersjs/authentication-local';
import type { Application } from './declarations';

export default function (app: Application) {
  const authService = new AuthenticationService(app);

  authService.register('jwt', new JWTStrategy());
  authService.register('local', new LocalStrategy());

  // Register the service with configure
  app.configure(() => {
    app.use('authentication', authService as any);
  });
}
