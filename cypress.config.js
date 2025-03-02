import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
<<<<<<< HEAD
    baseUrl: "http://localhost:5173",

    setupNodeEvents(on, config) {
      // implement node event listeners here
      return config;
    },
   }
=======
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
>>>>>>> 5b4209fdf8cdd12e8064412aa3ee65320476620c
});
