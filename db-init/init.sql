
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

INSERT INTO `actions` VALUES (0, 0, "push", "a new push is intended by someone", '{"repository": "string"}', '{"message": "string"}');
INSERT INTO `actions` VALUES (1, 0, "pull_request", "a new pull request is intended by someone", '{"repository": "string"}', '{"message": "string"}');
INSERT INTO `actions` VALUES (2, 1, "tweet", "a new tweet has been post", '{"user": "string"}', '{"message": "string"}');
INSERT INTO `actions` VALUES (3, 2, "music_added", "A new music has been added to a playlist", '{"playlist": "string"}', '{"message": "string"}');
INSERT INTO `actions` VALUES (4, 3, "email_received", "A new email has been received", '{"from": "string"}', '{"message": "string"}');
INSERT INTO `actions` VALUES (5, 3, "event_created", "A new event has been created in calendar", '{"calendar": "string"}', '{"message": "string"}');
INSERT INTO `actions` VALUES (6, 4, "messaged_received", "A new message has been received", '{"server": "string", "channel": "string"}', '{"message": "string"}');
INSERT INTO `actions` VALUES (7, 4, "a_user_joined", "A new user has joined the server", '{"server": "string"}', '{"message": "string"}');
INSERT INTO `actions` VALUES (8, 5, "card_added", "A new card has been had to a board", '{"board": "string"}', '{"message": "string"}');
INSERT INTO `actions` VALUES (9, 5, "deadline_soon", "A card approched a deadline", '{"board": "string"}', '{"message": "string"}');
INSERT INTO `actions` VALUES (10, 6, "file_deleted", "A file has been delete", '{}', '{"file": "string"}');
INSERT INTO `actions` VALUES (11, 6, "file_added", "A new file has been add", '{}', '{"message": "string"}');
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
INSERT INTO `reactions` VALUES (1, 2, "add_music", "add a new music to an existing playlist", NULL);
INSERT INTO `reactions` VALUES (2, 3, "create_event", "create a new event in calendar", NULL);
INSERT INTO `reactions` VALUES (3, 3, "send_email", "send an email", NULL);
INSERT INTO `reactions` VALUES (4, 4, "send_message", "send a message to a specific channel", NULL);
INSERT INTO `reactions` VALUES (5, 5, "add_card", "add a new card to an existing board", NULL);

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
  PRIMARY KEY (`id`),
  UNIQUE KEY `service name` (`name`)
) DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

-- LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT INTO `services` VALUES (0,'github');
INSERT INTO `services` VALUES (1,'twitter');
INSERT INTO `services` VALUES (2,'spotify');
INSERT INTO `services` VALUES (3,'outlook');
INSERT INTO `services` VALUES (4,'discord');
INSERT INTO `services` VALUES (5,'trello');
INSERT INTO `services` VALUES (6,'onedrive');
/*!40000 ALTER TABLE `services` ENABLE KEYS */;
-- UNLOCK TABLES;

--
-- Table structure for table `services_auth`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `services_auth` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `client_id` int(11) DEFAULT NULL,
  `service_id` int(11) DEFAULT NULL,
  `access_token` varchar(200) NOT NULL,
  `refresh_token` varchar(200) NOT NULL,
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
INSERT INTO `actions` VALUES (2, 1, "tweet", "a new tweet has been post", '{"user": "string"}', '{"message": "string"}');
INSERT INTO `actions` VALUES (3, 2, "music_added", "A new music has been added to a playlist", '{"playlist": "string"}', '{"message": "string"}');
INSERT INTO `actions` VALUES (4, 3, "email_received", "A new email has been received", '{"from": "string"}', '{"message": "string"}');
INSERT INTO `actions` VALUES (5, 3, "event_created", "A new event has been created in calendar", '{"calendar": "string"}', '{"message": "string"}');
INSERT INTO `actions` VALUES (6, 4, "messaged_received", "A new message has been received", '{"server": "string", "channel": "string"}', '{"message": "string"}');
INSERT INTO `actions` VALUES (7, 4, "a_user_joined", "A new user has joined the server", '{"server": "string"}', '{"message": "string"}');
INSERT INTO `actions` VALUES (8, 5, "card_added", "A new card has been had to a board", '{"board": "string"}', '{"message": "string"}');
INSERT INTO `actions` VALUES (9, 5, "deadline_soon", "A card approched a deadline", '{"board": "string"}', '{"message": "string"}');
INSERT INTO `actions` VALUES (10, 6, "file_deleted", "A file has been delete", '{}', '{"file": "string"}');
INSERT INTO `actions` VALUES (11, 6, "file_added", "A new file has been add", '{}', '{"message": "string"}');
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
INSERT INTO `reactions` VALUES (1, 2, "add_music", "add a new music to an existing playlist", NULL);
INSERT INTO `reactions` VALUES (2, 3, "create_event", "create a new event in calendar", NULL);
INSERT INTO `reactions` VALUES (3, 3, "send_email", "send an email", NULL);
INSERT INTO `reactions` VALUES (4, 4, "send_message", "send a message to a specific channel", NULL);
INSERT INTO `reactions` VALUES (5, 5, "add_card", "add a new card to an existing board", NULL);

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
  PRIMARY KEY (`id`),
  UNIQUE KEY `service name` (`name`)
) DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

-- LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT INTO `services` VALUES (0,'github');
INSERT INTO `services` VALUES (1,'twitter');
INSERT INTO `services` VALUES (2,'spotify');
INSERT INTO `services` VALUES (3,'outlook');
INSERT INTO `services` VALUES (4,'discord');
INSERT INTO `services` VALUES (5,'trello');
INSERT INTO `services` VALUES (6,'onedrive');
/*!40000 ALTER TABLE `services` ENABLE KEYS */;
-- UNLOCK TABLES;

--
-- Table structure for table `services_auth`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
DROP TABLE IF EXISTS `services_auth`;

CREATE TABLE `services_auth` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `client_id` int(11) DEFAULT NULL,
  `service_id` int(11) DEFAULT NULL,
  `access_token` varchar(200) NOT NULL,
  `refresh_token` varchar(200) NOT NULL,
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

DROP TABLE IF EXISTS `tokens`;

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

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(70) NOT NULL,
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