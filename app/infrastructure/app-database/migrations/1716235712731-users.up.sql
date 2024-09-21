create table if not exists user (
    id uuid primary key,
    login text not null unique,
    password_hash text not null,
    salt text not null,
    created_at timestamptz default current_timestamp not null,
    updated_at timestamptz default current_timestamp not null
);
