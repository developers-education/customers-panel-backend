create table if not exists customer (
    id uuid primary key,
    user_id uuid not null,
    first_name text not null,
    last_name text not null,
    id_number text not null,
    birth_date date not null,
    email text not null,
    phone text,
    created_at timestamptz default current_timestamp not null,
    foreign key(user_id) references user(id)
);
