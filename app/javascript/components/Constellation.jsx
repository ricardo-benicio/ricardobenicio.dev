import React, { useEffect, useRef } from 'react';

const Constellation = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    let connections = [];
    
    // Ajustar o canvas para ocupar toda a tela
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Criar partículas
    function initParticles() {
      particles = [];
      connections = [];
      
      // Criar pontos (estrelas) das constelações
      const particleCount = Math.floor(window.innerWidth / 15);
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3
        });
      }
      
      // Criar conexões entre pontos para formar constelações
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            connections.push({
              start: i,
              end: j,
              distance: distance
            });
          }
        }
      }
    }
    
    // Animar partículas
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(0, 0, 0, 1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Desenhar conexões
      ctx.strokeStyle = 'rgba(170, 170, 170, 0.5)';
      ctx.lineWidth = 0.2;
      connections.forEach(connection => {
        const p1 = particles[connection.start];
        const p2 = particles[connection.end];
        
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      });
      
      // Desenhar e atualizar partículas
      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(200, 200, 200, 0.8)';
        ctx.fill();
        
        // Atualizar posição
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Verificar limites da tela
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
      });
      
      // Recalcular conexões periodicamente
      if (Math.random() < 0.01) {
        connections = [];
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
              connections.push({
                start: i,
                end: j,
                distance: distance
              });
            }
          }
        }
      }
      
      animationFrameId = window.requestAnimationFrame(animate);
    }
    
    animate();
    
    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -1,
        display: 'block',
        background: 'black',
      }}
    />
  );
};

export default Constellation;
