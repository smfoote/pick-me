import { openDB, type DBSchema } from 'idb';

export interface Student {
  id: string;
  name: string;
  weight: number;
  calls: Call[];
}

interface Call {
  timestamp: number;
  assessment: 'good' | 'bad' | 'neutral';
  answered: boolean;
}

interface MyDB extends DBSchema {
  courses: {
    key: string;
    value: { id: string; title: string; description: string; isActive: boolean; students: Student[] };
  };
}
export const getDb = async () => {
  return await openDB<MyDB>('pick-me-db', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('courses')) {
        db.createObjectStore('courses', { keyPath: 'id' });
      }
    },
  });
};
