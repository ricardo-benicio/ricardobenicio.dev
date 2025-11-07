# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website for Ricardo Benício built with a hybrid Rails + React architecture. The backend serves a single-page application powered by React 19, with Rails handling routing and asset compilation.

**Stack:**
- Ruby 3.3.0 + Rails 7.1.3
- React 19 (JSX, single-page app)
- TailwindCSS 4.1.3 (via CLI, not PostCSS)
- esbuild for JavaScript bundling
- PostgreSQL database
- Deployed on Render

## Development Commands

### Setup
```bash
bundle install          # Install Ruby dependencies
yarn install            # Install Node dependencies (alternative to npm)
rails db:create db:migrate  # Set up database
```

### Running the Development Server
```bash
./bin/dev               # Starts Rails server + JS/CSS watchers via foreman
```

This runs three processes concurrently (defined in [Procfile.dev](Procfile.dev)):
- `web`: Rails server on port 3000 (with debugger enabled)
- `js`: esbuild watcher for JavaScript
- `css`: TailwindCSS CLI watcher

### Building Assets
```bash
yarn build              # Build JavaScript with esbuild
yarn build:css          # Build CSS with TailwindCSS CLI
rails assets:precompile # Compile all assets for production
```

### Testing
```bash
rails test              # Run all tests
rails test:system       # Run system tests with Capybara/Selenium
```

### Production Build (Render)
The [bin/render-build.sh](bin/render-build.sh) script handles production builds:
```bash
./bin/render-build.sh   # bundle install + assets:precompile + assets:clean
```

## Architecture

### Rails + React Hybrid SPA

This is a **single-page React application** mounted inside a Rails view, not a traditional Rails app with React components sprinkled in.

**Flow:**
1. Rails serves the root route `/` via [HomeController#index](app/controllers/home_controller.rb:1)
2. The view [app/views/home/index.html.erb](app/views/home/index.html.erb:1) contains a single `<div id="root">` mount point
3. [app/javascript/application.jsx](app/javascript/application.jsx:1) renders the entire React app into `#root`
4. The main `<Portfolio />` component ([app/javascript/components/Portfolio.jsx](app/javascript/components/Portfolio.jsx:1)) contains all sections

### React Component Structure

The Portfolio component is a full-page layout with sections rendered sequentially:

```
Portfolio (root component)
├── Constellation (fixed background canvas animation)
└── Content sections:
    ├── Intro (hero section)
    ├── WorkSection (projects/work experience)
    ├── AboutSection (about Ricardo)
    ├── ServicesSection (services offered)
    └── ContactSection (contact form/info)
```

**Key pattern:** The `Constellation` component is positioned `fixed` and renders a canvas-based background animation, while content sections are `relative z-10` to appear above it.

### Asset Pipeline

**JavaScript:** Uses esbuild (NOT Webpack) configured via [package.json](package.json:8) scripts:
- Bundles `app/javascript/*.*` → `app/assets/builds/`
- Output format: ES modules
- Source maps enabled

**CSS:** Uses TailwindCSS CLI (NOT PostCSS):
- Input: `app/assets/stylesheets/application.tailwind.css`
- Output: `app/assets/builds/application.css`
- TailwindCSS v4 (new CSS-first config, not JS config file)

**Important:** There is NO `tailwind.config.js`. TailwindCSS v4 uses CSS-based configuration via `@theme` directives in the input CSS file.

### Hotwire Integration

Turbo Rails is enabled ([Gemfile](Gemfile:21)) and imported ([application.jsx](app/javascript/application.jsx:1)), but since this is a SPA, navigation is handled by React, not Turbo Drive. Turbo is available if you add additional Rails pages in the future.

## Key Implementation Details

### React + Rails Integration
- React root is created via `createRoot` (React 18+ API)
- Mounted on `DOMContentLoaded` event
- Single entry point: [application.jsx](app/javascript/application.jsx:1)

### Styling Approach
- Global styles in [app/views/layouts/application.html.erb](app/views/layouts/application.html.erb:12-28) (CSS animations)
- Component styles via TailwindCSS utility classes
- Black background (`bg-black`) theme throughout

### Database
- PostgreSQL ([Gemfile](Gemfile:12), [config/database.yml](config/database.yml))
- Currently no models defined (static portfolio site)
- Database setup required for Rails to boot, even if unused

## Deployment

Configured for Render via [render.yaml](render.yaml):
- Web service: free tier Ruby runtime
- PostgreSQL database: free tier
- Build command: `./bin/render-build.sh`
- Start command: `bundle exec rails server`
- Environment variables: `DATABASE_URL`, `RAILS_ENV`, `WEB_CONCURRENCY`

**Note:** [render.yaml](render.yaml:20) has a syntax error on line 20 (`sync:false` should be `sync: false`).

## Development Workflow

When adding new features:

1. **React components:** Add to `app/javascript/components/` and import into `Portfolio.jsx`
2. **Styling:** Use TailwindCSS utilities; CSS watcher will rebuild automatically
3. **New pages (if needed):** Add routes in [config/routes.rb](config/routes.rb) and create controller/view
4. **Assets:** Place in `app/assets/` (images, fonts, etc.)

When modifying existing sections:
- Each section is a separate component in `app/javascript/components/`
- Follow the existing pattern of black background with white text
- Constellation background is shared across all sections
