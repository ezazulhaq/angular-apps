# Taqwa Tracker: Islamic Prayer and Hadith Companion

The Taqwa Tracker is a comprehensive Islamic application that provides prayer times, Qibla direction, Quran translations, Hadith search, and more. This Angular-based Progressive Web App (PWA) offers a rich set of features for Muslims to enhance their daily religious practices.

The Taqwa Tracker combines modern web technologies with traditional Islamic resources to create a user-friendly and informative platform. It utilizes geolocation for accurate prayer times, integrates with Supabase for data management, and implements a service worker for offline functionality.

## Repository Structure

```
salah-app/
├── src/
│   ├── app/
│   │   ├── chatbot/
│   │   ├── hadith/
│   │   ├── home/
│   │   ├── kaaba/
│   │   ├── library/
│   │   ├── prayer-times/
│   │   ├── quran/
│   │   ├── service/
│   │   └── shared/
│   ├── environments/
│   ├── index.html
│   └── main.ts
├── angular.json
├── ngsw-config.json
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

### Key Files:
- `src/main.ts`: Entry point of the application
- `src/app/app.config.ts`: Application configuration
- `src/environments/environment.ts`: Environment-specific configuration
- `angular.json`: Angular CLI configuration
- `ngsw-config.json`: Service Worker configuration for PWA features

### Important Integration Points:
- Supabase: Used for data storage and retrieval (`src/app/service/supabase.service.ts`)
- OpenStreetMap API: Used for location services (`src/app/service/salah-app.service.ts`)
- Adhan.js: Used for prayer time calculations (`src/app/service/salah-app.service.ts`)

## Usage Instructions

### Installation

Prerequisites:
- Node.js (v14 or later)
- npm (v6 or later)

Steps:
1. Clone the repository:
   ```
   git clone <repository-url>
   cd salah-app
   ```
2. Install dependencies:
   ```
   npm install
   ```

### Getting Started

To run the application in development mode:

```
npm start
```

This will start the development server, typically at `http://localhost:4200`.

### Configuration

The application uses environment-specific configuration files located in `src/environments/`. To configure the application for production, update the `environment.prod.ts` file with the appropriate values:

```typescript
export const environment = {
  production: true,
  s3Bucket: 'XXXXXXXXXXXXXXXXXXX',
  openStreetUrl: 'https://nominatim.openstreetmap.org',
  supabaseUrl: 'your-supabase-url',
  supabaseAnonKey: 'your-supabase-anon-key'
};
```

### Building for Production

To build the application for production:

```
npm run build
```

This will generate a production-ready build in the `dist/salah-app` directory.

### Testing

To run the unit tests:

```
npm test
```

### Troubleshooting

1. Location Services Not Working
   - Problem: Prayer times or Qibla direction not displaying correctly
   - Solution: 
     1. Check if location permissions are enabled in your browser
     2. Ensure you're connected to the internet
     3. If the issue persists, check the browser console for specific error messages

2. Offline Mode Issues
   - Problem: App not working properly when offline
   - Solution:
     1. Ensure you've visited the app while online at least once to cache the necessary resources
     2. Check if your browser supports Service Workers
     3. Clear the app's cache and reload if you're experiencing stale data issues

3. Supabase Connection Errors
   - Problem: Unable to fetch Quran translations or Hadith data
   - Solution:
     1. Verify your internet connection
     2. Check if the Supabase URL and anonymous key are correctly set in the environment configuration
     3. Ensure your Supabase project is up and running

For any persistent issues, please check the browser's developer console for detailed error messages and report them to the project's issue tracker.

## Data Flow

The Taqwa Tracker follows a typical Angular application data flow, with services managing data retrieval and components handling the presentation. Here's a high-level overview of the data flow:

1. User Interaction: The user interacts with a component in the UI.
2. Component Request: The component calls a method in a relevant service.
3. Service Processing: The service processes the request, often involving API calls to Supabase or other external services.
4. Data Retrieval: Data is fetched from the API or local storage.
5. Component Update: The service returns the data to the component, which updates its state.
6. View Rendering: Angular's change detection updates the view with the new data.

```
[User] -> [Component] -> [Service] -> [API/Storage]
                                   <- [Data]
          [Component] <- [Service] 
[User] <- [Updated View]
```

Key technical considerations:
- Observables are used extensively for asynchronous operations.
- The `SalahAppService` manages geolocation and prayer time calculations.
- The `SupabaseService` handles all interactions with the Supabase backend.
- The `ThemeSelectorService` manages the application's theme preferences.

## Deployment

### Prerequisites
- A web server capable of serving static files (e.g., Nginx, Apache)
- SSL certificate for HTTPS (required for PWA features)

### Deployment Steps
1. Build the application for production:
   ```
   npm run build
   ```
2. Copy the contents of the `dist/salah-app` directory to your web server's public directory.
3. Configure your web server to redirect all requests to `index.html` for proper routing.
4. Ensure your server is set up to serve the application over HTTPS.

### Environment Configurations
Update the `src/environments/environment.prod.ts` file with production-specific values before building.

### Monitoring Setup
- Use Angular's built-in error handling to log errors to a monitoring service.
- Implement application performance monitoring (APM) tools to track user interactions and app performance.

## Infrastructure

The Taqwa Tracker utilizes the following key infrastructure components:

1. Angular Service Worker (ngsw-worker.js):
   - Type: Service Worker
   - Purpose: Enables offline functionality and caching for the PWA

2. Application Configuration (app.config.ts):
   - Type: Angular Application Configuration
   - Purpose: Sets up core Angular providers and services

These infrastructure components are crucial for the app's PWA capabilities and overall configuration. The Service Worker manages caching strategies and offline access, while the application configuration sets up essential Angular services and routing.