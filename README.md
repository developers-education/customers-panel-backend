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
3. Run migrations
   ```shell
   npm run app-database:migrations:sync
   ```
4. Start application
    ```shell
    npm run start:dev
    ```
Open documentation to make sure that web server started
http://localhost:4000/docs.


### For production
1. Provide environments.
   You can just copy content from `env/examples/app.env.example` to `env/run/app.env`
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
