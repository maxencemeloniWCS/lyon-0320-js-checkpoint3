CREATE DATABASE song;

USE song;

CREATE TABLE `song`.`playlist`
(
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR
(128) NOT NULL,
  `genre` VARCHAR
(128) NOT NULL,
  PRIMARY KEY
(`id`));

CREATE TABLE `song`.`track`
(
  `id` INT NOT NULL AUTO_INCREMENT,
  `playlist_id` INT,
  `title` VARCHAR
(128) NOT NULL,
  `artist` VARCHAR
(128) NOT NULL,
  `album_picture` VARCHAR
(256),
  `youtube_url` VARCHAR
(128),
  PRIMARY KEY
(`id`),
FOREIGN KEY
(playlist_id)
        REFERENCES playlist
(id)
        ON
DELETE CASCADE)
;


CREATE TABLE `song`.`user`
(
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR
(128) NOT NULL,
  `last_name` VARCHAR
(128) NOT NULL,
`email` VARCHAR
(128) NOT NULL,
`password` VARCHAR
(128) NOT NULL,
  PRIMARY KEY
(`id`));

ALTER TABLE `song`.`playlist`
ADD owner_id INT,
ADD FOREIGN KEY
(owner_id)
        REFERENCES user
(id)
        ON
DELETE CASCADE;


CREATE TABLE `song`.`user_playlist`
(
  `id` INT NOT NULL AUTO_INCREMENT,
  `playlist_id` INT NOT NULL,
  `user_id` INT NOT NULL,
FOREIGN KEY
(playlist_id)
        REFERENCES playlist
(id),
FOREIGN KEY
(user_id)
        REFERENCES user
(id),
  PRIMARY KEY
(`id`));

