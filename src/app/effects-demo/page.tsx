'use client';

import React from 'react';
import SiteLayout from '@/components/layout/site-layout';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icons/icon';
import HoverElement from '@/components/ui/effects/hover-element';
import DepthCard from '@/components/ui/effects/depth-card';
import GradientFollow from '@/components/ui/effects/gradient-follow';
import ScrollAnimate from '@/components/ui/effects/scroll-animate';
import ParallaxElement from '@/components/ui/effects/parallax-element';

export default function EffectsDemo() {
  return (
    <SiteLayout>
      {/* Вступительная секция */}
      <header className="relative py-20 md:py-32 overflow-hidden">
        <GradientFollow 
          gradientType="primary"
          gradientSize={50}
          intensity={0.8}
          continuousMovement
        >
          <div className="container relative z-10">
            <ScrollAnimate animationType="fadeInUp">
              <h1 className="text-center max-w-4xl mx-auto mb-6">
                Визуальные эффекты для современного веб-дизайна
              </h1>
            </ScrollAnimate>
            
            <ScrollAnimate animationType="fadeInUp" delay={0.2}>
              <p className="text-light-gray text-center max-w-2xl mx-auto text-lg mb-12">
                Демонстрация современных интерактивных эффектов и анимаций для создания 
                привлекательных пользовательских интерфейсов
              </p>
            </ScrollAnimate>
            
            <div className="flex flex-wrap justify-center gap-4">
              <ScrollAnimate animationType="fadeInLeft" delay={0.4}>
                <Button variant="primary" size="lg">Начать проект</Button>
              </ScrollAnimate>
              
              <ScrollAnimate animationType="fadeInRight" delay={0.4}>
                <Button variant="secondary" size="lg">Узнать больше</Button>
              </ScrollAnimate>
            </div>
          </div>
        </GradientFollow>
      </header>

      {/* Секция с эффектами наведения */}
      <section className="py-20 bg-medium-gray">
        <div className="container">
          <ScrollAnimate animationType="fadeInUp">
            <h2 className="text-center mb-12">Эффекты при наведении</h2>
          </ScrollAnimate>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollAnimate animationType="fadeInUp" delay={0.1}>
              <HoverElement 
                floatEffect="small" 
                floatSpeed="normal" 
                hoverGlow="primary"
              >
                <div className="bg-dark-purple p-8 rounded-lg">
                  <Icon name="connection" className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl mb-2">Базовый эффект парения</h3>
                  <p className="text-light-gray">
                    Элемент плавно поднимается при наведении и имеет мягкую анимацию парения.
                  </p>
                </div>
              </HoverElement>
            </ScrollAnimate>
            
            <ScrollAnimate animationType="fadeInUp" delay={0.2}>
              <HoverElement 
                floatEffect="medium" 
                floatSpeed="slow" 
                hoverGlow="secondary"
                hoverScale={1.05}
              >
                <div className="bg-dark-purple p-8 rounded-lg">
                  <Icon name="growth" className="h-10 w-10 text-secondary mb-4" />
                  <h3 className="text-xl mb-2">Средний эффект парения</h3>
                  <p className="text-light-gray">
                    Более заметная анимация с зеленым свечением и увеличенным масштабированием.
                  </p>
                </div>
              </HoverElement>
            </ScrollAnimate>
            
            <ScrollAnimate animationType="fadeInUp" delay={0.3}>
              <HoverElement 
                floatEffect="large" 
                floatSpeed="fast" 
                hoverGlow="white"
                hoverScale={1.08}
                pulseShadow
              >
                <div className="bg-dark-purple p-8 rounded-lg">
                  <Icon name="ai" className="h-10 w-10 text-accent-blue mb-4" />
                  <h3 className="text-xl mb-2">Активный эффект парения</h3>
                  <p className="text-light-gray">
                    Интенсивная анимация с белым свечением, повышенным масштабированием и пульсацией.
                  </p>
                </div>
              </HoverElement>
            </ScrollAnimate>
          </div>
        </div>
      </section>

      {/* Секция с картами глубины */}
      <section className="py-20 bg-site-bg">
        <div className="container">
          <ScrollAnimate animationType="fadeInUp">
            <h2 className="text-center mb-12">Карты с эффектом глубины</h2>
          </ScrollAnimate>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ScrollAnimate animationType="fadeInLeft" delay={0.1}>
              <DepthCard 
                depthLevel={2}
                glowType="primary"
                glowIntensity={1}
                borderColor="dark"
                rounded="lg"
              >
                <div className="p-6">
                  <h3 className="text-xl mb-3">Базовая глубина</h3>
                  <p className="text-light-gray mb-4">
                    Карточка с легким эффектом глубины и фиолетовым свечением.
                  </p>
                  <Button variant="primary" size="sm">Подробнее</Button>
                </div>
              </DepthCard>
            </ScrollAnimate>
            
            <ScrollAnimate animationType="fadeInUp" delay={0.2}>
              <DepthCard 
                depthLevel={3}
                glowType="secondary"
                glowIntensity={2}
                borderColor="primary"
                rounded="lg"
                tiltOnHover
                maxTiltAngle={8}
              >
                <div className="p-6">
                  <h3 className="text-xl mb-3">Средняя глубина с наклоном</h3>
                  <p className="text-light-gray mb-4">
                    Карточка со средним эффектом глубины, зеленым свечением и эффектом наклона при наведении.
                  </p>
                  <Button variant="secondary" size="sm">Исследовать</Button>
                </div>
              </DepthCard>
            </ScrollAnimate>
            
            <ScrollAnimate animationType="fadeInRight" delay={0.3}>
              <DepthCard 
                depthLevel={4}
                glowType="blue"
                glowIntensity={3}
                borderColor="custom"
                customBorderClass="border border-accent-blue/30"
                rounded="xl"
                background="gradient-primary"
              >
                <div className="p-6">
                  <h3 className="text-xl mb-3">Продвинутая глубина</h3>
                  <p className="text-white mb-4">
                    Карточка с продвинутым эффектом глубины, синим свечением и градиентным фоном.
                  </p>
                  <Button variant="accent" size="sm">Активировать</Button>
                </div>
              </DepthCard>
            </ScrollAnimate>
          </div>
        </div>
      </section>

      {/* Секция с градиентами, следующими за курсором */}
      <section className="py-20 bg-dark-purple">
        <div className="container">
          <ScrollAnimate animationType="fadeInUp">
            <h2 className="text-center mb-12">Интерактивные градиенты</h2>
          </ScrollAnimate>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ScrollAnimate animationType="fadeInLeft" delay={0.2}>
              <GradientFollow 
                gradientType="primary"
                gradientSize={40}
                intensity={0.7}
                blur
                blurSize={30}
              >
                <div className="p-10 min-h-[300px] flex flex-col justify-center items-center text-center">
                  <Icon name="chart" className="h-16 w-16 text-primary mb-6" />
                  <h3 className="text-2xl mb-4">Градиент, следующий за курсором</h3>
                  <p className="text-light-gray max-w-md">
                    Перемещайте курсор по этому блоку, чтобы увидеть, как градиент плавно следует за вашими движениями.
                  </p>
                </div>
              </GradientFollow>
            </ScrollAnimate>

            <ScrollAnimate animationType="fadeInRight" delay={0.3}>
              <GradientFollow 
                gradientType="secondary"
                gradientSize={60}
                intensity={0.6}
                blur
                blurSize={40}
                followSpeed={0.3}
              >
                <div className="p-10 min-h-[300px] flex flex-col justify-center items-center text-center">
                  <Icon name="process" className="h-16 w-16 text-secondary mb-6" />
                  <h3 className="text-2xl mb-4">Плавное следование градиента</h3>
                  <p className="text-light-gray max-w-md">
                    Этот градиент имеет уменьшенную скорость следования, создавая эффект плавности и инерции.
                  </p>
                </div>
              </GradientFollow>
            </ScrollAnimate>
          </div>
        </div>
      </section>

      {/* Секция с анимацией при скроллинге */}
      <section className="py-20 bg-site-bg">
        <div className="container">
          <ScrollAnimate animationType="fadeInUp">
            <h2 className="text-center mb-16">Анимации при скроллинге</h2>
          </ScrollAnimate>

          <div className="space-y-24">
            <ScrollAnimate animationType="fadeInUp">
              <div className="bg-dark-purple p-8 rounded-xl text-center max-w-2xl mx-auto">
                <h3 className="text-2xl mb-4">Простое появление</h3>
                <p className="text-light-gray">
                  Этот блок плавно появляется при прокрутке страницы. Базовая анимация 
                  fadeInUp отлично подходит для большинства случаев.
                </p>
              </div>
            </ScrollAnimate>

            <ScrollAnimate animationType="fadeInLeft" delay={0.2}>
              <div className="bg-dark-purple p-8 rounded-xl text-center max-w-2xl mx-auto">
                <h3 className="text-2xl mb-4">Появление слева</h3>
                <p className="text-light-gray">
                  Элемент появляется из-за левой границы экрана с небольшой задержкой 
                  для создания более динамичного эффекта.
                </p>
              </div>
            </ScrollAnimate>

            <ScrollAnimate animationType="zoomIn" delay={0.1}>
              <div className="bg-dark-purple p-8 rounded-xl text-center max-w-2xl mx-auto">
                <h3 className="text-2xl mb-4">Эффект увеличения</h3>
                <p className="text-light-gray">
                  Этот блок появляется с эффектом увеличения масштаба, привлекая 
                  больше внимания к важному содержимому.
                </p>
              </div>
            </ScrollAnimate>

            <ScrollAnimate animationType="blur" delay={0.2}>
              <div className="bg-dark-purple p-8 rounded-xl text-center max-w-2xl mx-auto">
                <h3 className="text-2xl mb-4">Эффект размытия</h3>
                <p className="text-light-gray">
                  При прокрутке элемент появляется из размытого состояния, создавая 
                  современный и стильный эффект фокусировки.
                </p>
              </div>
            </ScrollAnimate>
          </div>
        </div>
      </section>

      {/* Секция с параллакс-эффектами */}
      <section className="py-20 bg-medium-gray">
  <div className="container">
    <ScrollAnimate animationType="fadeInUp">
      <h2 className="text-center mb-12">Параллакс-эффекты</h2>
    </ScrollAnimate>

    <div className="relative min-h-[600px] overflow-hidden rounded-xl bg-dark-purple mb-20">
      <div className="absolute inset-0 z-10 flex items-center justify-center p-8">
        <ScrollAnimate animationType="fadeIn">
          <div className="text-center max-w-lg">
            <h3 className="text-3xl mb-4">Многослойный параллакс</h3>
            <p className="text-light-gray mb-6">
              Различные элементы движутся с разной скоростью при прокрутке, 
              создавая ощущение глубины и объема.
            </p>
            <Button variant="primary">Исследовать</Button>
          </div>
        </ScrollAnimate>
      </div>

            {/* Параллакс-слои */}
            <ParallaxElement 
        speed={-0.2} 
        direction="vertical" 
        maxOffset={50}
        className="absolute top-0 left-[10%] w-20 h-20 bg-primary/20 rounded-full backdrop-blur-md"
      >
        <div className="w-full h-full"></div>
      </ParallaxElement>
      
      <ParallaxElement 
        speed={0.3} 
        direction="vertical" 
        maxOffset={70}
        className="absolute top-[30%] right-[15%] w-40 h-40 bg-secondary/20 rounded-full backdrop-blur-md"
      >
        <div className="w-full h-full"></div>
      </ParallaxElement>
      
      <ParallaxElement 
        speed={-0.4} 
        direction="vertical" 
        maxOffset={90}
        className="absolute bottom-[10%] left-[20%] w-32 h-32 bg-accent-blue/20 rounded-full backdrop-blur-md"
      >
        <div className="w-full h-full"></div>
      </ParallaxElement>
      
      <ParallaxElement 
        speed={0.25} 
        direction="horizontal" 
        maxOffset={60}
        className="absolute top-[20%] left-[30%] w-16 h-16 bg-primary/30 rounded-full backdrop-blur-md"
      >
        <div className="w-full h-full"></div>
      </ParallaxElement>
      
      <ParallaxElement 
        speed={-0.35} 
        direction="horizontal" 
        maxOffset={80}
        className="absolute bottom-[30%] right-[25%] w-24 h-24 bg-secondary/30 rounded-full backdrop-blur-md"
      >
        <div className="w-full h-full"></div>
      </ParallaxElement>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <ScrollAnimate animationType="fadeInLeft" delay={0.1}>
        <div className="relative overflow-hidden rounded-xl bg-dark-purple p-8 min-h-[300px]">
          <ParallaxElement 
            speed={-0.2} 
            direction="vertical" 
            continuous 
            continuousSpeed={0.5}
            className="absolute right-[-5%] top-[-5%] w-40 h-40 bg-primary/20 rounded-full blur-2xl"
          >
            <div className="w-full h-full"></div>
          </ParallaxElement>
          
          <div className="relative z-10">
            <h3 className="text-2xl mb-4">Непрерывное движение</h3>
            <p className="text-light-gray mb-4">
              Элементы могут двигаться непрерывно, независимо от прокрутки, 
              создавая динамичный фон для содержимого.
            </p>
            <Button variant="ghost">Подробнее</Button>
          </div>
        </div>
      </ScrollAnimate>

      <ScrollAnimate animationType="fadeInRight" delay={0.2}>
        <div className="relative overflow-hidden rounded-xl bg-dark-purple p-8 min-h-[300px]">
          <ParallaxElement 
            speed={0.3} 
            direction="horizontal" 
            continuous 
            continuousSpeed={0.7}
            className="absolute left-[-10%] bottom-[-10%] w-60 h-60 bg-secondary/20 rounded-full blur-2xl"
          >
            <div className="w-full h-full"></div>
          </ParallaxElement>
          
          <div className="relative z-10">
            <h3 className="text-2xl mb-4">Горизонтальный параллакс</h3>
            <p className="text-light-gray mb-4">
              Параллакс-эффект может применяться не только вертикально, 
              но и горизонтально, расширяя возможности дизайна.
            </p>
            <Button variant="ghost">Изучить</Button>
          </div>
        </div>
      </ScrollAnimate>
    </div>
  </div>
</section>

      {/* Завершающая CTA секция */}
      <section className="py-20">
        <GradientFollow 
          gradientType="primary"
          gradientSize={70}
          intensity={0.8}
          blur
          blurSize={50}
          continuousMovement
        >
          <div className="container text-center py-10">
            <ScrollAnimate animationType="fadeInUp">
              <h2 className="text-3xl md:text-4xl mb-6">Готовы использовать эти эффекты?</h2>
            </ScrollAnimate>
            
            <ScrollAnimate animationType="fadeInUp" delay={0.2}>
              <p className="text-lg text-light-gray max-w-2xl mx-auto mb-10">
                Интегрируйте современные эффекты и анимации в свои проекты, 
                чтобы создавать превосходные пользовательские интерфейсы, 
                которые запоминаются и увлекают пользователей.
              </p>
            </ScrollAnimate>
            
            <ScrollAnimate animationType="fadeInUp" delay={0.3}>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="primary" size="lg">Начать проект</Button>
                <Button variant="secondary" size="lg">Примеры кода</Button>
              </div>
            </ScrollAnimate>
          </div>
        </GradientFollow>
      </section>
    </SiteLayout>
  );
}