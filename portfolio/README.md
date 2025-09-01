# Portfolio Website

A modern, responsive portfolio website built with Angular 19 featuring server-side rendering (SSR) and smooth animations.

## Features

- **Responsive Design**: Mobile-first approach with Bootstrap 5
- **Server-Side Rendering**: Enhanced SEO and performance with Angular SSR
- **Smooth Animations**: AOS (Animate On Scroll) library integration
- **Modern UI**: Clean design with Bootstrap Icons and Boxicons
- **Multiple Sections**: Hero, About, Skills, Resume, Portfolio, Services, Testimonials, Contact
- **Firebase Hosting**: Ready for deployment

## Tech Stack

- **Framework**: Angular 19.2.14
- **Styling**: Bootstrap 5.3.2, SCSS
- **Icons**: Bootstrap Icons, Boxicons
- **Animations**: AOS 2.3.4
- **Server**: Express.js for SSR
- **Deployment**: Firebase Hosting

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Angular CLI (`npm install -g @angular/cli`)

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

## Development

### Development Server
```bash
npm start
# or
ng serve
```
Navigate to `http://localhost:4200/`. The app will automatically reload when you change source files.

### Build for Production
```bash
npm run build
# or
ng build
```
Build artifacts will be stored in the `dist/` directory.

### SSR Development
```bash
npm run serve:ssr:portfolio
```
Runs the server-side rendered version locally.

### Watch Mode
```bash
npm run watch
```
Builds the project in watch mode for development.

## Testing

```bash
npm test
# or
ng test
```
Executes unit tests via [Karma](https://karma-runner.github.io).

## Deployment

This project is configured for Firebase Hosting:

1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login to Firebase: `firebase login`
3. Build the project: `npm run build`
4. Deploy: `firebase deploy`

## Project Structure

```
src/
├── app/
│   ├── about/          # About section component
│   ├── contact/        # Contact form component
│   ├── facts/          # Facts/statistics component
│   ├── footer/         # Footer component
│   ├── header/         # Navigation header
│   ├── hero/           # Hero/landing section
│   ├── portfolio/      # Portfolio showcase
│   ├── resume/         # Resume/experience section
│   ├── services/       # Services offered
│   ├── skills/         # Skills showcase
│   └── testimonials/   # Client testimonials
├── assets/             # Static assets (images, styles, scripts)
└── styles.scss         # Global styles
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this code for your own portfolio projects.
