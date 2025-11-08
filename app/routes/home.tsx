import { Link } from 'react-router';
import type { Route } from './+types/home';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'New React Router App' }, { name: 'description', content: 'Welcome to React Router!' }];
}

export default function Home() {
  return (
    <main>
      <h1 className="text-3xl">Pick Me!</h1>
      <nav>
        <Link to="/course" className="text-blue-500 underline">
          View Courses
        </Link>
      </nav>
    </main>
  );
}
