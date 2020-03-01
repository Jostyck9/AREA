
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `actions`
--

use `area`;

DROP TABLE IF EXISTS `actions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `actions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `service_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `parameters` json DEFAULT NULL,
  `results` json DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `action name` (`name`)
) DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actions`
--

-- LOCK TABLES `actions` WRITE;

INSERT INTO `actions` VALUES (0, 0, "push", "a new push is intended by someone", '{"username": "string", "repository": "string"}', '{"message": "string"}');
INSERT INTO `actions` VALUES (1, 0, "pull_request", "a new pull request is intended by someone", '{"username": "string", "repository": "string"}', '{"message": "string"}');
INSERT INTO `actions` VALUES (2, 1, "tweet", "a new tweet has been post", '{}', '{"user": "string", "message": "string"}');
INSERT INTO `actions` VALUES (3, 2, "playlist_modified", "A music has been added or deleted from a playlist", '{"playlistId": "string"}', '{"message": "string"}');
INSERT INTO `actions` VALUES (4, 3, "messaged_received", "A new message has been received", '{"server": "string", "channel": "string"}', '{"message": "string"}');
INSERT INTO `actions` VALUES (5, 3, "a_user_joined", "A new user has joined the server", '{"server": "string"}', '{"message": "string"}');
INSERT INTO `actions` VALUES (6, 3, "a_user_is_banned", "A user has been ban from the server", '{"server": "string"}', '{"message": "string"}');
INSERT INTO `actions` VALUES (7, 3, "channel_created", "A channel has been created on the server", '{"server": "string"}', '{"message": "string"}');
INSERT INTO `actions` VALUES (8, 4, "timer", "Do an action at min interval", '{"interval": "int"}', '{"message": "string"}');
INSERT INTO `actions` VALUES (9, 5, "file_added", "A file has been add on the server", '{}', '{"name": "string", "user": "string"}');
INSERT INTO `actions` VALUES (10, 5, "file_deleted", "A file has been deleted on the server", '{}', '{"name": "string", "user": "string"}');

/*!40000 ALTER TABLE `actions` DISABLE KEYS */;
/*!40000 ALTER TABLE `actions` ENABLE KEYS */;
-- UNLOCK TABLES;

--
-- Table structure for table `github`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `github` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `client_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `repo_name` varchar(50) NOT NULL,
  `webhook_type`varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `area`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `area` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `client_id` int(11) NOT NULL,
  `action_id` int(11) NOT NULL,
  `reaction_id` int(11) NOT NULL,
  `parameters_action` json DEFAULT NULL,
  `parameters_reaction` json DEFAULT NULL,
  PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `area`
--

-- LOCK TABLES `area` WRITE;
/*!40000 ALTER TABLE `area` DISABLE KEYS */;
/*!40000 ALTER TABLE `area` ENABLE KEYS */;
-- UNLOCK TABLES;

--
-- Table structure for table `reactions`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dropbox` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `client_id` int(11) NOT NULL,
  `dropbox_id` varchar(200) NOT NULL,
  `dropbox_cursor` varchar(200) NOT NULL,
  UNIQUE KEY `service client_id` (`client_id`),
  PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `timer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `client_id` int(11) NOT NULL,
  `area_id` int(11) NOT NULL,
  `interval_timer` int(11) NOT NULL,
  `current_timer` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `spotify` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `client_id` int(11) NOT NULL,
  `area_id` int(11) NOT NULL,
  `tracks` TEXT NOT NULL,
  PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;


/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `url_callback` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url_id` varchar(15) NOT NULL,
  `url` varchar(200) NOT NULL,
  `client_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `service name` (`url_id`)
) DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

DROP TABLE IF EXISTS `reactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reactions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `service_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `parameters` json DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `service name` (`name`)
) DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reactions`
--

-- LOCK TABLES `reactions` WRITE;

INSERT INTO `reactions` VALUES (0, 1, "tweet", "post a new tweet", '{"message": "string"}');
INSERT INTO `reactions` VALUES (1, 2, "add_music", "add a new music to an existing playlist", '{"music": "string", "playlist": "string"}');
INSERT INTO `reactions` VALUES (2, 2, "play_music", "play a music on your devise", '{"music": "string"}');
INSERT INTO `reactions` VALUES (3, 2, "pause_music", "pause the music on your devise if playing", '{}');
INSERT INTO `reactions` VALUES (4, 2, "add_to_queue", "add a music to the player queue", '{"music": "string"}');
INSERT INTO `reactions` VALUES (5, 3, "send_message", "send a message to a specific channel", '{"server" : "string", "channel": "string", "message": "string"}');
INSERT INTO `reactions` VALUES (6, 3, "create_channel", "create a channel", '{"server" : "string", "channel": "string"}');
INSERT INTO `reactions` VALUES (7, 6, "send_mail", "send a mail", '{"to": "string", "subject": "string", "message": "string"}');

