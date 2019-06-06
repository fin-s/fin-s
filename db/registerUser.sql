insert into users_login (hash, email)
values ($4, $1);

insert into users (firstname, lastname, email, steps)
values ($2, $3, $1, $5) returning *;

