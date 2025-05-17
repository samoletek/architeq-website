// src/components/ui/effects/rotation-utils.ts
"use client";

import { useEffect, useState, useRef } from 'react';

// Хук для отслеживания состояния наклона элемента
export function useRotationEffect(options = {
  maxRotation: 10, // максимальный угол поворота в градусах
  perspective: 1000, // перспектива для 3D-эффекта
  resetOnLeave: true, // сбросить состояние при уходе курсора
  smooth: true, // плавные переходы
  smoothFactor: 0.1 // фактор сглаживания (0-1)
}) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const [isHovered, setIsHovered] = useState(false);
  
  // Создаем объект для хранения текущей и целевой позиции
  const rotationRef = useRef({
    current: { x: 0, y: 0, z: 0 },
    target: { x: 0, y: 0, z: 0 }
  });
  
  // Обработчик движения мыши
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!elementRef.current) return;
    
    const rect = elementRef.current.getBoundingClientRect();
    
    // Нормализованные координаты от -1 до 1 (центр элемента - это 0,0)
    const normalizedX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const normalizedY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    
    // Вычисляем угол поворота (инвертируем Y для естественного ощущения)
    const targetX = -normalizedY * options.maxRotation;
    const targetY = normalizedX * options.maxRotation;
    
    // Устанавливаем целевую позицию
    rotationRef.current.target = { x: targetX, y: targetY, z: 0 };
    
    if (!options.smooth) {
      setRotation(rotationRef.current.target);
    }
  };
  
  // Обработчик ухода курсора
  const handleMouseLeave = () => {
    setIsHovered(false);
    
    if (options.resetOnLeave) {
      rotationRef.current.target = { x: 0, y: 0, z: 0 };
      
      if (!options.smooth) {
        setRotation({ x: 0, y: 0, z: 0 });
      }
    }
  };
  
  // Обработчик входа курсора
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  
  // Анимация плавного перехода
  useEffect(() => {
    if (!options.smooth) return;
    
    let animationFrameId: number;
    
    const animateRotation = () => {
      const current = rotationRef.current.current;
      const target = rotationRef.current.target;
      
      // Плавное приближение к целевому значению
      current.x += (target.x - current.x) * options.smoothFactor;
      current.y += (target.y - current.y) * options.smoothFactor;
      current.z += (target.z - current.z) * options.smoothFactor;
      
      setRotation({ ...current });
      
      animationFrameId = requestAnimationFrame(animateRotation);
    };
    
    animationFrameId = requestAnimationFrame(animateRotation);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [options.smooth, options.smoothFactor]);
  
  // Возвращаем ref, обработчики событий, состояние вращения и наведения
  return {
    ref: elementRef,
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
      onMouseEnter: handleMouseEnter
    },
    rotation,
    isHovered,
    style: {
      transform: `perspective(${options.perspective}px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${rotation.z}deg)`,
      transition: options.smooth ? 'none' : 'transform 0.3s ease-out'
    }
  };
}

// Компонент для создания 3D-карты
export function create3DCardStyle(rotation: { x: number, y: number, z: number }, options = {
  perspective: 1000,
  scale: 1,
  translateZ: 0
}) {
  return {
    transform: `
      perspective(${options.perspective}px) 
      rotateX(${rotation.x}deg) 
      rotateY(${rotation.y}deg) 
      rotateZ(${rotation.z}deg)
      scale(${options.scale})
      translateZ(${options.translateZ}px)
    `,
  };
}