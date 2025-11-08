import { getDb } from '~/indexeddb/db';
import type { Route } from './+types/list';
import { Link } from 'react-router';

export const clientLoader = async ({}: Route.ClientLoaderArgs) => {
  const db = await getDb();
  const tx = db.transaction('courses', 'readonly');
  const courses = await db.getAll('courses');
  return { courses };
};

export default function CourseList({ loaderData: { courses } }: Route.ComponentProps) {
  return (
    <div className="max-w-3xl mx-auto my-24">
      <h1 className="text-3xl mb-2">Course List</h1>
      <ul className="flex flex-col gap-2">
        {courses.map(course => (
          <li key={course.id}>
            <Link to={`/course/${course.id}`} className="px-2 py-1 bg-blue-50 shadow-sm rounded-sm">
              {course.title}
            </Link>
          </li>
        ))}
        <li>
          <Link to="/course/new" className="bg-gray-50 px-2 py-1 shadow-md rounded-sm">
            New course
          </Link>
        </li>
      </ul>
    </div>
  );
}
