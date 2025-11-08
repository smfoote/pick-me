import { getDb } from '~/indexeddb/db';
import type { Route } from './+types/detail';
import { Form, Link, redirect, useNavigation } from 'react-router';
import { Label } from '~/components/ui/label';
import { v4 as uuidv4 } from 'uuid';
import { Input } from '~/components/ui/input';
import { useEffect, useRef } from 'react';
import { Button } from '~/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '~/components/ui/collapsible';
import { getRandomStudent } from '~/lib/random';

export const clientLoader = async ({ params }: Route.ClientLoaderArgs) => {
  const db = await getDb();
  const tx = db.transaction('courses', 'readonly');
  const course = await db.get('courses', params.id);
  if (!course) {
    throw new Response('Not Found', { status: 404 });
  }
  return { course };
};

export const clientAction = async ({ request, params }: Route.ClientActionArgs) => {
  const formData = await request.formData();

  const db = await getDb();
  const tx = db.transaction('courses', 'readwrite');
  const store = tx.objectStore('courses');
  const course = await store.get(params.id);
  const action = formData.get('_action');
  if (!course) {
    return redirect('/course');
  }
  if (!course.students) {
    course.students = [];
  }
  if (action === 'add') {
    const studentName = formData.get('studentName') as string;
    course.students.push({ id: uuidv4(), name: studentName, weight: 1, calls: [] });
  } else if (action === 'remove') {
    const studentId = formData.get('studentId') as string;
    course.students = course.students.filter((student: any) => student.id !== studentId);
  } else if (action === 'randomStudent') {
    const student = getRandomStudent(course.students);
    course.students = course.students.map(s => {
      if (s.id === student.id) {
        s.calls.push({ timestamp: Date.now(), assessment: 'neutral', answered: false });
      }
      return s;
    });
    await store.put(course);
    await tx.done;
    return { chosenStudent: student };
  }

  await store.put(course);
  await tx.done;

  return null;
};

export default function CourseList({ loaderData: { course }, actionData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const form = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (navigation.state === 'idle') {
      form.current?.reset();
    }
  }, [navigation.state]);

  return (
    <div className="max-w-3xl mx-auto my-24">
      <h1 className="text-2xl">{course.title}</h1>
      <p className="text-md font-serif">{course.description}</p>
      <div className="mt-8 border border-gray-300 p-4 rounded-lg flex flex-col items-center justify-center gap-4">
        <h2>Call on a student</h2>
        {actionData?.chosenStudent ? (
          <div className="text-5xl font-semibold">{actionData.chosenStudent.name}</div>
        ) : null}
        <Form method="post">
          <Button name="_action" value="randomStudent" type="submit">
            Next student
          </Button>
        </Form>
      </div>
      <div className="mt-8 border border-gray-300 p-4 rounded-lg">
        <Collapsible>
          <CollapsibleTrigger className="w-full cursor-pointer">
            <h2 className="text-left">Students</h2>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <ul className="flex-flex-col mt-4">
              {course.students?.map((student: any) => (
                <li key={student.id} className="w-56">
                  <Form
                    method="post"
                    className="bg-gray-100 rounded-md px-2 py-1 my-1 flex justify-between items-center"
                  >
                    {student.name} <input type="hidden" name="studentId" value={student.id} />{' '}
                    <Button name="_action" value="remove" variant="ghost" size="sm" type="submit">
                      X
                    </Button>
                  </Form>
                </li>
              ))}
              <li className="w-56 mt-4">
                <Form
                  method="post"
                  ref={form}
                  className="bg-gray-100 rounded-md px-2 py-1 flex flex-col justify-between gap-2"
                >
                  <Label className="flex flex-col gap-1 items-start">
                    <span>Student Name</span>
                    <Input className="bg-white" name="studentName" type="text" />
                  </Label>
                  <Button name="_action" value="add" type="submit">
                    Add Student
                  </Button>
                </Form>
              </li>
            </ul>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
}
