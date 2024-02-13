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

### Chapter 6: Setting Up Your Database

- seed: populating the database with an initial set of data
- in `packing.json` file, add a `seed` script to run the seed file `"seed": "node -r dotenv/config ./scripts/seed.js"`
- run `npm run seed`

### Chapter 7: Fetching Data

#### Using Server Components to fetch data

Benefits

- Server Components support promises, providing a simpler solution for asynchronous tasks like data fetching. You can use `async/await` syntax without reaching out for `useEffect, useState` or data fetching libraries.
- Server Components execute on the server, so you can keep expensive data fetches and logic on the server and only send the result to the client.
- Since Server Components execute on the server, you can query the database directly without an additional API layer.

#### Parallel data fetching

- `await Promise.all([fetchData1(), fetchData2()])` to fetch data in parallel

### Chapter 8: Static and Dynamic Rendering

- Static rendering: data fetching and rendering happen on the server at build time (when you deploy) or during revalidation. The result can then be distributed and cached in a Content Delivery Network (CDN). Static rendering is great for UI with no data or data that is shared across users.
- Dynamic rendering: content is rendered on the server for each user at request time (when the user visits the page). With dynamic rendering, your application is only as fast as your slowest data fetch.

```javascript
import { unstable_noStore as noStore } from "next/cache";
```

### Chapter 9: Streaming

- Streaming is a data transfer technique that allows you to break down a route into smaller "chunks" and progressively stream them from the server to the client as they become ready. By streaming, you can prevent slow data requests from blocking your whole page. This allows the user to see and interact with parts of the page without waiting for all the data to load before any UI can be shown to the user.

#### Streaming a whole page with **loading.tsx**

```javascript
import DashboardSkeleton from "@/app/ui/skeletons";
export default function Loading() {
  return <DashboardSkeleton />;
}
```

#### Route groups

- Route groups allow you to organize files into logical groups without affecting the URL path structure. When you create a new folder using parentheses (), the name won't be included in the URL, So `/dashboard/(overview)/page.tsx` becomes `/dashbaord`.

#### Streaming a component by using Suspense

```javascript
import { Suspense } from "react";
<Suspense fallback={<RevenueChartSkeleton />}>
  <Dashboard />
</Suspense>;
```

#### Grouping components

```javascript
import CardWrapper from "@/app/ui/dashboard/cards";
<Suspense fallback={<CardsSkeleton />}>
  <CardWrapper />
</Suspense>;
```

```javascript
export default async function CardWrapper() {
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData();

  return (
    <>
      <Card title="Collected" value={totalPaidInvoices} type="collected" />
      <Card title="Pending" value={totalPendingInvoices} type="pending" />
      <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
      <Card
        title="Total Customers"
        value={numberOfCustomers}
        type="customers"
      />
    </>
  );
}
```
### Chapter 10: Partial Prerendering 
- Partial Prerendering is an experimental feature introduced in Next.js 14. 
- It's worth nothing that wrapping a component in __Suspense__ doesn't make the component itself dynamic (remember you 
used _unstable_noStore_ to achieve this behavior), but rather __Suspense__ is used as a boundary between the static 
and dynamic parts of your route. 

### Chapter 11: Adding Search and Pagination
#### Adding the search functionality
- `useSearchParams`: Allows you to access the parameters of the current URL.
- `usePathname`: Lets you read the current URL's pathname. 
- `useRouter`: Enables navigation between routes within client components programmatically. 
````javascript
'use client'; // This is a Client component, which means you can use event listeners and hooks
import {useSearchParams, usePathname, useRouter} from 'next/navigation';

export default function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams); // ?page=1&query=a
    if (term) {
        params.set("query", term);
    } else {
        params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }
    return (
            <input 
                    onChange={(e) => {
                      handleSearch(e.target.value);
                    }}
                    defaultValue={searchParams.get("query")?.toString()} // defaultValue vs value --> Uncontrolled vs Controlled
            ></input>
    )
}
````
- As a general rule, if you want to read the params from the client, use the `useSearchParams()` hook as this avoids having to go back to the server.
- Pass the `searchParams` prop from the page to the component by using Server Components 
#### Best practices: Debouncing
- Debouncing is a programming practice that limits the rate at which a function can fire. It's a good practice to debounce the search input to avoid making too many requests to the server.
````
npm i use-debounce
````
````javascript
import { useDebouncedCallback } from 'use-debounce';
const handleSearch = useDebouncedCallback((term: string) => {
  const params = new URLSearchParams(searchParams);
  if (term) {
    params.set("query", term);
  } else {
    params.delete("query");
  }
  replace(`${pathname}?${params.toString()}`);
}, 300);
````
#### Adding pagination

### Chapter 12: Mutating Data
#### Server Actions
- React Server Actions allow you to run asynchronous code directly on the server. Server Actions offer an effective security solution, protecting against different types of attacks, securing your data, and ensuring authorized access. 
#### Using forms with Server Actions
````javascript
export default function Page() {
    async function create(formData: FormData) {
        'use server';
        // logic
    }
  return <form action={create}>...</form>
}
````
- An advantage of invoking a Server Action within a Server Component is progressive enhancement - forms work even if JavaScript is disabled on the client.