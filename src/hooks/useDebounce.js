import { useState, useEffect } from 'react';

// Наш хук
export default function useDebounce(value, delay) {
  // Состояние и сеттер для отложенного значения
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Выставить debouncedValue равным value (переданное значение)
    // после заданной задержки
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [delay, value]);

  return debouncedValue;
}
