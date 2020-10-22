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
(`id`));


ALTER TABLE `song`.`track`
ADD CONSTRAINT `playslist_id`
  FOREIGN KEY
(`playlist_id`)
 REFERENCES `song`.`track`
(`id`)
