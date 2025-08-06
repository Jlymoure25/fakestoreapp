# 🛒 Universal Fake Store App

A production-ready React TypeScript e-commerce application that works seamlessly across **ALL hosting platforms**.

## 🌟 Live Demo

**GitHub Pages:** https://Jlymoure25.github.io/fakestoreapp/

## 🚀 Universal Platform Deployment

### One-Click Deploy Options

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Jlymoure25/fakestoreapp)

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/Jlymoure25/fakestoreapp)

### Manual Deploy Instructions

#### Vercel
1. Import: `https://github.com/Jlymoure25/fakestoreapp`
2. Build command: `npm run build:vercel`
3. Output directory: `dist`
4. **Auto-detects configuration** ✅

#### Netlify
1. Connect repository: `https://github.com/Jlymoure25/fakestoreapp`
2. Build command: `npm run build:netlify`
3. Publish directory: `dist`
4. **Auto-detects _redirects** ✅

## 🛠️ Technical Features

### ✅ Smart Platform Detection
```tsx
// Automatically detects hosting platform
const basename = window.location.hostname.includes('github.io') ? '/fakestoreapp' : '';
```

### ✅ Cross-Platform Features
- 📱 **Responsive hamburger menu** (works on all devices)
- 🔄 **React Router** with universal routing
- 🎨 **Bootstrap 5** responsive design
- 🛒 **E-commerce functionality** (products, cart, details)
- ⚡ **Performance optimized** builds
- 🌍 **Cross-browser compatible**

## 📱 App Features

### Navigation
- **Working hamburger menu** on mobile
- Active link highlighting
- Auto-collapse after selection
- **Bootstrap navbar** with dark theme

### Products Page
- **FakeStore API integration**
- Product listing with images
- **Category filtering dropdown**
- Responsive grid layout

### Product Details
- Individual product information
- **Add to Cart functionality**
- Delete product option
- **Cart status display**

## Getting Started

### Prerequisites
Make sure you have the following installed on your machine:
- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate into the project directory:
   ```
   cd fakestore-app-template
   ```
3. Install the dependencies:
   ```
   npm install
   ```

### Running the Application
To start the development server, run:
```
npm run dev
```
This will start the application in development mode. Open your browser and go to `http://localhost:3000` to see the app in action.

### Building for Production
To create a production build of the application, run:
```
npm run build
```
The built files will be generated in the `dist` directory.

## Project Structure
- `src/`: Contains the source code for the application.
  - `App.tsx`: Main application component.
  - `main.tsx`: Entry point of the application.
  - `components/`: Contains reusable components.
  - `pages/`: Contains page components.
  - `types/`: Contains TypeScript types and interfaces.
- `public/`: Contains static assets like images and icons.
- `package.json`: Configuration file for npm.
- `tsconfig.json`: TypeScript configuration file.
- `vite.config.ts`: Vite configuration file.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.