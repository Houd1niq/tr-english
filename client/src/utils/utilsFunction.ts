export function shuffle<T extends Array<any>>(array: T): T {
  let currentIndex: number = array.length;
  let randomIndex: number;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export function firstLetterToUppercase(value: string): string {
  return value[0].toUpperCase() + value.slice(1);
}

export function debounce(callback: (...args: any) => any, time = 1000) {
  let timer: NodeJS.Timeout;
  return (...args: any) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      callback(...args);
    }, time);
  };
}
