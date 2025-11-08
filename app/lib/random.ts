import type { Student } from '~/indexeddb/db';

export const getRandomStudent = (students: Student[]) => {
  const index = Math.floor(Math.random() * students.length);
  return students[index];
};