/*!40000 ALTER TABLE `reactions` DISABLE KEYS */;
/*!40000 ALTER TABLE `reactions` ENABLE KEYS */;
-- UNLOCK TABLES;

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `services` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `oauth` boolean NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `service name` (`name`)
) DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

-- LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT INTO `services` VALUES (0,'github', 1);
INSERT INTO `services` VALUES (1,'twitter', 1);
INSERT INTO `services` VALUES (2,'spotify', 1);
INSERT INTO `services` VALUES (3,'discord', 0);
INSERT INTO `services` VALUES (4,'timer', 0);
INSERT INTO `services` VALUES (5,'dropbox', 1);
INSERT INTO `services` VALUES (6,'mail', 0);

/*!40000 ALTER TABLE `services` ENABLE KEYS */;
-- UNLOCK TABLES;

--
-- Table structure for table `services_auth`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `services_auth` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `client_id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  `access_token` varchar(500) DEFAULT NULL,
  `refresh_token` varchar(500) DEFAULT NULL,
  `secret_token` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services_auth`
--

-- LOCK TABLES `services_auth` WRITE;
/*!40000 ALTER TABLE `services_auth` DISABLE KEYS */;
/*!40000 ALTER TABLE `services_auth` ENABLE KEYS */;
-- UNLOCK TABLES;

--
-- Table structure for table `tokens`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tokens` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `client_id` int(11) NOT NULL,
  `token` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tokens`
--

-- LOCK TABLES `tokens` WRITE;
/*!40000 ALTER TABLE `tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `tokens` ENABLE KEYS */;
-- UNLOCK TABLES;

--
-- Table structure for table `users`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(70) NOT NULL,
  `is_oauth2` boolean NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user email` (`email`)
) DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

-- LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
-- UNLOCK TABLES;

--
-- Dumping routines for database 'area'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;


















CREATE DATABASE IF NOT EXISTS `area_test`;


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `actions`
--
use `area_test`;

DROP TABLE IF EXISTS `actions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `actions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `service_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `parameters` json DEFAULT NULL,
  `results` json DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `action name` (`name`)
) DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actions`
--

-- LOCK TABLES `actions` WRITE;

INSERT INTO `actions` VALUES (0, 0, "push", "a new push is intended by someone", '{"repository": "string"}', '{"message": "string"}');
INSERT INTO `actions` VALUES (1, 0, "pull_request", "a new pull request is intended by someone", '{"repository": "string"}', '{"message": "string"}');
INSERT INTO `actions` VALUES (2, 1, "tweet", "a new tweet has been post", '{}', '{"message": "string"}');
INSERT INTO `actions` VALUES (3, 2, "playlist_modified", "A music has been added or deleted from a playlist", '{"playlistId": "string"}', '{"message": "string"}');
INSERT INTO `actions` VALUES (4, 3, "messaged_received", "A new message has been received", '{"server": "string", "channel": "string"}', '{"message": "string"}');
INSERT INTO `actions` VALUES (5, 3, "a_user_joined", "A new user has joined the server", '{"server": "string"}', '{"message": "string"}');
INSERT INTO `actions` VALUES (6, 3, "a_user_is_banned", "A user has been ban from the server", '{"server": "string"}', '{"message": "string"}');
INSERT INTO `actions` VALUES (7, 4, "timer", "Do an action at min interval", '{"interval": "int"}', '{"message": "string"}');
INSERT INTO `actions` VALUES (8, 5, "file_added", "A file has been add on the server", '{}', '{"message": "string"}');
INSERT INTO `actions` VALUES (9, 5, "file_deleted", "A file has been deleted on the server", '{}', '{"message": "string"}');

/*!40000 ALTER TABLE `actions` DISABLE KEYS */;
/*!40000 ALTER TABLE `actions` ENABLE KEYS */;
-- UNLOCK TABLES;

--
-- Table structure for table `area`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `area` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `client_id` int(11) NOT NULL,
  `action_id` int(11) NOT NULL,
  `reaction_id` int(11) NOT NULL,
  `parameters_action` json DEFAULT NULL,
  `parameters_reaction` json DEFAULT NULL,
  PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `area`
--

-- LOCK TABLES `area` WRITE;
/*!40000 ALTER TABLE `area` DISABLE KEYS */;
/*!40000 ALTER TABLE `area` ENABLE KEYS */;
-- UNLOCK TABLES;

--
-- Table structure for table `reactions`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dropbox` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `client_id` int(11) NOT NULL,
  `dropbox_id` varchar(200) NOT NULL,
  `dropbox_cursor` varchar(200) NOT NULL,
  UNIQUE KEY `service client_id` (`client_id`),
  PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `timer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `client_id` int(11) NOT NULL,
  `area_id` int(11) NOT NULL,
  `interval_timer` int(11) NOT NULL,
  `current_timer` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `spotify` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `client_id` int(11) NOT NULL,
  `area_id` int(11) NOT NULL,
  `tracks` TEXT NOT NULL,
  PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;


/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `url_callback` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url_id` varchar(15) NOT NULL,
  `url` varchar(200) NOT NULL,
  `client_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `service name` (`url_id`)
) DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

DROP TABLE IF EXISTS `reactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reactions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `service_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `parameters` json DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `service name` (`name`)
) DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reactions`
--

