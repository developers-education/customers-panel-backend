# Customers Panel Backend

Backend for customers panel application

## Requirements
* NodeJS >= v20.x.x
* npm (package manager)
* Docker with docker-compose (for production)

## Run application

### For development
1. Install dependencies
    ```shell
    npm install
    ```
2. Provide environments.
You can just copy content from `env/examples/app.env.example` to `env/run/app.env`
3. Start application
    ```shell
    npm run start:dev
    ```
4. Run migrations
   ```shell
   npm run app-database:migrations:sync
   ```

### For production
1. Provide environment variables (see `env/examples`):
    * `env/run/app.env`
    * `env/run/app-database.env`
2. Start app with services
    ```shell
    npm run compose:up
    ```
3. Open shell in docker container and run migrations
   ```shell
   docker exec -it <container_id> bash
   cd app
   npm run app-database:migrations:sync
   ```
