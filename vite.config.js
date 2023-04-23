import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import replace from "@rollup/plugin-replace";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // replace({
    //   "process.env.SERVICE_KEY": JSON.stringify(process.env.SERVICE_KEY),
    //   "process.env.RECEIVE_TEMPLATE_KEY": JSON.stringify(
    //     process.env.RECEIVE_TEMPLATE_KEY
    //   ),
    //   "process.env.SEND_TEMPLATE_KEY": JSON.stringify(
    //     process.env.SEND_TEMPLATE_KEY
    //   ),
    //   "process.env.PUBLIC_KEY": JSON.stringify(process.env.PUBLIC_KEY),
    // }),
  ],
});
