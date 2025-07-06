NexusMart - Mini-Commerce Prototype
Project Overview
NexusMart is a client-side prototype of a small e-commerce shop, developed as a technical assessment for a Junior-Mid React/Next.js Developer role. The application allows users to browse a product catalogue, manage items in a shopping cart, and complete a mock checkout process. All essential application state, including product data and the shopping cart, is persisted locally using localStorage to ensure data survives page reloads.

Key Functionalities:
Product Catalogue (/): Displays a curated list of dummy products (image, name, price). This data is initially loaded from a local JSON file via React Query and then seeded into localStorage for persistence.

Product Detail Page (/product/[slug]): Provides comprehensive information for individual products, including an "Add to Cart" button.

Shopping Cart (/cart): Offers a clear overview of selected items, allowing users to modify quantities, remove items, and view real-time subtotals and totals. Cart state is managed globally with Zustand and automatically persists to localStorage.

Checkout Flow (/checkout → /success): Guides users through an order summary before placing an order. The "Place Order" action clears the cart and navigates to a "Thank You" page displaying a random order ID.

Interactive User Interface: Features a dynamic hero section on the homepage with a background image and layered text. Subtle entry animations are applied to the hero content and product cards using Framer Motion. Interactive buttons provide visual loading feedback upon click.

Design Approach
The design philosophy for NexusMart prioritizes a clean, modern aesthetic, ensuring an intuitive and responsive user experience across all devices.

Layout & Responsiveness: A mobile-first approach is central to the layout, utilizing Tailwind CSS's flex and grid utilities. This ensures that content adapts fluidly and gracefully to various screen sizes (mobile, tablet, desktop), preventing horizontal scrolling and maintaining usability.

Visual Elements:

Color Palette: A harmonious blend of blues and purples defines gradient backgrounds and primary interactive elements. Greens are used for positive actions (e.g., "Add to Cart"), while reds signify destructive actions (e.g., "Remove"). Text colors are chosen for optimal contrast.

Typography: The "Inter" font is consistently applied throughout the application for its contemporary, legible, and clean characteristics.

Rounded Corners: Applied to almost all UI components (buttons, cards, input fields) to contribute to a softer, more inviting, and modern visual appeal.

Animations: Framer Motion is selectively used for subtle entry animations on the homepage (hero section elements and product cards) and interactive hover/tap effects on buttons. This enhances perceived performance and user engagement without introducing unnecessary complexity or slowing down page transitions.

Accessibility (A11y):

Semantic HTML: Proper HTML5 semantic tags like <body>, <header>, <nav>, <main>, <section>, <h1> through <h3>, <button>, <label>, and <select> are used to create a logical document structure, improving navigation for assistive technologies.

Image Alt Text: All next/image components include descriptive alt attributes, crucial for screen readers.

Keyboard Navigation: All interactive elements are designed to be fully navigable and operable using only the keyboard (Tab, Enter, Spacebar).

Form Labels: Input fields (like quantity selectors) are correctly associated with <label> tags using htmlFor for enhanced usability and accessibility.

Tools & Techniques
The project strictly adheres to the specified technology stack and incorporates modern React development patterns for robustness and maintainability.

Next.js 14 (App Router): The core framework, leveraging its file-system based routing, Server Components (for metadata generation), and Client Components ('use client') for interactive UI.

React: The primary library for building the user interface with a component-based architecture.

React Query (TanStack Query): Manages server-side data (simulated from local JSON) with features like caching, background re-fetching, and automatic loading/error state management.

Zustand: A lightweight and performant global state management solution, used for the shopping cart. Its persist middleware ensures cart data survives browser refreshes by integrating with localStorage.

Tailwind CSS: A utility-first CSS framework enabling rapid and responsive styling directly within JSX. Custom animations (e.g., fade-in effects) are defined in tailwind.config.js.

TypeScript (Strict Mode): The entire codebase is written in TypeScript with "strict": true enabled in tsconfig.json, enforcing strong typing, minimizing runtime errors, and improving code quality. No any types are used.

Framer Motion: Utilized for declarative and performant UI animations on the homepage.

localStorage: Serves as the persistent data layer for both product catalogue seeding and the shopping cart state.

Linting & Formatting: ESLint and Prettier configurations are set up to ensure consistent code style and adherence to best practices, contributing to a clean and maintainable codebase.

Testing (Strategy): While not fully implemented in this prototype, a comprehensive testing strategy would include:

Unit Tests: Using Jest and React Testing Library for isolated testing of productService, cartStore logic, and small, pure components.

Component Tests: Using Jest and React Testing Library to verify component rendering, interactions, and data display (e.g., Header, ProductCard, CartPage).

End-to-End (E2E) Tests: Using Playwright for happy-path scenarios, simulating full user flows (e.g., browsing, adding to cart, checkout, order placement) across the deployed application.

SEO Strategy
SEO considerations are integrated using Next.js's native features to enhance discoverability and presentation in search results.

Metadata API:

Global Metadata: Defined in src/app/layout.tsx for site-wide title and description.

Page-Specific Metadata: Each primary route (Catalogue, Cart, Checkout, Success) has its own metadata export in its respective layout.tsx (for server components).

Dynamic Metadata: For the Product Detail page (/product/[slug]), an async function generateMetadata() within src/app/product/[slug]/layout.tsx dynamically generates unique titles, descriptions, Open Graph (og:) tags, and Twitter card (twitter:) tags based on the specific product data. This ensures rich snippets and accurate social media previews.

Image Optimization (next/image): All images are served via Next.js's Image component, which automatically handles:

Responsive Sizing & Optimization: Images are resized, optimized, and delivered in modern formats (e.g., WebP) tailored to the user's device.

Lazy Loading: Images outside the initial viewport are loaded on demand, improving initial page load performance.

priority Attribute: Applied to critical images (like the hero background) to ensure they are loaded with high priority, preventing Cumulative Layout Shift (CLS).

Favicon: A custom favicon (icon.png or favicon.ico) is placed in the src/app directory, allowing browsers to display the NexusMart logo in the tab header.

Error-Handling Technique
A robust error handling mechanism is in place to provide a resilient and user-friendly application.

Error Boundaries: A global ErrorBoundary component (src/components/ErrorBoundary.tsx) is wrapped around the application's main content in src/app/layout.tsx. This component gracefully catches JavaScript errors in the React rendering tree, preventing the entire application from crashing. Instead, it displays a user-friendly fallback UI. In development, it provides detailed error information, and in a production environment, it's designed to integrate with external error monitoring services.

Component-Level Error States:

React Query: Leverages isLoading and isError states to display contextual loading indicators and error messages for data fetching operations, providing immediate feedback to the user.

Conditional Rendering: Pages like the Cart and Checkout intelligently check for empty states (e.g., an empty cart) and guide the user with appropriate messages and navigation options.

Event Handler Error Management: Standard JavaScript try...catch blocks are used within event handlers (e.g., "Add to Cart" clicks) to gracefully manage potential errors during user interactions, preventing unexpected failures and ensuring a smoother experience.

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

git clone [https://github.com/arinde/mini-ecommerce.git](https://github.com/arinde/mini-ecommerce.git)

Replace https://github.com/arinde/mini-ecommerce.git with the actual URL of your GitHub repository.

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