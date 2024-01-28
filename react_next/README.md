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
