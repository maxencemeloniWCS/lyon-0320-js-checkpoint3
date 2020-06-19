CREATE DATABASE playlist;
USE playlist;

CREATE TABLE IF NOT EXISTS playlist(
  id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(128) NOT NULL,
  genre VARCHAR(128)
);

CREATE TABLE IF NOT EXISTS tracks(
  id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  playlist_id INT(11),
  title VARCHAR(128),
  artist VARCHAR(128),
  album_picture VARCHAR(256),
  youtube_url VARCHAR(128)
);

ALTER TABLE tracks
ADD CONSTRAINT fk_playlist_tracks
FOREIGN KEY (playlist_id) 
REFERENCES playlist(id);
