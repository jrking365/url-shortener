# url-shortener

 url shortener test

# Starting the application

first of all add a .env at the root and it can be the following 
```
NODE_ENV=development
PORT=3000
DB_HOST=db
DB_PORT=5432
DB_USERNAME=api
DB_PASSWORD=api123
DB_DATABASE=url_shortener
```

to start the api and the database , just run

```bash
docker-compose up
```

this should start the app on port 3000

the API doc is available on `/docs`, it is a swagger documentation that follows the convention.

script to create the DB tables 
```sql
CREATE TABLE users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE urls (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    original_url VARCHAR(255) NOT NULL,
    code VARCHAR(255) UNIQUE NOT NULL,
    user_id UUID NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

```
