module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [

    // First application
    {
      name: "AryaBaseServer",
      script: "arya-base-server.js",
      wait_ready: true,
      listen_timeout: 6000,
      instances: 1,
      exec_mode: "cluster",
      env: {
        NODE_ENV: "development"
      },
      env_production: {
        NODE_ENV: "production"
      },
      env_staging: {
        NODE_ENV: "staging"
      }
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy: {
    production: {
      user: "node",
      host: "139.59.80.56",
      ref: "origin/master",
      repo: "git@github.com:repo.git",
      path: "/var/www/production",
      "post-deploy": "npm install && pm2 startOrRestart ecosystem.config.js --env production"
    },
    dev: {
      user: "node",
      host: "139.59.80.56",
      ref: "origin/master",
      repo: "git@github.com:repo.git",
      path: "/var/www/development",
      "post-deploy": "npm install && pm2 startOrRestart ecosystem.config.js --env dev",
      env: {
        NODE_ENV: "dev"
      }
    }
  }
}


