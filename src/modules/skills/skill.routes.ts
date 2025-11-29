import { Hono } from 'hono';
import * as controller from './skill.controller';

const route = new Hono();

route.get('/', controller.getSkills);

export default route;