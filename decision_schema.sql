CREATE TABLE creators(
  id SERIAL PRIMARY KEY NOT NULL,
  email VARCHAR(200)
);


CREATE TABLE polls(
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR (200),
  description TEXT,
  status VARCHAR(200),
  admin_code VARCHAR(200),
  share_code VARCHAR (200),
  creator_id INTEGER NOT NULL
);
-- Join your options keys with the polls table!

CREATE TABLE votes(
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(200),
  option_id INTEGER NOT NULL
);

CREATE TABLE options(
  id SERIAL PRIMARY KEY NOT NULL,
  description TEXT,
  poll_id INTEGER NOT NULL
);


ALTER TABLE polls ADD CONSTRAINT polls_creators_fk
FOREIGN KEY (creator_id) REFERENCES creators(id);


ALTER TABLE votes ADD CONSTRAINT votes_polls_fk
FOREIGN KEY (poll_id)REFERENCES polls(id);

ALTER TABLE options ADD CONSTRAINT options_polls_fk
FOREIGN KEY (poll_id) REFERENCES polls(id);