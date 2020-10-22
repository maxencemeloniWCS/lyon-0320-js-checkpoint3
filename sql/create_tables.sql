CREATE TABLE `playlists_checkpoint3`.`playlist` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(128) NOT NULL,
  `genre` VARCHAR(128) NULL,
  PRIMARY KEY (`id`)
);


CREATE TABLE `playlists_checkpoint3`.`track` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `playlist_id` INT(11) NULL,
  `title` VARCHAR(128) NOT NULL,
  `artist` VARCHAR(128) NOT NULL,
  `album_picture` VARCHAR(256) NULL,
  `youtube_url` VARCHAR(256) NULL,
  PRIMARY KEY (`id`)
);


ALTER TABLE `playlists_checkpoint3`.`track`
  ADD CONSTRAINT `playlist_id` FOREIGN KEY (`playlist_id`) REFERENCES `playlist` (`id`) ON DELETE SET NULL ON UPDATE SET NULL;

