import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('course', 'routes/course/list.tsx'),
  route('course/new', 'routes/course/new.tsx'),
  route('course/:id', 'routes/course/detail.tsx'),
] satisfies RouteConfig;
