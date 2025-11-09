import type { Student } from '~/indexeddb/db';

export const DEFAULT_WEIGHT = 2;
export const getRandomStudent = (students: Student[]) => {
  const weights = students.map(student => student.weight);
  const [student] = weightedChoices(students, weights, 1) as Student[];
  return student;
};

function weightedChoices(array: unknown[], weights: number[], k = 1) {
  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
  const results = [];

  for (let i = 0; i < k; i++) {
    let random = Math.random() * totalWeight;
    let sum = 0;

    for (let j = 0; j < array.length; j++) {
      sum += weights[j];
      if (random <= sum) {
        results.push(array[j]);
        break;
      }
    }
  }

  return results;
}
