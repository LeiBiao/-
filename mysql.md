## mysql链接
1.打开XAMPP服务器
2.输入 mysql.exe -h127.0.0.1 -P3306 -uroot -p
3.退出  quit 

- 简写 mysql -uroot


## mysql常用管理命令
show databases;                     -显示当前数据库服务器下的所有的数据库

use  数据库名 ;                     -进入数据库

show tables;                        -显示当前数据的表

desc  表名;                               -显示表的列

show create table;                  -查看创建表所用命令

 mysql -uroot  < 脚本路径                 -提交sql脚本

drop database if exists 数据库名        -如果该数据库存在,就丢弃

**规范写法:关键字用大写**

## 创建表
create database 表名;
## 插入数据

insert into 表名 values('1','TOM','M','87');

## 查询
select * from 表名

*as别名* as关键字可省略

`selec eid as编号 from std`

## 删除数据

delete from 表名 where 条件;

##　修改数据

updata 表名 set 要修改的值 where 条件; 

```mysql
#设置客户端连接服务器端的编码为UTF8
SET NAMES UTF8;
#删除重复库
DROP DATABASE IF EXISTS XZ;
#创建库,设置存储编码为UTF8
CREATE DATABASE xz CHARSET=UTF8;

USE xz;
#创建表
CREATE TABLE user(
uid INT,
uname VARCHAR(16),
email VARCHAR(32),
phone VARCHAR(11),
headpic VARCHAR(64),
userName VARCHAR(8),
sex VARCHAR(1)
);
#插入数据
INSERT INTO user
VALUES('2','jinjin','jin@qq.com','123456781','jin.jpg','晶晶','f');
INSERT INTO user
VALUES('1','xinxin','xin@qq.com','123456782','xin.jpg','李鑫','m');
#删除数据
DELETE FROM user WHERE uid='2';

#修改数据
UPDATE user SET phone='16602721748',headpic='abc.jpg'WHERE uid='1';

```



## 列类型

* float(M,D) 浮点型
* decimal(M,D) 定点型 比float更加的精准          

```mysql
     	126.35
       M:小数总共多少位 decimal(5, )
       D:小数点后面几位 decimal(5, 2)
```
* bool 布尔

  存进去的是1和0

* char (M)     定长字符串

* varchar(M)  变长字符串 ,不存在空间浪费

* date     日期 1000-10-10

* time     时间  00:00:00

* datetime  日期时间   1000-10-10 00:00:00

* smallint 小整形 2字节  -32768---32767

* int   4字节   -21474843648----21474843647

*  tinyint :
             
             占 1字节
             
             ​    范围:  
             ​      有符号: -128到127
             ​      无符号: 0 到 255 unsigned

## 完整性约束

主键 :primary key

主键的值不可重复，也不可为空（NULL）

非空: not null

## 列约束

- 唯一约束  unique

  声明了唯一约束的列上不允许出现重复的值,允许插入多个NULL

- 默认值约束 default

  insert into 表名(列名) values(值) 给特定列赋值

- 检查约束check

  自定义约束

  create table stu(

  ​	score int check( score >=0 and score <100 )

  )

- 外键约束  

  外键表示了两个关系之间的联系。以另一个关系的外键作主关键字的表被称为主表，具有此外键的表被称为主表的从表

  foreign key() references  表名()

  references :取自

- 自增列 auto_increment

  自动增长,在插入编号的时候,无需手动赋值,只需插入为null就会获取当前的最大值,然后加1插入

  1.必须添加在主键

  2.允许手动赋值

## 去除重复值 distinct

select distinct 属性 from 表名

## 查询结果排序

 示例: 查询所有的部门，结果集按照部门编号升序排列

 SELECT * FROM 表名 ORDER BY 属性 ASC;

 \#ascendant

 示例: 查询所有的部门，结果集按照部门编号降序排列

 SELECT * FROM dept ORDER BY did DESC;

**默认是按照升序排列(ASC)**

## 条件查询

  示例: 查询出编号为5的员工的数据

` SELECT * FROM emp WHERE eid=5;`

练习: 查询出姓名叫king的员工的编号，姓名，工资

 `SELECT eid,ename,salary FROM emp WHERE ename=’king’;`

## 模糊条件查询

 示例: 查询出姓名中含有字母e的员工有哪些

` SELECT * FROM emp WHERE ename LIKE ‘%e%’;`

 练习: 查询姓名中以e结尾的员工有哪些

`SELECT * FROM emp WHERE ename LIKE ‘%e’;`

 练习: 查询姓名中倒数第2个字符为e的员工有哪些

 `SELECT * FROM emp WHERE ename LIKE ‘%e_’;`

## 分页查询

 查询的结果集有太多的数据，一次显示不完，可以分页显示

 需要有两个条件: 每页的数据量、当前的页码

 `SELECT * FROM 表名 LIMIT start,count;`

 **start: 开始查询的值  count: 每页的数据量  **

**start = (当前页码-1)*每页数据量**

## 集合函数

count()     数量

sum()        总和

avg()          平均

max()/min()  最大/最小

## 分组查询 group by

 练习: 分组查询出男女员工的数量，最高工资和最低工资

 SELECT sex,COUNT(eid),MAX(salary),MIN(salary) FROM emp GROUP BY sex;

## 子查询

 查询出和tom同一年出生的员工有哪些

```mysql
select * from emp 

where year(birthday)=(

select year(birthday) from emp where ename=’tom’) 

and ename!=’tom’;
```



## 多表查询

 添加查询条件，两个表之间的关联(外键和主键)

```sql
SELECT ename,dname FROM emp,dept WHERE  emp.deptId=dept.did;;
```

 (1)内连接——和之前查询结果一致

```sql
select ename,dname from emp inner join dept on deptId=did;
```

 (2)左外连接——显示左侧表中所有的记录

```sql
 SELECT ename,dname FROM emp LEFT OUTER JOIN dept ON emp.deptId=dept.did;
```

 **先写哪个表哪个表就是左侧的，OUTER关键字可以省略**

 (3)右外连接——显示右侧表中所有记录

 ```sql
SELECT ename,dname FROM emp RIGHT OUTER JOIN dept ON deptId=did;
 ```

 **后写哪个表哪个表就是右侧，OUTER关键字可以省略**

