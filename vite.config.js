import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        port: 8080,
    },
    plugins: [react()],
    build: {
        // Specify the maximum size for individual chunks
        chunkSizeWarningLimit: 2000, // in kilobytes (default is 500)
        // Optimization options
        optimizeChunks: true, // Enable chunk optimization
        // Adjust chunking behavior
        rollupOptions: {
            output: {
                manualChunks(id) {
                    // Define manual chunks if needed
                    if (id.includes('node_modules')) {
                        return 'vendor'; // put node_modules in a separate chunk
                    }
                },
            },
        },
    },
})
