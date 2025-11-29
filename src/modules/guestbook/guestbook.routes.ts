import { Hono } from 'hono';
import { authMiddleware } from '../../middlewares/auth.middleware';
import * as controller from './guestbook.controller';

const route = new Hono();

route.get('/', controller.getMessages);
route.post('/', authMiddleware, controller.postMessage);

export default route;