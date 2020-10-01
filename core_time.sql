-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 17, 2020 at 10:46 PM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.4.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cu_portal`
--

-- --------------------------------------------------------

--
-- Table structure for table `core_time`
--

CREATE TABLE `core_time` (
  `id` int(10) NOT NULL,
  `FK_CORE_USER` int(10) DEFAULT NULL,
  `code` varchar(10) DEFAULT NULL COMMENT 'รหัสของโปรแกรมในระบบ',
  `start_date` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT 'วันที่เริ่มต้นทำงาน (ตอนแสดงผลปีให้แสดงเป็น พ.ศ.)',
  `end_date` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT 'วันที่สิ้นสุดทำงาน  (ตอนแสดงผลปีให้แสดงเป็น พ.ศ.)',
  `update_time` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT 'แก้ไขข้อมูลล่าสุด ตอนแสดงผลปีให้แสดงเป็น พ.ศ.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `core_time`
--
ALTER TABLE `core_time`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_CORE_USER` (`FK_CORE_USER`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `core_time`
--
ALTER TABLE `core_time`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `core_time`
--
ALTER TABLE `core_time`
  ADD CONSTRAINT `FK_CORE_USER` FOREIGN KEY (`FK_CORE_USER`) REFERENCES `core_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
