# Quick Reference: prefers-reduced-motion

Referência rápida para desenvolvedores trabalhando com animações no portfolio.

## TL;DR

1. **Hook JavaScript** - Use `useScrollAnimation` com `respectMotionPreference: true` (padrão)
2. **CSS Customizado** - Sempre adicione `@media (prefers-reduced-motion: reduce)`
3. **Tailwind Utilities** - Já têm suporte nativo, sem código adicional
4. **Teste sempre** - DevTools > Rendering > Emulate prefers-reduced-motion

---

## Checklist Rápido

Ao adicionar uma nova animação:

```
[ ] Definir @keyframes e classe CSS
[ ] Adicionar @media (prefers-reduced-motion: reduce) { animation: none; }
[ ] Definir estado estático apropriado
[ ] Testar com emulation ativado no DevTools
[ ] Recarregar página após ativar/desativar emulation
```

---

## Code Snippets

### JavaScript - useScrollAnimation

```jsx
import useScrollAnimation from '../hooks/useScrollAnimation';

const MyComponent = () => {
  // ✅ CORRETO - Respeita prefers-reduced-motion (padrão)
  const [ref, isVisible] = useScrollAnimation({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <section
      ref={ref}
      className={`transition-opacity duration-700 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <h2>Meu Conteúdo</h2>
    </section>
  );
};
```

**Comportamento:**
- **Normal:** Fade-in ao scroll
- **Reduced Motion:** Já visível (isVisible = true)

---

### CSS - Animação Customizada

```css
/* 1. Define a animação */
@keyframes myAnimation {
  0% { transform: translateY(0); opacity: 0; }
  100% { transform: translateY(10px); opacity: 1; }
}

/* 2. Aplica a animação */
.my-element {
  animation: myAnimation 1s ease-in-out;
}

/* 3. SEMPRE adicionar: Desabilita com prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  .my-element {
    animation: none;
    /* Define estado estático final */
    transform: translateY(10px);
    opacity: 1;
  }
}
```

**Estados estáticos comuns:**
- Fade: `opacity: 1`
- Slide: `transform: translateX(0)`
- Scale: `transform: scale(1)`
- Rotate: `transform: rotate(0deg)`
- Gradiente: `background-position: 0% 50%`

---

### Tailwind - Utilities (Suporte Nativo)

```jsx
// ✅ JÁ FUNCIONA - Sem código adicional
<div className="animate-pulse">Pulsando</div>
<div className="animate-bounce">Pulando</div>
<div className="animate-spin">Girando</div>

// Tailwind automaticamente desabilita quando prefers-reduced-motion: reduce
```

**Classes com suporte nativo:**
- `animate-pulse`
- `animate-bounce`
- `animate-spin`
- `animate-ping`

---

## Testes Rápidos

### Chrome DevTools

```
1. F12 ou Ctrl+Shift+I
2. Ctrl+Shift+P (Command Palette)
3. Digite: "Show Rendering"
4. Emulate CSS media feature prefers-reduced-motion: reduce
5. Recarregar página (Ctrl+R)
```

### Console JavaScript

```javascript
// Verificar se está ativo
window.matchMedia('(prefers-reduced-motion: reduce)').matches
// true = ativo, false = inativo
```

### Firefox

```
1. about:config
2. Procurar: ui.prefersReducedMotion
3. Alterar para: 1 (reduce motion)
```

---

## Padrões do Projeto

### Animações que DEVEM respeitar prefers-reduced-motion

- ✅ Scroll indicator (bounce)
- ✅ Gradiente animado
- ✅ Cursor piscante
- ✅ Fade-in ao scroll
- ✅ Slide-in ao scroll
- ✅ Scale-in ao scroll

### Animações que PODEM continuar (feedback interativo)

- ⚠️ Hover transitions (< 300ms)
- ⚠️ Focus transitions
- ⚠️ Click/press feedback
- ⚠️ Loading spinners (essenciais)

### Animações que NÃO devem parar

- ❌ Typing animation (sequencial, não movimento)
- ❌ Progress bars (informação essencial)

---

## Exemplos do Portfolio

### HeroSection - Gradiente

```css
/* app/assets/stylesheets/application.tailwind.css */

.gradient-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% 200%;
  animation: gradientShift 8s ease infinite;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@media (prefers-reduced-motion: reduce) {
  .gradient-text {
    animation: none;
    background-position: 0% 50%;
  }
}
```

### HeroSection - Scroll Indicator

```css
/* app/views/layouts/application.html.erb */

@keyframes scroll {
  0% { transform: translateY(0); }
  50% { transform: translateY(5px); }
  100% { transform: translateY(0); }
}

.animate-scroll {
  animation: scroll 1.5s infinite;
}

@media (prefers-reduced-motion: reduce) {
  .animate-scroll {
    animation: none;
  }
}
```

### TypingAnimation - Cursor

```jsx
// app/javascript/components/TypingAnimation.jsx

<span className="animate-pulse ml-1" aria-hidden="true">|</span>

// Tailwind's animate-pulse já respeita prefers-reduced-motion
// Sem necessidade de código adicional
```

---

## Troubleshooting

### Problema: Animação não para

**Causa:** Página não foi recarregada após ativar emulation

**Solução:** `Ctrl+R` ou `Cmd+R`

---

### Problema: Hook não detecta preferência

**Causa:** Hook detecta apenas no mount

**Solução:** Recarregue a página

---

### Problema: CSS animation continua

**Causa:** Faltou `@media (prefers-reduced-motion: reduce)`

**Solução:** Adicione media query com `animation: none`

---

### Problema: Conteúdo não aparece

**Causa:** Estado estático não definido

**Solução:** Defina opacity/transform final na media query

---

## WCAG Quick Check

### Level AAA (2.3.3)

```
✅ Animação pode ser desabilitada?
✅ Animação não é essencial para funcionalidade?
✅ Conteúdo acessível sem animação?
```

Se todas **SIM** → Conforme WCAG AAA

### Level A (2.2.2)

```
✅ Animação > 5s pode ser pausada?
✅ Animação em paralelo com conteúdo?
```

Se **SIM** → Precisa mecanismo de pausar (prefers-reduced-motion)

---

## Recursos

### Documentação Completa

- [TESTING_REDUCED_MOTION.md](./TESTING_REDUCED_MOTION.md) - Guia de testes
- [ACCESSIBILITY.md](./ACCESSIBILITY.md) - Documentação de acessibilidade
- [REDUCED_MOTION_VALIDATION.md](./REDUCED_MOTION_VALIDATION.md) - Relatório de validação

### Links Externos

- [MDN: prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
- [WCAG 2.1 - 2.3.3](https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html)
- [Web.dev Guide](https://web.dev/prefers-reduced-motion/)

---

## Comandos Úteis

### Buscar animações no projeto

```bash
# Encontrar todos @keyframes
grep -r "@keyframes" app/

# Encontrar classes animate-*
grep -r "animate-" app/ --include="*.jsx" --include="*.erb"

# Verificar media queries
grep -r "prefers-reduced-motion" app/
```

### Validar conformidade

```bash
# Contar media queries
grep -c "@media (prefers-reduced-motion" app/assets/stylesheets/
grep -c "@media (prefers-reduced-motion" app/views/layouts/

# Listar animações sem media query (suspeitas)
# 1. Listar todos @keyframes
# 2. Verificar se cada um tem @media correspondente
```

---

## Contato

Dúvidas? Entre em contato:

**Ricardo Benício**
- Email: rikrdoofelipe@outlook.com
- GitHub: @ricardo-benicio

---

**Última atualização:** 2025-11-18
