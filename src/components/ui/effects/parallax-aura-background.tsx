// src/components/ui/effects/parallax-aura-background.tsx
"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ParallaxAuraBackgroundProps {
  scrollProgress: number;
  activeIndex: number;
  className?: string;
}

const ParallaxAuraBackground: React.FC<ParallaxAuraBackgroundProps> = ({ 
  scrollProgress, 
  activeIndex,
  className = ""
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    try {
      // Initialize Three.js
      const canvas = canvasRef.current;
      const renderer = new THREE.WebGLRenderer({ 
        canvas, 
        antialias: true, 
        alpha: true,
        premultipliedAlpha: false
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0);
      rendererRef.current = renderer;

      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      // Shader Material
      const fragmentShader = `
        precision highp float;
        uniform vec2 iResolution;
        uniform float iTime;
        uniform vec4 iMouse;
        uniform float iScrollOffset;
        uniform float iScrollProgress;
        uniform float iActiveIndex;
        
        #define S(a, b, t) smoothstep(a, b, t)
        #define sat(x) clamp(x, 0.0, 1.0)
        
        float hash(vec2 p) {
            p = fract(p * vec2(123.34, 456.21));
            p += dot(p, p + 45.32);
            return fract(p.x * p.y);
        }
        
        vec2 RaySphere(vec3 rd, vec3 p, float radius) {
            float l = dot(rd, p);
            float det = l*l - dot(p, p) + radius*radius;
            if (det < 0.0) return vec2(-1.0);
            float sd = sqrt(det);
            return vec2(l - sd, l + sd);
        }
        
        vec4 SphereBall(vec3 rd, vec3 p, float radius, float blur, vec3 color) {
            vec2 d = RaySphere(rd, p, radius);
            vec4 col = vec4(0.0);
            
            if(d.x > 0.0) {
                float sd = length(cross(p, rd));
                float edge = S(radius, mix(radius, 0.05, blur), sd);
                
                // Massive aura effect with intense blur
                float auraRadius = radius * 4.0;
                float auraEdge = S(auraRadius, radius * 0.3, sd);
                float aura = auraEdge * 0.8 * (1.0 - blur * 0.3);
                
                float mask = edge * 0.6 + aura;
                
                vec3 lightDir = normalize(vec3(0.3, -0.5, -0.8));
                vec3 normal = normalize(p - rd * d.x);
                float light = sat(dot(lightDir, normal) * 0.7 + 0.8);
                
                // Architeq color palette
                vec3 coreColor = mix(color, vec3(1.0, 0.95, 1.0), edge * 0.4);
                vec3 auraColor = color * 0.9;
                vec3 finalColor = mix(auraColor, coreColor, edge * 0.6);
                
                col = vec4(light * finalColor, mask);
            }
            return col;
        }
        
        void main() {
            vec2 uv = (gl_FragCoord.xy - 0.5 * iResolution.xy) / iResolution.y;
            float t = iTime * 0.2;
            
            // Enhanced parallax effect based on scroll
            float cameraY = iScrollProgress * 5.0;
            uv.y += cameraY;
            
            vec3 rd = normalize(vec3(uv, 1.0));
            
            vec4 col = vec4(0.0);
            
            // Architeq color palette - только фиолетовые и белые тона
            vec3 primaryColor = mix(
                vec3(0.46, 0.29, 0.95),  // Основной фиолетовый #7747CF
                vec3(0.7, 0.29, 0.95),   // Акцентный фиолетовый #B24BF3
                sin(t * 0.2) * 0.5 + 0.5  // Убрали зависимость от activeIndex
            );
            
            vec3 secondaryColor = mix(
                vec3(0.9, 0.9, 1.0),     // Почти белый с фиолетовым оттенком
                vec3(1.0, 1.0, 1.0),     // Чистый белый
                cos(t * 0.15) * 0.5 + 0.5  // Убрали зависимость от activeIndex
            );
            
            // Large main aura spheres - массивные сферы
            for(float i = 0.0; i < 12.0; i++) {
                float hashX = fract(sin(i * 536.3) * 7464.4);
                float hashY = fract(sin(i * 234.5) * 8573.2);
                float hashZ = fract(sin(i * 657.8) * 9456.3);
                
                float x = (hashX * 2.0 - 1.0) * 25.0;
                float baseY = (hashY * 2.0 - 1.0) * 30.0;
                
                // Enhanced parallax movement based on depth
                float depth = i / 12.0;
                float parallaxSpeed = mix(1.5, 0.1, depth);
                float y = mod(baseY - iScrollOffset * parallaxSpeed, 60.0) - 30.0;
                
                float z = mix(25.0, 2.0, depth);
                
                // Slow floating animation
                x += sin(t * 0.4 + hashY * 4.0) * 4.0;
                y += cos(t * 0.3 + hashX * 3.0) * 3.0;
                
                float depthFactor = 1.0 - (z - 2.0) / 23.0;
                float sphereRadius = mix(3.0, 8.0, depthFactor);
                
                // Heavy blur for that dreamy effect - убрали зависимость от activeIndex
                float blur = mix(0.6, 0.9, depth) * (1.0 + sin(t * 0.25) * 0.2);
                
                // Color variation based on sphere position - только фиолетово-белые тона
                vec3 sphereColor = mix(primaryColor, secondaryColor, 
                    sin(hashX * 6.0 + t * 0.3) * 0.5 + 0.5);
                
                vec4 sphere = SphereBall(rd, vec3(x, y, z), sphereRadius, blur, sphereColor);
                
                // Enhanced alpha for more intensity
                float alphaMultiplier = mix(0.8, 1.2, 1.0 - depth * 0.4);
                sphere.a *= alphaMultiplier;
                
                col = mix(col, sphere, sphere.a * (1.0 - col.a * 0.6));
            }
            
            // Medium floating aura spheres
            for(float i = 0.0; i < 20.0; i++) {
                float hashX = fract(sin(i * 1234.5) * 5432.1);
                float hashY = fract(sin(i * 6543.2) * 3210.9);
                float hashZ = fract(sin(i * 9876.5) * 2109.8);
                
                float x = (hashX * 2.0 - 1.0) * 40.0;
                float fallSpeed = hashZ * 0.2 + 0.05;
                float baseY = (hashY * 2.0 - 1.0) * 40.0;
                float timeY = mod(baseY - t * fallSpeed, 80.0) - 40.0;
                
                float dustDepth = hashZ;
                float dustParallaxSpeed = mix(1.0, 0.05, dustDepth);
                float y = mod(timeY - iScrollOffset * dustParallaxSpeed, 80.0) - 40.0;
                
                float z = mix(30.0, 1.0, dustDepth);
                
                // Enhanced floating motion
                x += sin(t * 0.25 + hashY * 8.0) * 6.0;
                y += cos(t * 0.2 + hashX * 6.0) * 4.0;
                
                float dustRadius = mix(1.5, 4.0, 1.0 - dustDepth);
                float blur = mix(0.7, 0.95, dustDepth);
                
                vec3 dustColor = mix(primaryColor, secondaryColor, hashZ);
                dustColor *= mix(0.6, 0.9, 1.0 - dustDepth);
                
                vec4 dust = SphereBall(rd, vec3(x, y, z), dustRadius, blur, dustColor);
                dust.a *= 0.4;
                
                col = mix(col, dust, dust.a * (1.0 - col.a));
            }
            
            // Enhanced color grading with Architeq palette - убрали зависимость от скролла
            float tint = t * 0.08;  // Только зависимость от времени
            vec3 tintColor = mix(
                vec3(1.0, 0.95, 1.05), // Слегка фиолетовый тинт
                vec3(0.98, 0.98, 1.0), // Слегка белый тинт
                sin(tint) * 0.5 + 0.5
            );
            col.rgb *= tintColor;
            
            // Dynamic global aura - независимая анимация
            float globalAura = length(col.rgb) * 0.25;
            vec3 auraGlow = mix(primaryColor, secondaryColor, 
                sin(t * 0.4) * 0.5 + 0.5);  // Убрали зависимость от activeIndex
            col.rgb += globalAura * auraGlow;
            
            // Subtle film grain
            float noise = hash(uv + t * 0.08) * 0.015;
            col.rgb += noise - 0.0075;
            
            // Softer edge fade for better integration
            float edgeFade = smoothstep(0.0, 0.2, min(
                min(gl_FragCoord.x / iResolution.x, 1.0 - gl_FragCoord.x / iResolution.x),
                min(gl_FragCoord.y / iResolution.y, 1.0 - gl_FragCoord.y / iResolution.y)
            ));
            col.a *= edgeFade * 0.95;
            
            gl_FragColor = col;
        }
      `;

      const vertexShader = `
        void main() {
            gl_Position = vec4(position, 1.0);
        }
      `;

      const material = new THREE.ShaderMaterial({
        uniforms: {
          iResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
          iTime: { value: 0 },
          iMouse: { value: new THREE.Vector4(0, 0, 0, 0) },
          iScrollOffset: { value: 0 },
          iScrollProgress: { value: 0 },
          iActiveIndex: { value: 0 }
        },
        fragmentShader,
        vertexShader,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });

      materialRef.current = material;

      const geometry = new THREE.PlaneGeometry(2, 2);
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      // Animation loop
      const startTime = Date.now();
      const animate = () => {
        const currentTime = Date.now();
        const elapsedTime = (currentTime - startTime) * 0.001;
        
        if (materialRef.current) {
          materialRef.current.uniforms.iTime.value = elapsedTime;
        }
        
        if (rendererRef.current && sceneRef.current) {
          rendererRef.current.render(sceneRef.current, camera);
        }
        
        animationIdRef.current = requestAnimationFrame(animate);
      };

      animate();

      // Resize handler
      const handleResize = () => {
        if (rendererRef.current && materialRef.current) {
          rendererRef.current.setSize(window.innerWidth, window.innerHeight);
          materialRef.current.uniforms.iResolution.value.set(window.innerWidth, window.innerHeight);
        }
      };

      window.addEventListener('resize', handleResize);

      // Cleanup
      return () => {
        window.removeEventListener('resize', handleResize);
        if (animationIdRef.current) {
          cancelAnimationFrame(animationIdRef.current);
        }
        if (rendererRef.current) {
          rendererRef.current.dispose();
        }
        if (materialRef.current) {
          materialRef.current.dispose();
        }
      };
    } catch (error) {
      console.error('Failed to initialize Three.js:', error);
    }
  }, []);

  // Update uniforms when props change
  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.iScrollProgress.value = scrollProgress;
      materialRef.current.uniforms.iScrollOffset.value = scrollProgress * 10;
      materialRef.current.uniforms.iActiveIndex.value = activeIndex;
    }
  }, [scrollProgress, activeIndex]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      style={{
        width: '100%',
        height: '100%',
        opacity: 0.6
      }}
    />
  );
};

export default ParallaxAuraBackground;