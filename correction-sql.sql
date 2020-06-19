CREATE TABLE `checkpoint3`.`track` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `playlist_id` INT NULL,
  `title` VARCHAR(128) NULL,
  `artist` VARCHAR(128) NULL,
  `album_picture` VARCHAR(256) NULL,
  `youtube_url` VARCHAR(128) NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `checkpoint3`.`playlist` (
  `id` INT NOT NULL,
  `title` VARCHAR(128) NULL,
  `genre` VARCHAR(128) NULL,
  PRIMARY KEY (`id`));

ALTER TABLE `checkpoint3`.`track` 
ADD INDEX `playslist_id_idx` (`playlist_id` ASC) VISIBLE;
;
ALTER TABLE `checkpoint3`.`track` 
ADD CONSTRAINT `playslist_id`
  FOREIGN KEY (`playlist_id`)
  REFERENCES `checkpoint3`.`track` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;