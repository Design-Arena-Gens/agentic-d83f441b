/**
 * Filters an array based on a predicate function
 * @param arr - The array to filter
 * @param predicate - Function that tests each element
 * @returns A new array with elements that pass the test
 */
export function filterArray<T>(
  arr: T[],
  predicate: (item: T, index: number) => boolean
): T[] {
  return arr.filter(predicate);
}

/**
 * Groups array elements by a key function
 * @param arr - The array to group
 * @param keyFn - Function that returns the grouping key
 * @returns Object with grouped elements
 */
export function groupBy<T, K extends string | number>(
  arr: T[],
  keyFn: (item: T) => K
): Record<K, T[]> {
  return arr.reduce((acc, item) => {
    const key = keyFn(item);
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {} as Record<K, T[]>);
}

/**
 * Debounces a function call
 * @param fn - The function to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

// Example usage
if (require.main === module) {
  const numbers = [1, 2, 3, 4, 5, 6];
  const evenNumbers = filterArray(numbers, (n) => n % 2 === 0);
  console.log('Even numbers:', evenNumbers);

  const items = [
    { category: 'fruit', name: 'apple' },
    { category: 'vegetable', name: 'carrot' },
    { category: 'fruit', name: 'banana' },
  ];
  const grouped = groupBy(items, (item) => item.category);
  console.log('Grouped items:', grouped);

  const log = debounce((msg: string) => console.log(msg), 1000);
  log('This will be debounced');
}
