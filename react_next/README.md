# Create React Next project

## Install NVM, Node

## Create Next Project

- npx create-next-app@latest

## Next.js Project Structure

### Top-level files --> app Routing Files:

- layout.\* --> layout of the app
- page.\* --> pages of the app --> make route segments publicly accessible
- loading.\* --> loading UI
- not-found.\* --> not found UI
- error.\* --> error UI
- global-error.\* --> global error UI
- route.\* --> API endpoint
- template.\* --> Re-rendered layout
- default.\* --> parallel route fallback page

### Component Hierarchy

```javascript
<Layout>
  <Template>
    <ErrorBoundary fallback={<Error />}>
      <Suspense fallback={<Loading />}>
        <ErrorBoundary fallback={<NotFound />}>
          <Page />
        </ErrorBoundary>
      </Suspense>
    </ErrorBoundary>
  </Template>
</Layout>
```

## Next.js Tutorial

### Chapter 1: Getting Started

### Chapter 2: CSS Styling

- Using the `clsx` library to toggle class names

### Chapter 3: Optimizing Fonts and Images

- Next.js automatically optimizes fonts in the application when you use the `next/font` module.
  It downloads font files at build time and hosts them with your other static assets.
  This means when a user visits your application, there are no additional network requests for
  fonts which would impact performance.
- The `<Image>` Component is an extension of the HTML `<img>` tag, and comes with automatic image optimization, such as
  - preventing layout shift automatically when images are loading
  - resizing images to avoid shipping large iamges to devices with a smaller viewport
  - lazy loading images by default (images load as they enter the viewport.)
  - serving images in modern formats like WebP and AVIF when the browser supports it
- `className="hidden md:block"` in `<Image>` --> hide the element on mobile devices and show it on larger devices

### Chapter 4: Creating Layouts and Pages

- Nested Routing: Next.js uses file-system routing where **folders** are used to create nested routes. Each folder represents a **route segment** that maps to a **URL segment**. `page.tsx` is a special Next.js file that exports a React component, and it's required for the route to be accessible, e.g., `/app/page.tsx` maps to the route `/` and `/app/dashboard/page.tsx` maps to the route `/dashboard`.
- `layout.tsx` file to create UI that is shared between multiple pages. The `<Layout />` component receives a `children` prop. One benefit of using layouts in Next.js is that on navigation, only the page components update while the layout won't re-render. This is called partial rendering.
- RootLayout is required. Any UI you add to the root layout will be shared across all pages in your application. You can use the root layout to modify your `<html>` and `<body>` tags, and add metadata.

### Chapter 5: Navigating Between Pages

- `<Link>` allows you to do client-side navigation with JavaScript.
- Automatic code-splitting and prefetching make the page transition near-instant.

#### Pattern: Showing active links

- `usePathname()` is a hook, you will need to turn tsx into c Client Component by adding `use client` at the beginning
- ```javascript
  className={
    clsx(
     'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
      {
       'bg-sky-100 text-blue-600': pathname === link.href,
      },
    )}
  ```
