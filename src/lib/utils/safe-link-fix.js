// Патч для безопасного использования Link компонента
// Временное решение для предотвращения ошибок с undefined href

if (typeof window !== 'undefined') {
    try {
      // Получаем оригинальный Link компонент
      const OriginalLink = require('next/link').default;
      
      // Создаём безопасную версию Link компонента
      const SafeLink = function(props) {
        // Проверяем href и заменяем undefined на #
        const safeProps = {
          ...props,
          href: props.href || '#'
        };
        
        // Используем оригинальный компонент с безопасными props
        return OriginalLink(safeProps);
      };
      
      // Копируем все свойства и методы оригинального компонента
      Object.keys(OriginalLink).forEach(key => {
        SafeLink[key] = OriginalLink[key];
      });
      
      // Переопределяем компонент Link
      require('next/link').default = SafeLink;
      
      console.log('Safe Link patch applied');
    } catch (error) {
      console.error('Failed to apply Safe Link patch:', error);
    }
  }