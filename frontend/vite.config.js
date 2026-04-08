// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(),tailwindcss()],
// })


// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(), tailwindcss()],

//   optimizeDeps: {
//     include: ["animejs"],
//   },

//   build: {
//     commonjsOptions: {
//       transformMixedEsModules: true,
//     },
//   },
// })


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  server: {
    host: true,        // ✅ mobile access enable
    port: 5173         // (optional) default port fix
  },

  optimizeDeps: {
    include: ["animejs"],
  },

  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
})