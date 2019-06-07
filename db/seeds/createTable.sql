CREATE TABLE "users" (
  "users_id" serial UNIQUE PRIMARY KEY,
  "firstname" varchar,
  "lastname" varchar,
  "email" text,
  "stepsCompleted" int []
);

CREATE TABLE "users_login" (
  "users_login_id" serial PRIMARY KEY,
  "users_id" int references users,
  "hash" text
);

CREATE TABLE "incomes" (
  "income_id" serial PRIMARY KEY,
  "fixed" boolean,
  "users_id" int references users,
  "frequency" varchar,
  "income_date" varchar,
  "income_date_2" varchar,
  "income_weekday" varchar,
  "income_name" varchar,
  "notes" varchar
);

CREATE TABLE "debts" (
  "debts_id" serial PRIMARY KEY,
  "users_id" int references users,
  "name" int,
  "balance" int,
  "minimum_payment" int,
  "interest_rate" int,
  "notes" varchar
);

CREATE TABLE "expenses" (
  "expenses_id" serial PRIMARY KEY,
  "users_id" int references users,
  "name" varchar,
  "amount" int,
  "notes" varchar
);

CREATE TABLE "blog" (
  "blog_id" serial PRIMARY KEY,
  "users_id" int references users,
  "title" varchar,
  "body" text
);