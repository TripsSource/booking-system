module.exports = {
  apps: [
    {
      name: "rica___admin", // Name of your app
      script: "npm", // Use npm or yarn
      args: "npm start", // Command to run the app, e.g., `npm start`
      //   cwd: "/path/to/your/app", // Optional, working directory if not in the root
      watch: true, // Optional, restart app on file changes
      env: {
        NODE_ENV: "production", // Define environment variables here
      },
      log_file: "/var/log/rica___admin.log", // Optional, log file path
    },
  ],
};
