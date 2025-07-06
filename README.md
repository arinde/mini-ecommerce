NexusMart - Mini-Commerce Prototype
Project Overview
NexusMart is a client-side prototype of a small e-commerce shop, built as a technical assessment for a Junior-Mid React/Next.js Developer role at Stackbuld Limited. It allows visitors to browse a product catalogue, manage items in a shopping cart, and complete a mock checkout process. All application state, including the shopping cart and product data, persists across page reloads using localStorage.

Core Features Implemented:
Product Catalogue (/): Displays a list of dummy products with images, names, and prices. Product data is fetched via React Query and seeded into localStorage on the initial load.

Product Detail Page (/product/[slug]): Shows comprehensive information for a single product and includes an "Add to Cart" button.

Shopping Cart (/cart): Allows users to view selected items, adjust quantities, remove items, and see calculated subtotals and totals. Cart state is managed globally using Zustand and persists to localStorage.

Checkout Flow (/checkout → /success): Presents an order summary. The "Place Order" action clears the cart and redirects the user to a success page displaying a "Thank You" message with a generated random order ID.

Interactive UI: Includes a dynamic hero section with background image and text, and subtle entry animations for elements on the homepage. Buttons provide loading feedback on click.

Design Approach
The design of NexusMart aims for a clean, modern aesthetic with a strong focus on user experience and responsiveness.

Layout: Utilizes a mobile-first approach, employing Tailwind CSS's flex and grid utilities to ensure optimal viewing and interaction across various screen sizes (mobile, tablet, desktop). Elements are designed to be fluid and adapt gracefully to different viewport widths, avoiding horizontal scrolling.

Color Palette: A primary palette of blues and purples for gradients and interactive elements, complemented by greens for success/add-to-cart actions, and reds for destructive actions (like removing items). Text colors are chosen for high contrast against backgrounds.

Typography: The "Inter" font is used for its modern, clean, and highly readable characteristics, ensuring clarity across all text elements.

Visual Polish & Animations:

Hero Section: Features a full-width background image with an overlay for text readability, providing a strong visual impact upon landing on the homepage.

Framer Motion: Used for subtle but engaging entry animations on the homepage's hero section and product cards, enhancing the perceived responsiveness and modern feel without hindering performance. Hover effects are also applied to interactive elements.

Rounded Corners: Applied generously to UI elements like buttons, cards, and input fields for a softer, more contemporary look.

Accessibility (A11y):

Semantic HTML: Proper HTML5 semantic tags (<header>, <nav>, <main>, <section>, <h1> through <h3>, <button>, <label>, <select>) are used to provide a clear document structure for assistive technologies.

Image Alt Text: All next/image components include descriptive alt attributes for screen reader users.

Keyboard Reachability: Interactive elements (links, buttons, form controls) are naturally keyboard-accessible, allowing navigation and interaction using the Tab key.

Form Labels: Input fields (like quantity selectors) are correctly associated with <label> tags using htmlFor for improved usability and accessibility.

Tools & Techniques
This project adheres to the specified technology stack and incorporates modern React development patterns.

Next.js 14 (App Router): The foundational framework, leveraging the App Router for file-system based routing, Server Components (implicitly for metadata generation), and Client Components ('use client') for interactive UI.

React: The core UI library for building components.

React Query (TanStack Query): Used for efficient server-state management (simulated here by fetching from local JSON). It handles data fetching, caching, re-fetching, and provides built-in isLoading and isError states, simplifying data flow and improving performance.

Zustand: A lightweight, fast, and scalable state management solution for the global cart state. It's used to manage cart items, quantities, and derive totals via selectors.

Persistence: Zustand's persist middleware is used to automatically save and load the cart state to/from localStorage, ensuring data survives page reloads.

Tailwind CSS: A utility-first CSS framework for rapid UI development and responsive design. All styling is done using Tailwind classes, with custom animations defined in tailwind.config.js.

TypeScript (Strict Mode): Enforced with "strict": true in tsconfig.json to ensure strong typing throughout the codebase, leading to fewer runtime errors and improved code maintainability. Zero any types are used.

Framer Motion: Employed for declarative, performant animations, specifically for entrance effects on the homepage's hero section and product cards.

localStorage: Used as the data layer for both product data (seeded on first load) and persistent cart state, as per assessment requirements.

SEO Strategy
SEO (Search Engine Optimization) is addressed through Next.js's built-in metadata API and image optimization.

Metadata API:

Global Metadata: Defined in src/app/layout.tsx for application-wide title and description.

