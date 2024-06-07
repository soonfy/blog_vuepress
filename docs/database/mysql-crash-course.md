# MySQL 必知必会

## 1. 了解 SQL

### 1.1 数据库基础

数据库（database）保存有组织的数据的容器（通常是一个文件或一组文件）。  

_数据库不是数据库软件。数据库软件是 DBMS（数据库管理系统），数据库是通过 DBMS 创建和操纵的容器。_  

表（table）某种特定类型数据的结构化清单。  

模式（schema）关于数据库和表的布局及特性的信息。  

列（column）表中的一个字段。所有表都是一个或多个列组成的。  

数据类型（datatype）所容许的数据的类型。每个表列都有相应的数据类型，他限制（或容许）该列中存储的数据。  

行（row）表中的一个记录。  

主键（primary key）一列（或一组列），其值能够唯一区分表中的每个行。  

### 1.2 什么是 SQL

SQL 是结构化查询语言（Structured Query Language）的缩写。SQL 是一种专门用来于数据库通信的语言。  

## 2. MySQL 简介

### 2.1 什么是 MySQL

MySQL 是一种 DBMS，即它是一种数据库软件。  

DBMS 可以分为两类：一类为基于共享文件系统的 DBMS，另一类为基于客户机-服务器的 DBMS。前者（包括诸如 Microsoft Access 和 FileMaker）用于桌面用途，通常不用于高端或更关键的应用。

MySQL、Oracle 以及 Microsoft SQL Server 等数据库是基于客户机-服务器的数据库。客户机-服务器应用分为两个不同的部分。  

服务器部分是负责所有数据访问和处理的一个软件。与数据文件打交道的只有服务器软件，增删改查的所有请求都由服务器软件完成，这些请求来自于运行客户机软件的计算机。  

客户机是与用户打交道的软件。  

### 2.2 下载 MySQL

官网链接 `https://dev.mysql.com/downloads/mysql/` 下载 MySQL。_需要注意 MySQL 版本对应支持系统以及系统的版本_  

## 3. 使用 MySQL

### 3.1 连接

`mysql -u root -p -h host -P 9999`  

1. mysql: 连接数据库
2. -u: 一个合法的用户名  
3. -p: 用户口令  
4. -h: 主机名，如果连接本地 MySQL 服务器，可以为 localhost  
5. -P: 端口号，默认是 3306  

### 3.2 选择数据库

`USE database_name;`  

1. USE: 使用数据库  
2. database_name: 数据库名称  
3. 命令末尾都得加 ;  

### 3.3 了解数据库和表

`SHOW DATABASES;` 返回可用的数据库的列表  

`SHOW TABLES;` 返回可用的数据表的列表，先 USE 数据库之后，才能执行这个命令  

`SHOW COLUMNS FROM table_name;` 数据表中每个字段返回一行，行中包含字段名，数据类型，是否允许 NULL，键信息，默认值以及其他信息  

`DESCRIBE table_name;` 是 `SHOW COLUMNS FROM table_name;` 的一种快捷方式  

`SHOW STATUS;` 显示服务器的状态信息  

`SHOW CREATE DATABASE database_name;` 显示创建该数据库时的 MySQL 语句  

`SHOW CREATE TABLE table_name;` 显示创建该数据表时的 MySQL 语句  

`SHOW GRANTS;` 显示授予用户的安全权限  

`SHOW ERRORS;` 显示服务器的错误信息  

`SHOW WARNINGS;` 显示服务器的警告信息  

`HELP SHOW;` 显示可以执行的 show 语句  

## 4. 检索数据

### 4.1 SELECT 语句

每个 SQL 语句都是由一个或多个关键词构成的。SELECT 语句就是从一个或多个表中检索信息  

### 4.2 检索单个列

`SELECT column_name FROM table_name;` 利用 SELECT 语句从 table_name 中检索 column_name 列的数据  

SQL 语句是不区分大小写的，习惯对所有 SQL 关键词使用大写，对所有列和表名使用小写  

### 4.3 检索多个列

`SELECT column_name_1, column_name_2 FROM table_name;` SELECT 关键词后给出多个列名，列名之间必须以逗号分隔，最后一个列名后面不需要加逗号  

### 4.4 检索所有列

`SELECT * FROM table_name;` SELECT 关键词后给定一个通配符，则是返回表中的所有列，列的顺序是列在表定义中出现的顺序  

### 4.5 检索不同的行

`SELECT DISTINCT column_name FROM table_name;` DISTINCT 关键词只返回唯一的 column_name 值  

### 4.6 限制结果

`SELECT column_name FROM table_name LIMIT 5;` LIMIT 关键词限制返回结果的最大数量  

`SELECT column_name FROM table_name LIMIT 5, 10;` LIMIT 5, 10 限制从第 5 行开始，最大返回 10 条数据  

检索结果第一条数据是第 0 行  

`SELECT column_name FROM table_name LIMIT 10 OFFSET 5;` 限制从第 5 行开始，最大返回 10 条数据  

### 4.7 使用完全限定的表名和列名

`SELECT table_name.column_name FROM database_name.table_name;` 指定从 database_name 数据库中查找 table_name 表的 column_name 列

## 5. 排序检索数据

### 5.1 排序数据

如果不确定排序顺序，则不应该假定检索出的数据的顺序是有意义的  

SQL 语句由子句构成，明确对检索出来的结果进行排序，需要使用 ORDER BY 子句  

`SELECT column_name FROM table_name ORDER BY column_name;` ORDER BY 中使用的列一般是所选择的列，如果使用非选择的列，也是可以的  
