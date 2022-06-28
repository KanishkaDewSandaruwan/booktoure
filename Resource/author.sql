-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 28, 2022 at 10:54 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `naval`
--

-- --------------------------------------------------------

--
-- Table structure for table `author`
--

CREATE TABLE `author` (
  `author_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone` int(255) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `cdate` varchar(255) NOT NULL,
  `accept` varchar(255) NOT NULL,
  `facebook` varchar(255) NOT NULL,
  `twitter` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `author`
--

INSERT INTO `author` (`author_id`, `name`, `description`, `address`, `phone`, `gender`, `email`, `password`, `cdate`, `accept`, `facebook`, `twitter`) VALUES
(1, '', '', '', 0, '', 'admin', '12345', '', '', '', ''),
(2, 'Chamee Thiaybarahebegedara', 'Chamee', 'Kithulgala', 776408311, 'female', 'chamee@gmail.com', '12345', '2022-06-25 21:16:54', 'Yes', 'https://www.facebook.com/%E0%B6%A0%E0%B6%B8%E0%B7%93-%E0%B6%AD%E0%B7%92%E0%B6%BA%E0%B6%B9%E0%B6%BB%E0%B7%8F%E0%B7%84%E0%B7%9A%E0%B6%B1%E0%B7%9A-%E0%B6%9C%E0%B7%99%E0%B6%AF%E0%B6%BB-Chami-Thiyambarahene-Gedara-100224081913509/', 'https://www.facebook.com/%E0%B6%A0%E0%B6%B8%E0%B7%93-%E0%B6%AD%E0%B7%92%E0%B6%BA%E0%B6%B9%E0%B6%BB%E0%B7%8F%E0%B7%84%E0%B7%9A%E0%B6%B1%E0%B7%9A-%E0%B6%9C%E0%B7%99%E0%B6%AF%E0%B6%BB-Chami-Thiyambarahene-Gedara-100224081913509/'),
(3, 'Sathi Perera', 'writer', 'Colombo', 774567852, 'female', 'satthip@gmail.com', 'abc123', '2022-06-26 23:4:33', 'Yes', 'https://www.facebook.com/sathi.perera.90', 'https://www.facebook.com/sathi.perera.90'),
(4, 'Udaari Premarathne', 'Writer', 'Galle', 2147483647, 'female', 'udaaripem@gmail.com', 'udari', '2022-06-26 23:58:6', 'Yes', 'https://www.facebook.com/udaaaprem', 'https://www.facebook.com/udaaaprem');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `author`
--
ALTER TABLE `author`
  ADD PRIMARY KEY (`author_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `author`
--
ALTER TABLE `author`
  MODIFY `author_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
