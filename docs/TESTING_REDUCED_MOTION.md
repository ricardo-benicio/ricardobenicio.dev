# Guia de Testes: prefers-reduced-motion

Este guia documenta como testar o suporte completo à preferência `prefers-reduced-motion` implementada no portfolio de Ricardo Benício.

## Índice

1. [Visão Geral](#visão-geral)
2. [Animações Implementadas](#animações-implementadas)
3. [Como Ativar prefers-reduced-motion](#como-ativar-prefers-reduced-motion)
4. [Testes por Componente](#testes-por-componente)
5. [Checklist de Validação](#checklist-de-validação)
6. [Troubleshooting](#troubleshooting)

---

## Visão Geral

O portfolio implementa suporte completo a `prefers-reduced-motion` em dois níveis:

- **JavaScript (Hook)**: `useScrollAnimation.js` detecta a preferência e desabilita animações de scroll
- **CSS**: Media queries `@media (prefers-reduced-motion: reduce)` desabilitam animações CSS

**Comportamento esperado:**

| Preferência | Animações de Scroll | Animações CSS | Cursor Piscante | Gradiente |
|-------------|---------------------|---------------|-----------------|-----------|
| **Normal** (padrão) | Ativas (fade-in ao scroll) | Ativas (bounce, pulse) | Ativo | Ativo |
| **Reduced** | Desabilitadas (conteúdo aparece imediatamente) | Desabilitadas | Ativo (cursor estático) | Ativo (estático) |

---

## Animações Implementadas

### 1. Animações JavaScript (via useScrollAnimation Hook)

Todas as seções que usam o hook `useScrollAnimation`:

- **WorkSection**: Cards de projetos aparecem com fade-in
- **AboutSection**: Seção "Sobre mim" com fade-in
- **ServicesSection**: Cards de serviços com fade-in
- **ContactSection**: Ícones de contato com fade-in

**Localização:** `/app/javascript/hooks/useScrollAnimation.js`

### 2. Animações CSS

#### a) Scroll Indicator (HeroSection)
```css
@keyframes scroll {
  0% {transform: translateY(0);}
  50% {transform: translateY(5px);}
  100% {transform: translateY(0);}
}
```
**Elemento:** Indicador "Role para baixo!" na seção hero
**Localização:** `/app/views/layouts/application.html.erb` (linhas 26-41)

#### b) Cursor Blink (TypingAnimation)
```css
@keyframes cursor-blink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}
```
**Elemento:** Cursor piscante no efeito de digitação
**Localização:** `/app/assets/stylesheets/application.tailwind.css` (linhas 16-27)

#### c) Gradient Shift (HeroSection)
```css
@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
```
**Elemento:** Texto gradiente animado "Olá, me chamo Ricardo"
**Localização:** `/app/assets/stylesheets/application.tailwind.css` (linhas 39-49)

#### d) Tailwind Utilities
- `animate-pulse`: Usado no cursor do TypingAnimation (fallback)
- `animate-scroll`: Usado no scroll indicator

---

## Como Ativar prefers-reduced-motion

### Google Chrome / Microsoft Edge

#### Método 1: DevTools (Recomendado para Testes)
1. Abra o DevTools (`F12` ou `Ctrl+Shift+I` / `Cmd+Option+I`)
2. Abra o Command Palette:
   - Windows/Linux: `Ctrl+Shift+P`
   - macOS: `Cmd+Shift+P`
3. Digite: `Show Rendering`
4. Na aba Rendering, localize **Emulate CSS media feature prefers-reduced-motion**
5. Selecione `prefers-reduced-motion: reduce`

**Para desativar:** Selecione `No emulation`

#### Método 2: Sistema Operacional
**Windows 10/11:**
1. Configurações > Facilidade de Acesso > Vídeo
2. Ative "Mostrar animações no Windows"

**macOS:**
1. System Preferences > Accessibility > Display
2. Marque "Reduce motion"

**Linux (GNOME):**
```bash
gsettings set org.gnome.desktop.interface enable-animations false
```

### Firefox

#### Método 1: about:config
1. Digite `about:config` na barra de endereços
2. Aceite o aviso
3. Procure por: `ui.prefersReducedMotion`
4. Altere o valor para `1` (reduce motion)

**Valores:**
- `0` = No preference
- `1` = Reduce motion
- `2` = No preference (detecta do SO)

#### Método 2: Sistema Operacional
Use as mesmas configurações do sistema listadas acima.

### Safari

Safari sempre respeita a configuração do sistema operacional macOS/iOS.

**macOS:**
1. System Preferences > Accessibility > Display
2. Marque "Reduce motion"

**iOS:**
1. Settings > Accessibility > Motion
2. Ative "Reduce Motion"

---

## Testes por Componente

### HeroSection

**Localização:** `/app/javascript/components/HeroSection.jsx`

#### Animações presentes:
1. **Gradiente animado** (texto "Olá, me chamo Ricardo")
2. **Efeito de digitação** (TypingAnimation)
3. **Scroll indicator** (bounce animation)

#### Teste 1: Gradiente (Normal)
```
✓ EXPECTED: Texto com gradiente animado movendo-se suavemente
✓ VISUAL: Cores roxas/rosa/azul em transição contínua (8s loop)
```

#### Teste 2: Gradiente (Reduced Motion)
```
✓ EXPECTED: Gradiente estático, sem movimento
✓ VISUAL: Cores roxas/rosa/azul fixas na posição inicial
```

#### Teste 3: Typing Animation (Normal)
```
✓ EXPECTED: Texto digitando letra por letra
✓ VISUAL: "Desenvolvedor Full-Stack" aparecendo progressivamente
✓ CURSOR: Piscando (1s interval)
```

#### Teste 4: Typing Animation (Reduced Motion)
```
⚠️ NOTA: O efeito de digitação continua funcionando
✓ EXPECTED: Texto digitando letra por letra (animação sequencial, não de movimento)
✓ CURSOR: Estático (não pisca)
```

**Por que?** O efeito de digitação é sequencial (letras aparecendo), não de movimento no espaço. Segundo WCAG, isso não é considerado "motion" problemático para usuários com sensibilidade a movimento.

#### Teste 5: Scroll Indicator (Normal)
```
✓ EXPECTED: Indicador de scroll com movimento vertical suave
✓ VISUAL: Bolinha branca subindo/descendo (5px amplitude)
✓ DURAÇÃO: 1.5s loop infinito
```

#### Teste 6: Scroll Indicator (Reduced Motion)
```
✓ EXPECTED: Indicador estático (sem movimento)
✓ VISUAL: Bolinha branca fixa no topo do container
```

**Como testar:**
1. Acesse a página principal
2. Observe o topo da página (seção hero)
3. Ative/desative prefers-reduced-motion via DevTools
4. Compare o comportamento antes/depois

---

### WorkSection

**Localização:** `/app/javascript/components/WorkSection.jsx`

#### Animações presentes:
1. **Fade-in ao scroll** (seção inteira)
2. **Carousel de projetos** (componente ProjectsCarousel)

#### Teste 1: Fade-in (Normal)
```
✓ EXPECTED: Seção invisível até scroll, então fade-in suave
✓ VISUAL: Opacidade 0 → 1 (transição CSS)
✓ THRESHOLD: 10% da seção visível
```

#### Teste 2: Fade-in (Reduced Motion)
```
✓ EXPECTED: Seção completamente visível desde o início
✓ VISUAL: Opacidade 1 (sem transição)
✓ COMPORTAMENTO: useScrollAnimation retorna isVisible=true imediatamente
```

**Como testar:**
1. Role até a seção "Trabalhos"
2. **Normal:** Recarregue a página, role devagar e observe o fade-in
3. **Reduced:** Ative prefers-reduced-motion, recarregue e observe que a seção já está visível

---

### AboutSection

**Localização:** `/app/javascript/components/AboutSection.jsx`

#### Animações presentes:
1. **Fade-in ao scroll** (seção inteira)
2. **Hover no link GitHub** (transition CSS)

#### Teste 1: Fade-in (Normal)
```
✓ EXPECTED: Seção invisível até scroll, então fade-in suave
✓ VISUAL: Opacidade 0 → 1
✓ THRESHOLD: 10% da seção visível
```

#### Teste 2: Fade-in (Reduced Motion)
```
✓ EXPECTED: Seção completamente visível desde o início
✓ VISUAL: Opacidade 1 (sem transição)
```

#### Teste 3: Hover Transition (Normal)
```
✓ EXPECTED: Cor muda suavemente ao passar o mouse
✓ VISUAL: white → gray-300 (transition-colors duration-300)
```

#### Teste 4: Hover Transition (Reduced Motion)
```
⚠️ NOTA: Transitions de hover NÃO são desabilitadas
✓ EXPECTED: Transição de cor continua funcionando
```

**Por que?** Transições de hover são consideradas "feedback interativo" e não causam problemas de acessibilidade. Desabilitá-las prejudicaria a UX.

**Como testar:**
1. Role até a seção "Sobre mim"
2. Observe o fade-in com/sem prefers-reduced-motion
3. Passe o mouse no link "Visite meu GitHub" (transition não muda)

---

### ServicesSection

**Localização:** `/app/javascript/components/ServicesSection.jsx`

#### Animações presentes:
1. **Fade-in ao scroll** (seção inteira)
2. **Hover nos cards** (border + shadow transition)
3. **Scroll smooth** (botão de seta)

#### Teste 1: Fade-in (Normal)
```
✓ EXPECTED: Seção invisível até scroll, então fade-in suave
✓ VISUAL: Opacidade 0 → 1
✓ THRESHOLD: 10% da seção visível
```

#### Teste 2: Fade-in (Reduced Motion)
```
✓ EXPECTED: Seção completamente visível desde o início
✓ VISUAL: Opacidade 1 (sem transição)
```

#### Teste 3: Scroll Smooth (Normal)
```
✓ EXPECTED: Scroll suave ao clicar na seta
✓ VISUAL: Animação de scroll até ContactSection
✓ MÉTODO: scrollIntoView({ behavior: 'smooth' })
```

#### Teste 4: Scroll Smooth (Reduced Motion)
```
✓ EXPECTED: Scroll instantâneo (sem animação)
✓ VISUAL: Pulo direto para ContactSection
✓ COMPORTAMENTO: Browser detecta prefers-reduced-motion e ignora 'smooth'
```

**Como testar:**
1. Role até a seção "Serviços"
2. Observe o fade-in com/sem prefers-reduced-motion
3. Clique no botão de seta e compare o comportamento do scroll

---

### ContactSection

**Localização:** `/app/javascript/components/ContactSection.jsx`

#### Animações presentes:
1. **Fade-in ao scroll** (seção inteira)
2. **Hover transitions** (ícones de redes sociais)

#### Teste 1: Fade-in (Normal)
```
✓ EXPECTED: Seção invisível até scroll, então fade-in suave
✓ VISUAL: Opacidade 0 → 1
✓ THRESHOLD: 10% da seção visível
```

#### Teste 2: Fade-in (Reduced Motion)
```
✓ EXPECTED: Seção completamente visível desde o início
✓ VISUAL: Opacidade 1 (sem transição)
```

#### Teste 3: Hover Transitions (Normal/Reduced)
```
✓ EXPECTED: Transições de hover continuam funcionando
✓ VISUAL: white → gray-400 ao passar o mouse
```

**Como testar:**
1. Role até a seção "Contatos"
2. Observe o fade-in com/sem prefers-reduced-motion
3. Passe o mouse nos ícones (transitions não mudam)

---

## Checklist de Validação

Use este checklist para validar manualmente o suporte a `prefers-reduced-motion`:

### Setup
- [ ] DevTools aberto com Rendering panel visível
- [ ] Emulation configurado: `prefers-reduced-motion: reduce`
- [ ] Página recarregada após ativar emulation

### HeroSection
- [ ] **Normal:** Gradiente animado se move suavemente
- [ ] **Reduced:** Gradiente estático (sem movimento)
- [ ] **Normal:** Cursor pisca no efeito de digitação
- [ ] **Reduced:** Cursor estático (não pisca)
- [ ] **Normal:** Scroll indicator faz bounce
- [ ] **Reduced:** Scroll indicator estático

### WorkSection
- [ ] **Normal:** Fade-in ao rolar até a seção
- [ ] **Reduced:** Seção visível desde o carregamento

### AboutSection
- [ ] **Normal:** Fade-in ao rolar até a seção
- [ ] **Reduced:** Seção visível desde o carregamento

### ServicesSection
- [ ] **Normal:** Fade-in ao rolar até a seção
- [ ] **Reduced:** Seção visível desde o carregamento
- [ ] **Normal:** Scroll suave ao clicar na seta
- [ ] **Reduced:** Scroll instantâneo

### ContactSection
- [ ] **Normal:** Fade-in ao rolar até a seção
- [ ] **Reduced:** Seção visível desde o carregamento

### Hook useScrollAnimation
- [ ] Hook detecta `prefers-reduced-motion` corretamente
- [ ] `respectMotionPreference=true` por padrão
- [ ] Observer não é criado quando reduced motion está ativo
- [ ] `isVisible` retorna `true` imediatamente

### CSS Media Queries
- [ ] `@media (prefers-reduced-motion: reduce)` presente no CSS
- [ ] Animação `scroll` desabilitada corretamente
- [ ] Animação `cursor-blink` desabilitada corretamente
- [ ] Animação `gradientShift` desabilitada corretamente

---

## Troubleshooting

### Problema: prefers-reduced-motion não está funcionando

**Sintomas:** Animações continuam ativas mesmo com emulation ativado.

**Soluções:**

1. **Recarregue a página**
   - O hook `useScrollAnimation` detecta a preferência apenas no mount
   - Pressione `Ctrl+R` (ou `Cmd+R`) após ativar a emulation

2. **Verifique o cache**
   - Limpe o cache do navegador (`Ctrl+Shift+Delete`)
   - Ou use hard reload: `Ctrl+Shift+R` (ou `Cmd+Shift+R`)

3. **Confirme a emulation**
   - DevTools > Rendering > "Emulate CSS media feature prefers-reduced-motion"
   - Deve estar selecionado `prefers-reduced-motion: reduce`

4. **Teste via JavaScript Console**
   ```javascript
   window.matchMedia('(prefers-reduced-motion: reduce)').matches
   // Deve retornar: true
   ```

### Problema: Apenas CSS animations param, mas scroll animations continuam

**Causa:** O JavaScript não detectou a mudança de preferência.

**Solução:** Recarregue a página. O hook não escuta mudanças dinâmicas por performance.

### Problema: Hover transitions não param

**Isso é esperado!** Transitions de hover/focus não devem ser desabilitadas, pois são feedback interativo essencial para UX.

### Problema: Typing animation continua funcionando

**Isso é esperado!** O efeito de digitação não é "motion" no sentido de movimento espacial, e sim aparecimento sequencial de texto. Isso é permitido pelo WCAG.

### Problema: scrollIntoView ainda é smooth

**Causa:** Browser não está respeitando a preferência para scroll suave.

**Solução:** Isso é comportamento do browser. Alguns navegadores desabilitam automaticamente, outros não. Para garantir, você pode:

```javascript
const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ? 'auto'
  : 'smooth';

element.scrollIntoView({ behavior, block: 'start' });
```

---

## Recursos Adicionais

### Documentação
- [MDN: prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
- [WCAG 2.1 - Animation from Interactions](https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html)
- [Implementing prefers-reduced-motion](https://web.dev/prefers-reduced-motion/)

### Ferramentas
- [Chrome DevTools - Emulate CSS media features](https://developer.chrome.com/docs/devtools/rendering/emulate-css/)
- [Firefox Responsive Design Mode](https://developer.mozilla.org/en-US/docs/Tools/Responsive_Design_Mode)

### WCAG Guidelines
- **2.2.2 Pause, Stop, Hide (Level A)**
- **2.3.3 Animation from Interactions (Level AAA)**

---

**Última atualização:** 2025-11-18
**Versão do Portfolio:** Rails 7.1.3 + React 19
**Mantido por:** Ricardo Benício
