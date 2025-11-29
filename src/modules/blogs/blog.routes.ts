import { Hono } from 'hono';
import * as controller from './blog.controller';

const route = new Hono();

route.get('/', controller.getList);
route.get('/:slug', controller.getDetail);

export default route;