Page-Specific Metadata: Each major route (Catalogue, Cart, Checkout, Success) has its own export const metadata block (or generateMetadata function for dynamic routes) within its respective layout.tsx or page.tsx (for server components). This allows for unique titles, descriptions, and keywords relevant to the content of each page.

Dynamic Metadata: For the Product Detail page (/product/[slug]), an async function generateMetadata() is used within src/app/product/[slug]/layout.tsx. This function fetches product-specific data on the server to dynamically generate unique titles, descriptions, Open Graph (og:) tags, and Twitter card (twitter:) tags, which are crucial for social media sharing and rich search results.

Image Optimization (next/image): All images are served using Next.js's Image component, which automatically handles:

Resizing and Optimization: Images are served in modern formats (e.g., WebP) and at appropriate sizes for the user's device.

Lazy Loading: Images below the fold are loaded only when they enter the viewport, improving initial page load times.

priority: Used for critical images (like the hero background) to ensure they are loaded with high priority.

Error-Handling Technique
Robust error handling is implemented to provide a graceful user experience and aid in debugging.

Error Boundaries: A global ErrorBoundary component (src/components/ErrorBoundary.tsx) is wrapped around the entire application in src/app/layout.tsx. This React component catches JavaScript errors that occur during rendering, in lifecycle methods, and in constructors of its child component tree.

When an error is caught, it displays a user-friendly fallback UI instead of crashing the entire application.

In development mode, it provides detailed error information for debugging.

In a production environment, it would typically log errors to an external error monitoring service (e.g., Sentry, Bugsnag).

Component-Level Error States:

React Query: Automatically handles isLoading and isError states for data fetching. The UI renders appropriate messages (e.g., "Loading products...", "Error loading products:") based on these states.

Conditional Rendering: Pages like Cart and Checkout explicitly check for empty states and guide the user back to shopping if no items are present.

Event Handler Error Handling: For errors occurring in event handlers (like button clicks or form submissions), standard JavaScript try...catch blocks are used to catch and manage exceptions. This prevents individual action failures from propagating and crashing the application. User-friendly messages (e.g., console logs for this prototype) are provided.

tsconfig.json & ESLint Configurations
The project is configured with strict typing and robust code quality rules to ensure maintainability and prevent common errors.

tsconfig.json:

{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true, // Enforces strict type checking
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}

"strict": true: This is the core setting that enables all strict type-checking options in TypeScript. It ensures that variables are properly typed, null/undefined are handled explicitly, and any is discouraged.

"noEmit": true: Prevents TypeScript from emitting JavaScript files, relying on Next.js for compilation.

"isolatedModules": true: Ensures that each file can be compiled independently, which is important for build tools like Babel or SWC.

.eslintrc.json:
The ESLint configuration, derived from eslint-config-next, ensures adherence to best practices and catches common issues.

{
  "extends": ["next/core-web-vitals"],
  "rules": {
    // Custom rules can be added here, e.g.:
    // "react/no-unescaped-entities": "off",
    // "@next/next/no-img-element": "off"
  }
}

"extends": ["next/core-web-vitals"]: This extends the recommended ESLint configuration from Next.js, which includes rules for React, Next.js specifics, and Web Vitals best practices.

This setup ensures that code is consistently formatted, potential bugs are flagged early, and the codebase remains clean and maintainable.

Getting Started (Local Development)
Follow these steps to set up and run the NexusMart project on your local machine.

Prerequisites
Node.js: Version 18.x or higher (LTS recommended). You can download it from nodejs.org.

npm (Node Package Manager) or Yarn or pnpm: Comes bundled with Node.js.

Installation
Clone the Repository:
First, clone the project repository to your local machine using Git:

git clone https://github.com/arinde/mini-ecommerce.git

Navigate to the Project Directory:
Change into the newly created project directory:

cd mini-commerce-app

Install Dependencies:
Install all the necessary project dependencies:

npm install
# or if you use Yarn:
# yarn install
# or if you use pnpm:
# pnpm install

Running the Development Server
Start the Development Server:
Once the dependencies are installed, you can start the Next.js development server:

npm run dev
# or if you use Yarn:
# yarn dev
# or if you use pnpm:
# pnpm dev

Open in Browser:
The application will typically be available at http://localhost:3000. Open this URL in your web browser to view the NexusMart prototype.

Building for Production (Optional)
To build the application for production, you can use:

npm run build
# or yarn build
# or pnpm build

This will create an optimized build of your application in the .next directory.

Running in Production Mode (Optional)
After building, you can start the production server:

npm run start
# or yarn start
# or pnpm start

This will serve the optimized production build.