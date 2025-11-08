import { getDb } from '~/indexeddb/db';
import type { Route } from './+types/new';
import { Form, Link, redirect } from 'react-router';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Button } from '~/components/ui/button';
import { Textarea } from '~/components/ui/textarea';
import { v4 as uuidv4 } from 'uuid';

export const clientLoader = async ({}: Route.ClientLoaderArgs) => {
  const db = await getDb();
  const tx = db.transaction('courses', 'readonly');
  const courses = await db.getAll('courses');
  return { courses };
};

export const clientAction = async ({ request }: Route.ClientActionArgs) => {
  const formData = await request.formData();
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;

  const db = await getDb();
  const tx = db.transaction('courses', 'readwrite');
  const store = tx.objectStore('courses');
  const id = await store.add({ id: uuidv4(), title, description, isActive: true, students: [] });
  await tx.done;

  return redirect(`/course/${id}`);
};

export default function NewCourse({ actionData }: Route.ComponentProps) {
  return (
    <div>
      <Form method="post" className="w-96 max-w-full mx-auto space-y-6 my-24 border border-gray-300 p-6 rounded-lg">
        <h1>New Course</h1>
        <div>
          <Label className="flex flex-col gap-1 items-start">
            <span>Title</span>
            <Input name="title" type="text" />
          </Label>
        </div>
        <div>
          <Label className="flex flex-col gap-1 items-start">
            <span>Description</span>
            <Textarea name="description" />
          </Label>
        </div>
        <Button type="submit">Create Course</Button>
      </Form>
    </div>
  );
}