-- LOCK TABLES `reactions` WRITE;

INSERT INTO `reactions` VALUES (0, 1, "tweet", "post a new tweet", '{"message": "string"}');
INSERT INTO `reactions` VALUES (1, 2, "add_music", "add a new music to an existing playlist", '{"music": "string", "playlist": "string"}');
INSERT INTO `reactions` VALUES (2, 2, "play_music", "play a music on your devise", '{"music": "string"}');
INSERT INTO `reactions` VALUES (3, 2, "pause_music", "pause the music on your devise if playing", '{}');
INSERT INTO `reactions` VALUES (4, 2, "add_to_queue", "add a music to the player queue", '{"music": "string"}');
INSERT INTO `reactions` VALUES (5, 3, "send_message", "send a message to a specific channel", '{"message": "string", "channel": "string"}');
INSERT INTO `reactions` VALUES (6, 3, "create_channel", "create a channel", '{"channel": "string"}');
INSERT INTO `reactions` VALUES (7, 6, "send_mail", "send a mail", '{"to": "string", "subject": "string", "message": "string"}');

/*!40000 ALTER TABLE `reactions` DISABLE KEYS */;
/*!40000 ALTER TABLE `reactions` ENABLE KEYS */;
-- UNLOCK TABLES;

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `services` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `oauth` boolean NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `service name` (`name`)
) DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

-- LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT INTO `services` VALUES (0,'github', 1);
INSERT INTO `services` VALUES (1,'twitter', 1);
INSERT INTO `services` VALUES (2,'spotify', 1);
INSERT INTO `services` VALUES (3,'discord', 0);
INSERT INTO `services` VALUES (4,'timer', 0);
INSERT INTO `services` VALUES (5,'dropbox', 1);
INSERT INTO `services` VALUES (6,'mail', 0);

/*!40000 ALTER TABLE `services` ENABLE KEYS */;
-- UNLOCK TABLES;

--
-- Table structure for table `services_auth`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `services_auth` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `client_id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  `access_token` varchar(500) DEFAULT NULL,
  `refresh_token` varchar(500) DEFAULT NULL,
  `secret_token` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services_auth`
--

-- LOCK TABLES `services_auth` WRITE;
/*!40000 ALTER TABLE `services_auth` DISABLE KEYS */;
/*!40000 ALTER TABLE `services_auth` ENABLE KEYS */;
-- UNLOCK TABLES;

--
-- Table structure for table `tokens`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tokens` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `client_id` int(11) NOT NULL,
  `token` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tokens`
--

-- LOCK TABLES `tokens` WRITE;
/*!40000 ALTER TABLE `tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `tokens` ENABLE KEYS */;
-- UNLOCK TABLES;

--
-- Table structure for table `users`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(70) NOT NULL,
  `is_oauth2` boolean NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user email` (`email`)
) DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

-- LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
-- UNLOCK TABLES;

--
-- Dumping routines for database 'area'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;