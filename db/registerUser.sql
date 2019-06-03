insert into users_login (hash)
values (
  ${hash}
) 

insert into users (firstname, lastname, email)
values (
  ${firstname},
  ${lastname},
  ${email}
) returning firstname, lastname, email;

