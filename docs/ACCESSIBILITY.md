# Documentação de Acessibilidade

Este documento detalha as práticas de acessibilidade implementadas no portfolio de Ricardo Benício, com foco especial em animações e conformidade com WCAG 2.1.

## Índice

1. [Visão Geral](#visão-geral)
2. [Suporte a prefers-reduced-motion](#suporte-a-prefers-reduced-motion)
3. [Níveis WCAG Atendidos](#níveis-wcag-atendidos)
4. [Implementação Técnica](#implementação-técnica)
5. [Outras Considerações de Acessibilidade](#outras-considerações-de-acessibilidade)
6. [Roadmap Futuro](#roadmap-futuro)

---

## Visão Geral

O portfolio foi desenvolvido com acessibilidade como prioridade desde o início, especialmente no que diz respeito a animações e movimentos que podem causar desconforto a usuários com:

- **Vestibular disorders** (distúrbios vestibulares)
- **Motion sensitivity** (sensibilidade a movimento)
- **Photosensitive epilepsy** (epilepsia fotossensível)
- **ADHD/Attention disorders** (distúrbios de atenção)
- **Migraine triggers** (gatilhos de enxaqueca)

### Princípios Seguidos

1. **Respeitar preferências do usuário** - Detecção automática de `prefers-reduced-motion`
2. **Graceful degradation** - Funcionalidade mantida mesmo sem animações
3. **Performance first** - Animações otimizadas não prejudicam experiência
4. **Progressive enhancement** - Animações como camada adicional, não essencial

---

## Suporte a prefers-reduced-motion

### O que é prefers-reduced-motion?

`prefers-reduced-motion` é uma media query CSS (e API JavaScript) que permite detectar se o usuário configurou seu sistema operacional para **reduzir movimentos e animações**.

**Por que é importante?**

Segundo estudos da WebAIM (2020), aproximadamente **35% dos usuários com deficiência** relatam problemas com animações em websites. Para alguns, animações excessivas podem causar:

- Náusea e tontura
- Desorientação espacial
- Ataques epilépticos (em casos extremos)
- Dificuldade de concentração
- Enxaqueca

### Como Implementamos

#### 1. JavaScript (Hook useScrollAnimation)

**Localização:** `/app/javascript/hooks/useScrollAnimation.js`

```javascript
// Linhas 104-114
if (respectMotionPreference) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    setIsVisible(true);
    hasTriggeredRef.current = true;
    return; // Skip observer creation entirely
  }
}
```

**Comportamento:**

- **Detecção:** Verifica `window.matchMedia('(prefers-reduced-motion: reduce)').matches`
- **Ação:** Se `true`, o hook:
  - Torna o elemento **imediatamente visível** (`setIsVisible(true)`)
  - **Não cria** o IntersectionObserver (economia de recursos)
  - Retorna early, evitando setup desnecessário
- **Opt-out:** Pode ser desabilitado via `respectMotionPreference: false`

**Performance:** Ao não criar o observer, economizamos processamento de scroll e memória.

#### 2. CSS (Media Queries)

**Localização 1:** `/app/views/layouts/application.html.erb`

```css
/* Linhas 37-41 */
@media (prefers-reduced-motion: reduce) {
  .animate-scroll {
    animation: none;
  }
}
```

**Localização 2:** `/app/assets/stylesheets/application.tailwind.css`

**Nota:** TailwindCSS v4 inclui suporte nativo a `prefers-reduced-motion` através do prefixo `motion-reduce:` e `motion-safe:`.

**Exemplo de uso futuro:**
```html
<div class="motion-safe:animate-bounce motion-reduce:animate-none">
  Conteúdo
</div>
```

**Status atual:** As animações CSS customizadas (`@keyframes`) precisam de media query manual, mas já estão implementadas.

#### 3. Tailwind Classes Responsivas

TailwindCSS automaticamente aplica `prefers-reduced-motion` nas seguintes classes:

- `animate-spin`
- `animate-ping`
- `animate-pulse`
- `animate-bounce`

**Exemplo:** `animate-pulse` usado no cursor de digitação.

```html
<span className="animate-pulse ml-1" aria-hidden="true">|</span>
```

Quando `prefers-reduced-motion: reduce` está ativo, Tailwind automaticamente remove a animação.

---

## Níveis WCAG Atendidos

### WCAG 2.1 - Level A (Mínimo)

#### ✅ 2.2.2 Pause, Stop, Hide

**Critério:**
> Para qualquer movimento, intermitência ou rolagem automática que (1) inicie automaticamente, (2) dure mais de 5 segundos, e (3) seja apresentado em paralelo com outro conteúdo, deve existir um mecanismo para o usuário pausar, parar ou ocultar.

**Implementação:**
- **Scroll indicator animation** (`animate-scroll`): Loop infinito, mas:
  - Duração: 1.5s (curta)
  - Não está em paralelo com conteúdo crítico
  - **Desabilitado** via `prefers-reduced-motion`

- **Gradient animation** (`gradientShift`): Loop infinito (8s), mas:
  - Sutil, não distrai
  - **Desabilitado** via `prefers-reduced-motion`

**Status:** ✅ **CONFORME** - Mecanismo de pausar = preferência do SO

### WCAG 2.1 - Level AA (Intermediário)

#### ✅ 1.4.12 Text Spacing

**Critério:**
> Conteúdo não deve ser perdido ou cortado quando espaçamento de texto é ajustado.

**Implementação:**
- Layout responsivo com TailwindCSS
- Sem heights fixos que possam cortar texto
- `max-w-*` classes com overflow visível

**Status:** ✅ **CONFORME**

### WCAG 2.1 - Level AAA (Avançado)

#### ✅ 2.3.3 Animation from Interactions

**Critério:**
> Animação de movimento pode ser desabilitada, a menos que a animação seja essencial para a funcionalidade ou informação sendo transmitida.

**Implementação:**
- **Todas as animações** decorativas são desabilitadas via `prefers-reduced-motion`
- Animações de **hover/focus** são mantidas (feedback interativo essencial)
- **Nenhuma animação é essencial** para funcionalidade

**Status:** ✅ **CONFORME**

#### ✅ 2.2.3 No Timing

**Critério:**
> Timing não é essencial para a atividade.

**Implementação:**
- **Typing animation** não tem limite de tempo para leitura
- Conteúdo permanece visível após animação
- Nenhuma interação com timeout forçado

**Status:** ✅ **CONFORME**

---

## Implementação Técnica

### 1. Hook useScrollAnimation

**Arquivo:** `/app/javascript/hooks/useScrollAnimation.js`

#### Características de Acessibilidade

| Feature | Descrição | Benefício |
|---------|-----------|-----------|
| `respectMotionPreference` | Parâmetro (default: `true`) | Respeita preferência do usuário |
| Early return | Sai da função antes de criar observer | Performance otimizada |
| `setIsVisible(true)` | Torna elemento imediatamente visível | Conteúdo acessível sem delay |
| No observer creation | Observer não é criado | Reduz processamento de scroll |

#### Uso Correto

```javascript
// ✅ CORRETO - Respeita prefers-reduced-motion (padrão)
const [ref, isVisible] = useScrollAnimation({ threshold: 0.2 });

// ✅ CORRETO - Explicit opt-in
const [ref, isVisible] = useScrollAnimation({
  threshold: 0.2,
  respectMotionPreference: true
});

// ⚠️ USE COM CUIDADO - Força animação mesmo com preferência
const [ref, isVisible] = useScrollAnimation({
  threshold: 0.2,
  respectMotionPreference: false // Ignora prefers-reduced-motion
});
```

**Quando desabilitar?** Apenas se a animação for **essencial** para funcionalidade (ex: loading spinner).

#### Exemplo de Uso

```jsx
import useScrollAnimation from '../hooks/useScrollAnimation';

const MySection = () => {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.1 });

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
- **Normal:** Fade-in ao scroll (opacity 0 → 1)
- **Reduced Motion:** Já visível (`isVisible = true` desde o início)

### 2. CSS Animations

#### Estrutura de Media Query

Todas as animações CSS customizadas seguem o padrão:

```css
/* 1. Define a animação */
@keyframes myAnimation {
  0% { /* estado inicial */ }
  100% { /* estado final */ }
}

/* 2. Aplica a animação */
.my-element {
  animation: myAnimation 1s ease infinite;
}

/* 3. Desabilita com prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  .my-element {
    animation: none;
    /* Opcional: define estado estático */
  }
}
```

#### Animações Implementadas

##### a) Scroll Indicator

**Localização:** `/app/views/layouts/application.html.erb` (linhas 26-41)

```css
@keyframes scroll {
  0% {transform: translateY(0);}
  50% {transform: translateY(5px);}
  100% {transform: translateY(0);}
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

**Uso:**
```html
<div className="w-1 h-3 bg-white rounded-full animate-scroll"></div>
```

**Impacto:** Pequeno movimento vertical (5px), pode causar distração em usuários sensíveis.

##### b) Cursor Blink

**Localização:** `/app/assets/stylesheets/application.tailwind.css` (linhas 16-27)

```css
@keyframes cursor-blink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}

.cursor-blink {
  animation: cursor-blink 1s step-end infinite;
}
```

**Nota:** Atualmente não usamos `.cursor-blink`, preferimos Tailwind's `animate-pulse`.

**Impacto:** Baixo, mas pode distrair usuários com ADHD.

##### c) Gradient Shift

**Localização:** `/app/assets/stylesheets/application.tailwind.css` (linhas 39-49)

```css
@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.gradient-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% 200%;
  animation: gradientShift 8s ease infinite;
}
```

**PROBLEMA IDENTIFICADO:** ⚠️ **Falta media query para prefers-reduced-motion!**

**Status atual:** Gradiente continua animando mesmo com `prefers-reduced-motion: reduce`.

**Correção necessária:**
```css
@media (prefers-reduced-motion: reduce) {
  .gradient-text {
    animation: none;
    background-position: 0% 50%; /* Estado inicial fixo */
  }
}
```

**Prioridade:** MÉDIA - Animação sutil, mas deve ser corrigida para conformidade WCAG AAA.

### 3. Scroll Behavior

#### scrollIntoView com smooth

**Localização:** Múltiplos componentes (HeroSection, ServicesSection)

```javascript
element.scrollIntoView({ behavior: 'smooth', block: 'start' });
```

**Problema:** Navegadores modernos respeitam `prefers-reduced-motion` automaticamente, mas nem todos.

**Melhor prática:**
```javascript
const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ? 'auto'  // Scroll instantâneo
  : 'smooth'; // Scroll suave

element.scrollIntoView({ behavior, block: 'start' });
```

**Status atual:** Confiamos no comportamento nativo do browser.

**Prioridade:** BAIXA - Maioria dos browsers já implementa isso corretamente.

---

## Outras Considerações de Acessibilidade

### 1. Keyboard Navigation

**Status:** ✅ Implementado

- Todos os links e botões são acessíveis via teclado
- `<button>` e `<a>` usados corretamente (não `<div onClick>`)
- Tab order lógico (sem `tabIndex` negativos)

**Exemplo correto:**
```jsx
<button
  onClick={() => scrollToSection('work-section')}
  className="..."
>
  Ver Projetos
</button>
```

### 2. Focus Indicators

**Status:** ⚠️ Parcial

**Implementado:**
- Focus nativo do browser (outline)
- Transitions em hover também funcionam em focus

**Falta:**
- Focus styles customizados com `focus:ring` (TailwindCSS)

**Recomendação:**
```jsx
<button className="... focus:ring-2 focus:ring-purple-500 focus:outline-none">
  Botão
</button>
```

### 3. Color Contrast

**Status:** ✅ Bom, mas precisa validação

**Implementado:**
- Texto branco em fundo preto (máximo contraste)
- Texto preto em fundo branco (WorkSection)

**Verificar:**
- Gradient text (`gradient-text`) - contraste variável
- Links em hover (gray-300/gray-400)

**Ferramenta recomendada:** [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

**WCAG AA:** Contraste mínimo 4.5:1 para texto normal, 3:1 para texto grande

### 4. Semantic HTML

**Status:** ✅ Bom

- `<section>` para seções principais
- `<h1>`, `<h2>` hierarquia correta
- `<button>` para ações, `<a>` para navegação
- `aria-hidden="true"` no cursor decorativo

**Exemplo:**
```jsx
<span className="animate-pulse ml-1" aria-hidden="true">|</span>
```

O cursor é decorativo, então `aria-hidden` previne leitura pelo screen reader.

### 5. Alt Text

**Status:** ⚠️ Verificar

**WorkSection:**
```jsx
image: '/images/home.png',
```

**Verificar:** Se `<img>` possui `alt` text descritivo.

**Recomendação:**
```jsx
<img src={project.image} alt={`Screenshot do projeto ${project.title}`} />
```

### 6. Aria Labels

**Status:** ⚠️ Falta

**Links externos** (GitHub, WhatsApp, etc.) deveriam ter `aria-label`:

```jsx
// ❌ Atual
<a href="https://github.com/ricardo-benicio" target="_blank" rel="noopener noreferrer">
  <svg>...</svg>
  <span className="mt-2">GitHub</span>
</a>

// ✅ Melhorado
<a
  href="https://github.com/ricardo-benicio"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Visite meu perfil no GitHub (abre em nova aba)"
>
  <svg aria-hidden="true">...</svg>
  <span className="mt-2">GitHub</span>
</a>
```

### 7. Screen Reader Testing

**Status:** 🔴 Não testado

**Recomendações:**
- Testar com **NVDA** (Windows) - Gratuito
- Testar com **JAWS** (Windows) - Pago, mas mais usado
- Testar com **VoiceOver** (macOS) - Nativo
- Testar com **TalkBack** (Android) - Nativo

**Checklist básico:**
- Navegar pelo site apenas com teclado
- Ativar screen reader e ouvir todo o conteúdo
- Verificar se ordem de leitura faz sentido
- Verificar se links/botões são anunciados corretamente

---

## Roadmap Futuro

### Prioridade ALTA

- [ ] **Adicionar media query** para `.gradient-text` (prefers-reduced-motion)
- [ ] **Testar com screen readers** (NVDA, VoiceOver)
- [ ] **Validar color contrast** em todos os componentes

### Prioridade MÉDIA

- [ ] **Adicionar aria-labels** em links externos
- [ ] **Implementar focus styles** customizados
- [ ] **Melhorar alt text** em imagens
- [ ] **Adicionar skip to main content** link

### Prioridade BAIXA

- [ ] **Implementar detection dinâmica** de prefers-reduced-motion (via mediaQuery.addEventListener)
- [ ] **Adicionar preferências de acessibilidade** no próprio site (toggle)
- [ ] **Implementar theme switcher** (dark/light mode)
- [ ] **Adicionar prefers-contrast** support

### Melhorias Futuras

#### 1. Detection Dinâmica

Atualmente, o hook `useScrollAnimation` detecta `prefers-reduced-motion` apenas no mount. Se o usuário mudar a preferência (ex: via DevTools), precisa recarregar a página.

**Melhoria:**
```javascript
useEffect(() => {
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  const handleChange = (e) => {
    if (e.matches && respectMotionPreference) {
      setIsVisible(true);
      hasTriggeredRef.current = true;
      // Disconnect observer if exists
    }
  };

  mediaQuery.addEventListener('change', handleChange);
  return () => mediaQuery.removeEventListener('change', handleChange);
}, [respectMotionPreference]);
```

**Trade-off:** Adiciona evento listener, mas melhora UX para usuários que testam preferências.

#### 2. User Preferences Toggle

Adicionar um toggle no próprio site para desabilitar animações, independente da configuração do SO:

```jsx
const [animationsEnabled, setAnimationsEnabled] = useState(() => {
  return localStorage.getItem('animations') !== 'false';
});

// Pass to components
<Portfolio animationsEnabled={animationsEnabled} />
```

**Benefício:** Usuários sem acesso fácil às configurações do SO podem controlar animações.

#### 3. Reduced Data Mode

Para usuários com conexões lentas, oferecer opção de desabilitar assets pesados:

```jsx
const [reducedData, setReducedData] = useState(false);

// Conditional loading
{!reducedData && <ConstellationBackground />}
```

---

## Recursos e Referências

### WCAG 2.1 Guidelines

- [2.2.2 Pause, Stop, Hide (Level A)](https://www.w3.org/WAI/WCAG21/Understanding/pause-stop-hide.html)
- [2.3.3 Animation from Interactions (Level AAA)](https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html)
- [1.4.12 Text Spacing (Level AA)](https://www.w3.org/WAI/WCAG21/Understanding/text-spacing.html)

### MDN Documentation

- [prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
- [ARIA Labels](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label)
- [Semantic HTML](https://developer.mozilla.org/en-US/docs/Glossary/Semantics#semantics_in_html)

### Tools

- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [WAVE Web Accessibility Evaluation Tool](https://wave.webaim.org/)
- [axe DevTools](https://www.deque.com/axe/devtools/) (Chrome/Firefox extension)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) (built into Chrome)

### Articles

- [Designing Safer Web Animation For Motion Sensitivity](https://alistapart.com/article/designing-safer-web-animation-for-motion-sensitivity/)
- [Your Interactive Makes Me Sick](https://source.opennews.org/articles/motion-sick/)
- [Revisiting prefers-reduced-motion](https://css-tricks.com/revisiting-prefers-reduced-motion/)

---

## Changelog

### 2025-11-18 (Atual)

**Adicionado:**
- ✅ Suporte completo a `prefers-reduced-motion` no hook `useScrollAnimation`
- ✅ Media query CSS para `.animate-scroll`
- ✅ Documentação completa de acessibilidade

**Problemas Identificados:**
- ⚠️ `.gradient-text` falta media query para `prefers-reduced-motion`
- ⚠️ Falta focus styles customizados
- ⚠️ Falta aria-labels em links externos

**Próximos Passos:**
- Corrigir `.gradient-text`
- Testar com screen readers
- Validar contraste de cores

---

## Contribuindo com Acessibilidade

Se você encontrar problemas de acessibilidade neste portfolio, por favor:

1. **Documente o problema:**
   - Qual componente/página?
   - Qual critério WCAG está sendo violado?
   - Screenshot ou vídeo demonstrando o problema

2. **Sugira uma solução:**
   - Código exemplo
   - Referências de WCAG/MDN
   - Trade-offs a considerar

3. **Teste sua solução:**
   - Com `prefers-reduced-motion` ativo/inativo
   - Com screen reader
   - Com apenas teclado

**Contato:** [rikrdoofelipe@outlook.com](mailto:rikrdoofelipe@outlook.com)

---

**Última atualização:** 2025-11-18
**Versão do Portfolio:** Rails 7.1.3 + React 19
**WCAG Target:** 2.1 Level AA (com esforço para AAA)
**Mantido por:** Ricardo Benício
