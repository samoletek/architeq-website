import { useState, useEffect } from 'react';

export const useMediaQuery = (query: string): boolean => {
  // Начальное состояние на основе текущего размера экрана
  const getMatches = (): boolean => {
    // SSR проверка (чтобы избежать ошибок при серверном рендеринге)
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  };

  const [matches, setMatches] = useState<boolean>(getMatches());

  useEffect(() => {
    // Функция, которая обновляет состояние
    const handleChange = () => {
      setMatches(getMatches());
    };

    // Создаем медиа-запрос
    const matchMedia = window.matchMedia(query);

    // Вызываем обработчик сразу для установки начального значения
    handleChange();

    // Добавляем слушатель событий
    if (matchMedia.addListener) {
      // Для старых браузеров
      matchMedia.addListener(handleChange);
    } else {
      // Для современных браузеров
      matchMedia.addEventListener('change', handleChange);
    }

    // Удаляем слушатель событий при размонтировании
    return () => {
      if (matchMedia.removeListener) {
        // Для старых браузеров
        matchMedia.removeListener(handleChange);
      } else {
        // Для современных браузеров
        matchMedia.removeEventListener('change', handleChange);
      }
    };
  }, [query]);

  return matches;
};

export default useMediaQuery;