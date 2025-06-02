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

      // Enhanced Shader Material with scroll-responsive animation
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
        
        vec4 SphereBall(vec3 rd, vec3 p, float radius, float blur, vec3 color, float intensity) {
            vec2 d = RaySphere(rd, p, radius);
            vec4 col = vec4(0.0);
            
            if(d.x > 0.0) {
                float sd = length(cross(p, rd));
                float edge = S(radius, mix(radius, 0.05, blur), sd);
                
                // Enhanced aura with scroll-responsive size
                float auraMultiplier = 1.5 + iScrollProgress * 1.0;
                float auraRadius = radius * auraMultiplier;
                float auraEdge = S(auraRadius, radius * 0.3, sd);
                float aura = auraEdge * intensity * (0.8 - blur * 0.1);
                
                float mask = edge * 0.5 + aura;
                
                vec3 lightDir = normalize(vec3(0.3, -0.5, -0.8));
                vec3 normal = normalize(p - rd * d.x);
                float light = sat(dot(lightDir, normal) * 0.8 + 0.9);
                
                // Dynamic color mixing based on active index
                float colorShift = sin(iActiveIndex * 0.5 + iTime * 0.1) * 0.3;
                vec3 coreColor = mix(color, vec3(1.0, 0.98, 1.0), edge * 0.5);
                vec3 auraColor = mix(color, color * 1.2, colorShift);
                vec3 finalColor = mix(auraColor, coreColor, edge * 0.7);
                
                col = vec4(light * finalColor * intensity, mask);
            }
            return col;
        }
        
        void main() {
            vec2 uv = (gl_FragCoord.xy - 0.5 * iResolution.xy) / iResolution.y;
            float t = iTime * 0.25; // Slower base animation
            
            // Scroll-responsive camera movement
            float scrollInfluence = iScrollProgress * 2.0;
            vec3 rd = normalize(vec3(uv, 1.0 + scrollInfluence * 0.1));
            
            vec4 col = vec4(0.0);
            
            // Architeq enhanced color palette with scroll responsiveness
            vec3 primaryColor = mix(
                vec3(0.46, 0.29, 0.95),  // #7747CF
                vec3(0.7, 0.29, 0.95),   // #B24BF3
                sin(t * 0.3 + iScrollProgress * 2.0) * 0.5 + 0.5
            );
            
            vec3 secondaryColor = mix(
                vec3(0.92, 0.92, 1.0),   // Almost white with purple tint
                vec3(1.0, 1.0, 1.0),     // Pure white
                cos(t * 0.2 + iScrollProgress * 1.5) * 0.5 + 0.5
            );
            
            // Main floating spheres - with scroll-responsive intensity
            float globalIntensity = 0.7 + iScrollProgress * 0.4;
            
            for(float i = 0.0; i < 10.0; i++) {
                float hashX = fract(sin(i * 536.3) * 7464.4);
                float hashY = fract(sin(i * 234.5) * 8573.2);
                float hashZ = fract(sin(i * 657.8) * 9456.3);
                
                // Enhanced movement with scroll influence
                float x = (hashX * 2.0 - 1.0) * (30.0 + scrollInfluence * 10.0);
                float y = (hashY * 2.0 - 1.0) * (30.0 + scrollInfluence * 10.0);
                float z = mix(15.0, 3.0, i / 10.0) + scrollInfluence * 5.0;
                
                // More dynamic movement
                x += sin(t * 0.5 + hashY * 4.0 + i * 1.5 + scrollInfluence) * 12.0;
                y += cos(t * 0.4 + hashX * 3.5 + i * 1.2 + scrollInfluence) * 8.0;
                z += sin(t * 0.3 + i * 0.8 + scrollInfluence * 0.5) * 3.0;
                
                float sphereRadius = mix(2.5, 7.0, hashZ) * (1.0 + scrollInfluence * 0.3);
                float blur = mix(0.5, 0.85, hashZ);
                
                // Active index color influence
                float activeInfluence = sin(iActiveIndex + i * 0.7) * 0.4 + 0.6;
                vec3 sphereColor = mix(primaryColor, secondaryColor, 
                    sin(hashX * 5.0 + t * 0.4 + i * 0.6) * 0.5 + 0.5) * activeInfluence;
                
                vec4 sphere = SphereBall(rd, vec3(x, y, z), sphereRadius, blur, sphereColor, globalIntensity);
                
                // Enhanced blending
                sphere.a *= 0.8;
                col = mix(col, sphere, sphere.a * (1.0 - col.a * 0.7));
            }
            
            // Smaller floating particles with more dynamism
            for(float i = 0.0; i < 20.0; i++) {
                float hashX = fract(sin(i * 1234.5) * 5432.1);
                float hashY = fract(sin(i * 6543.2) * 3210.9);
                float hashZ = fract(sin(i * 9876.5) * 2109.8);
                
                float x = (hashX * 2.0 - 1.0) * (40.0 + scrollInfluence * 15.0);
                float y = (hashY * 2.0 - 1.0) * (40.0 + scrollInfluence * 15.0);
                float z = mix(20.0, 1.0, hashZ) + scrollInfluence * 8.0;
                
                // Enhanced particle movement
                x += sin(t * 0.3 + hashY * 8.0 + i * 0.9 + scrollInfluence * 1.2) * 8.0;
                y += cos(t * 0.25 + hashX * 7.0 + i * 1.1 + scrollInfluence * 1.1) * 6.0;
                z += sin(t * 0.2 + i * 0.6 + scrollInfluence * 0.8) * 2.0;
                
                float dustRadius = mix(0.8, 3.0, 1.0 - hashZ) * (1.0 + scrollInfluence * 0.2);
                float blur = 0.8;
                
                vec3 dustColor = mix(primaryColor * 0.7, secondaryColor * 0.9, hashZ) * globalIntensity;
                
                vec4 dust = SphereBall(rd, vec3(x, y, z), dustRadius, blur, dustColor, globalIntensity * 0.6);
                dust.a *= 0.4;
                
                col = mix(col, dust, dust.a * (1.0 - col.a * 0.85));
            }
            
            // Enhanced color grading with scroll influence
            float tint = t * 0.08 + iScrollProgress * 0.5;
            vec3 tintColor = mix(
                vec3(1.0, 0.96, 1.08),   // Purple tint
                vec3(0.99, 0.99, 1.02),  // White tint
                sin(tint) * 0.5 + 0.5
            );
            col.rgb *= tintColor;
            
            // Dynamic global aura with scroll responsiveness
            float globalAura = length(col.rgb) * (0.18 + iScrollProgress * 0.12);
            vec3 auraGlow = mix(primaryColor, secondaryColor, 
                sin(t * 0.4 + iScrollProgress * 2.0) * 0.5 + 0.5);
            col.rgb += globalAura * auraGlow;
            
            // Enhanced film grain with scroll influence
            float noise = hash(uv + t * 0.1 + iScrollProgress * 0.05) * 0.015;
            col.rgb += noise - 0.0075;
            
            // Scroll-responsive intensity
            col.rgb *= 1.0 + iScrollProgress * 0.3;
            
            // Enhanced edge fade
            float edgeFade = smoothstep(0.0, 0.25, min(
                min(gl_FragCoord.x / iResolution.x, 1.0 - gl_FragCoord.x / iResolution.x),
                min(gl_FragCoord.y / iResolution.y, 1.0 - gl_FragCoord.y / iResolution.y)
            ));
            col.a *= edgeFade * (0.85 + iScrollProgress * 0.15);
            
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
      materialRef.current.uniforms.iScrollOffset.value = scrollProgress * 15;
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
        opacity: 0.75
      }}
    />
  );
};

export default ParallaxAuraBackground;