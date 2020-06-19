CREATE TABLE `checkpoint3`.`track` (
  `id` INT UNSIGNED NOT NULL,
  `title` VARCHAR(128) NULL,
  `artist` VARCHAR(128) NULL,
  `album_picture` VARCHAR(256) NULL,
  `youtube_url` VARCHAR(128) NULL,
  `playlist_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_playlist_id`
    FOREIGN KEY ()
    REFERENCES `checkpoint3`.`playlist` ()
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

