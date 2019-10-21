-- phpMyAdmin SQL Dump
-- version 4.4.15.10
-- https://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: 2019-10-21 09:56:15
-- 服务器版本： 10.0.32-MariaDB
-- PHP Version: 5.4.45

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `chargeaccount`
--

-- --------------------------------------------------------

--
-- 表的结构 `icons`
--

CREATE TABLE IF NOT EXISTS `icons` (
  `id` int(6) NOT NULL,
  `icon` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `des` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `openid` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `type` int(6) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 转存表中的数据 `icons`
--

INSERT INTO `icons` (`id`, `icon`, `des`, `openid`, `type`) VALUES
(1, 'icon-shuiguo', '水果', NULL, 1),
(2, 'icon-shucai', '蔬菜', NULL, 1),
(3, 'icon-gouwu', '购物', NULL, 1),
(4, 'icon-jiaotongxinxi', '交通', NULL, 1),
(5, 'icon-yule', '娱乐', NULL, 1),
(6, 'icon-tongxun', '通讯', NULL, 1),
(7, 'icon-lingshi', '零食', NULL, 1),
(8, 'icon-riyongpin', '日用', NULL, 1),
(9, 'icon-yundongfushi', '服饰', NULL, 1),
(10, 'icon-yiliao', '医疗', NULL, 1),
(11, 'icon-92', '餐饮', NULL, 1),
(12, 'icon-gongzi', '工资', NULL, 2),
(13, 'icon-jianzhi', '兼职', NULL, 2),
(14, 'icon-licai', '理财', NULL, 2),
(15, 'icon-lijin', '礼金', NULL, 2),
(16, 'icon-meiyuanqian', '奖金', NULL, 2),
(17, 'icon-qian1', '其他', NULL, 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `icons`
--
ALTER TABLE `icons`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `icons`
--
ALTER TABLE `icons`
  MODIFY `id` int(6) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=75;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
