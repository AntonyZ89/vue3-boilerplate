<template>
  <client-only>
    <NavBar />
  </client-only>

  <div class="h-full flex-1">
    <main class="space-y-3 container py-3 px-3 sm:px-auto mx-auto">
      <NuxtPage />
    </main>

    <notifications
      class="mr-2 mt-20 sm:mt-16 min-w-[200px] max-w-sm"
      style="width: auto"
      group="top-right"
      position="top right"
      close-on-click
    />
    <notifications />
  </div>

  <Footer />
</template>
