##  换行
`br`
单标签

## 加粗
`strong`
`b`

## 倾斜
`em`
`i`

## 下划线
`ins`
`u`

## 删除线
`del`
`s`

## div span
span 小区域

## 图片 img
替换文本 alt
提示文本 title 
width 宽
height 高

### 去除图片底下的空白空隙

> 回车被解析成空格占位所以有空白空隙

img{
  vertical-align:top;
}

## 相对路径
下级路径   /
上级路径   ../

## 链接 a
target :_blank新窗口打开
        _self当前窗口打开


## 特殊符号
空格:&nbsp  全角空格可以识别
<   :&lt

\>   :&gt

## 表格 table
tr 行
th 表头(首行)
td 单元格

align - center对齐方式
border 边框
cellpadding 内容距边框的距离
cellspacing 单元格之间的距离
width 宽
height 高

rowspan 上下合并
colspan 左右合并

## 列表
<!-- 有序列表  -->

 <ol type="A">
        <li>第一步</li>
        <li>第二步</li>
        <li>第三步</li>
        <li>第四步</li>
 </ol>
<!-- 无序列表 -->

<ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
</ul>
 <!-- 定义列表 -->
<dl>
        <dt>标题</dt>
        <dd>解释</dd>
 </dl>   
<!-- 去掉列表样式 -->
<!-- list-style: none; -->



## 表单
### 表单域 from 
action 提交地址
method 提交方式
name   表单名



get 明文提交，提交的数据在地址栏显示,查询字符串传参
提交的数据有大小限制，最大2kb
跟服务器要数据的时候，使用get



post 隐式提交，请求主体传参(form data)
提交的数据没有大小限制。
给服务器传递数据时使用post



enctype=""设置表单数据的编码方式 

设置允许将什么样式数据格式提交服务器,不符合设置的格式就不能提交

* application/x-www-form-urlencodede 默认值 ,允许提交任意字符

* text/plain 允许提交普通字符（不含特殊符号= & *等）

* multipart/form-data 允许提交文件input输入框type：输入框类型



action=""  请求提交的url---->接口
             如果此处没写值，请求提交给当前页面链接\

method="请求方法"  get 默认缺省值,显式传参，参数出现在地址栏（查询字符串）
                          后台对应req.query接收
                      post 隐式传参，参数在请求主体中
                          后台对应req.body接收

type: tel 手机号
type：text  显示普通文本输入框
type：password 密码框
type：data 日期选择框
type：search 搜索框  （手机上常用）


type：button 按钮 **加value**

type: radio 单选按钮  **要有相同组名name**
type: checkbox 复选框
type: submit 提交数据到服务器
type：reset 重置按钮
type: image 图片按钮  **加src路径**
type: file 上传文件框
type: hidden 隐藏域

checked="checked" 默认选中**属性和属性值相同，属性值可省略**
maxlength    最大输入字符长度

value：输入框的值
placeholder：显示提示文本


**双标签 button**

disabled :禁用
### 下拉列表select
很少用
**select**
option

### label标签
<!-- 选中对应的元素 for域id对应 -->
<!-- 扩大点击范围 -->
<input type="radio" name="sex" id="nan">
<label for="nan">男</label> 

### 文本域textarea

### 内容分组fieldset

```html
 <form action="" method="post">
        <fieldset>
            <legend>用户基本信息</legend>
        </fieldset>

    </form>

```

![](images\内容分组.png)

## 盒模型

行盒在页面中不换行,块盒独占一行

块盒:容器元素 h1-h6  p
行盒:span a img video audio

无论是行盒还是块盒,都由下面几个部分组成,从内到外:
### 内容: content
width,height,设置的是盒子内容的宽高
内容部分是叫整个盒子的**内容盒**

### 填充(内边距): padding

padding-left  padding-right  padding-top   padding-bottom

填充区+内容区=**填充盒**

### 边框: border
边框=样式+宽度+颜色

<!-- 边框样式:border-style -->
border-style:solid  实线边框
border-style:dashed  虚线边框
border-style:dotted 点线边框

<!-- 边框宽度:border-width -->
<!-- 边框颜色:border-color -->

*合并相邻边框*
border-collapse:collapse



边框+填充区+内容区=**边框盒**

### 外边框: margin  

margin-left  margin-right margin-top  margin-bottom

*盒子居中*
1. 必须是块级元素
2. 必须有宽度
margin :0 auto

*垂直方向上的两个盒子,margin会重叠,取大值*
*水平方向上的两个盒子,margin不会重叠,margin会相加*

### margin塌陷问题

1. 给父元素加上边框
    <!-- border-top:1px solid transparent   透明 -->

2. 给父元素添加内上边距
    <!-- padding-top:1px -->
    3.父元素添加overflow
    <!-- overflow:hidden -->

  4.父元素添加table

  ```css
  div::before{
  
  content:" ";
  
  display:table;
  
  }
  ```

  

  


*CSS3盒子模型* 

<!-- box-sizing:border-box 不改变盒子大小 -->

### 清除内外边距
* {
        padding:0;
        margin:0
}
*行内元素只能设置左右内外边距,但是转换为块级元素和行内块元素,就可以设置上下内外边距*

## 常用
  <style>
        /* 元素选择器 */
        h1{
            /* 字体颜色 */
            color: blue;

            /* 背景颜色 */
            background-color: cyan;
    
             /*文字排版  */
            text-align: center;
    
            /* 字体大小 */
            font-size:small;
    
            /* 文字粗细 */
            font-weight:bold;
    
            /* 文字类型 */
            font-family: 'Courier New', Courier, monospace;
    
            /* 字体样式 */
            font-style: italic;/*倾斜   normal不倾斜比较用的多*/
    
            /* 装饰文本:文字加线 */
            text-decoration:line-through(删除线);
            text-decoration:line-underline(下划线);
            text-decoration:line-overline(上划线);
            text-decoration: none(没有)
    
            /*首行缩进*/
            text-indent:2em;
    
            /*内容居中*/
            text-align:center;
    
            /* 行高 */
            line-height: ;
    
            /* 宽度 */
            width: ;
    
            /* 高度 */  
            height: ;
            
           }
    
    </style>标准流

# 标准流

## 块元素
<!-- h    p   div    ul     ol    li -->
1. 独占一行
2. 可是设置宽度与高度
3. 宽度默认是容器的100%
4. 是一个容器和盒子,里面可以放行内或块级元素  

## 行内元素
<!-- a span strong b em i ins u del s label -->
1. 一行可以显示多个
2. 设置宽度和高度是无效的
3. 默认宽度是本身内容大小
4. 可以包含行内元素和文本
<!-- a元素里可以放块元素 -->

## 行内块
<!-- img input textarea td -->
1. 一行可以显示多个
2. 默认宽度是本身内容大小
3. 可是设置宽度与高度
4. 是一个容器和盒子,里面可以放行内或块级元素  

# 浮动
 1. 脱离标准流的控制浮动到指定位置(脱标)
 2. 浮动的盒子不在保留原来的位置
 3. 浮动的元素会一行内显示并且顶部对齐
 4. 浮动元素不会超出父元素的padding值,在父元素padding内部浮动
 5. 浮动的元素,可以直接给宽高,显示方式和行内快元素一样

 *多个块元素纵向排列用标准流,多个块元素横向排列用浮动*

**清除浮动之后,父级就会根据浮动的子盒子自动测量高度,父级有了高度,就不会引影响下面的标准流了  **

### 清除浮动

1. 额外标签法

```html

    <style>
        .fu{
            background-color: aqua;
            width: 500px;
            /* height: 500px; */ /*去掉父盒子高度,子元素浮动,复合内容盒就会为0*/
            
        }
        .fu .gilr{
            background-color: blueviolet;
            width: 200px;
            height: 200px;
            float: left;
        }
        .fu .boy{
            background-color:brown;
            width: 200px;
            height: 200px;
            float: left;
        }
        .ye{
            background-color:blue;
            width:300px;
            height: 300px;
        }
    </style>
</head>
<body>
    <div class="fu">
        <div class="gilr"></div>
        <div class="boy"></div>
        <div style=" clear:both "></div>
    </div>
    <div class="ye"></div>
</body>
</html>
```



2.父级添加overflow

```html

        .fu{
            overflow: hidden;
            border:brown 1px solid;
            width: 700px;
            /* height: 500px; */ /*去掉父盒子高度,子元素浮动,复合内容盒就会为0*/
            
        }
        .fu .gilr{
            background-color: blueviolet;
            width: 200px;
            height: 400px;
            float: left;
        }
        .fu .boy{
            background-color:brown;
            width: 200px;
            height: 200px;
            float: left;
        }
        .ye{
            background-color:blue;
            width:300px;
            height: 300px;
        }
    </style>
</head>
<body>
    <div class="fu">
        <div class="gilr"></div>
        <div class="boy"></div>
    </div>
    <div class="ye"></div>
</body>
</html>
```



3.伪元素清除浮动

```html

        *{
            padding: 0;
            margin: 0;
        }

        /*伪元素清除浮动*/
        .clearfix::after{
            content: "";
            display:block;
            height: 0;
            /*隐藏元素*/
            visibility: hidden;
            clear: both;
        }
        /*解决低版本兼容问题*/
        .clearfix{
            *zoom: 1;
        }


        .fu{
            background-color: aqua;
            width: 500px;
            /* height: 500px; */ /*去掉父盒子高度,子元素浮动,复合内容盒就会为0*/
            
        }
        .fu .gilr{
            background-color: blueviolet;
            width: 200px;
            height: 200px;
            float: left;
        }
        .fu .boy{
            background-color:brown;
            width: 200px;
            height: 300px;
            float: left;
        }
        .ye{
            background-color:blue;
            width:300px;
            height: 300px;
        }
    </style>
</head>
<body>
    <div class="fu clearfix" > 
        <div class="gilr"></div>
        <div class="boy"></div>
    </div>
    <div class="ye"></div>
</body>
</html>
```



4.双伪元素清除浮动

```html

    <style>
        * {
            padding: 0;
            margin: 0;
        }
        /*双伪元素清除浮动*/
        
        .clearfix::before,
        .clearfix::after {
            content: "";
            display: table;
        }
        
        .clearfix::after {
            clear: both;
        }
        /*解决低版本兼容问题*/
        
        .clearfix {
            *zoom: 1;
        }
        
        .fu {
            background-color: aqua;
            width: 500px;
            /* height: 500px; */
            /*去掉父盒子高度,子元素浮动,复合内容盒就会为0*/
        }
        
        .fu .gilr {
            background-color: blueviolet;
            width: 200px;
            height: 200px;
            float: left;
        }
        
        .fu .boy {
            background-color: brown;
            width: 200px;
            height: 300px;
            float: left;
        }
        
        .ye {
            background-color: blue;
            width: 300px;
            height: 300px;
        }
    </style>
</head>

<body>
    <div class="fu clearfix">
        <div class="gilr"></div>
        <div class="boy"></div>
    </div>
    <div class="ye"></div>
</body>

```




# 转换
## 转换为行内块元素
**display:inline-block;**
## 行内元素转换为块元素
**display:block**
## 块元素转换为行内元素
**display:inline**

## 让内容垂直居中
让内容的行高等于盒子的高度



## 背景
background-image: url(pic.jpeg);

*平铺*
*background-repeat: repeat;*
*不平铺*
*background-repeat: no-repeat;*
*横向平铺*
*background-repeat:repeat-x;*
*纵向平铺*
*background-repeat: repeat-y;*

 背景图方位 
background-position: bottom right ;
                   					  /* x轴 y轴 */
background-position: 100px 30px;

背景缩放

background-size:

> cover 让背景图等比缩放,填满容器,可能显示不全
>
> contain  让背景图等比缩放,容器为填满,图面显示完全

*把背景图片固定住*
background-attachment: fixed; 
*把背景图片固滚动*
background-attachment: scroll; 

*背景半透明*
background: rgba(0, 0, 0, .3);

## 继承
<!-- 百分比单位,先跟自身字体大小进行计算,在继承给子元素 -->
line-height:150%

<!-- 倍数单位,先把倍数继承给子元素,再由子元素当前大小进行计算 -->
line-height:1.5

## 优先级
继承 0000< 元素选择器 0001< 类选择器,伪类选择器,属性选择器 0010 < id选择器 0100< 行内样式style 1000< !important 

> 复合选择器会有权重叠加的问题 
> 权重会叠加但是但是不会进位 


## 阴影
盒子阴影:box-shadow  

> h-shadow  水平偏移距离
>
> v-shadow 垂直偏移距离
>
> blur 模糊
>
> spread 阴影大小
>
> inset  向内发散

文字阴影:text-shadow

# 定位
定位=定位模式+边偏移

static   静态定位
relative 相对定位
absolute 绝对定位
fuxed    固定定位


## 相对定位
1. 相对定位根据自身原来的位置进行定位
2. 没有脱离标准流,在页面中还占据位置

## 绝对定位
1. 绝对定位在没有父元素的情况下,根据浏览器可视区定位
2. 绝对定位有父元素,但父元素没有定位,那么还是根据浏览器可视区定位
3. 绝对定位有父元素,并且父元素有(非静态)定位,那么就会根据父元素来定位
*绝对定位找最近的带有定位的父级元素来定位*
*子绝父相*
4. 绝对定位,脱离标准流,在页面中不占据位置
*加了绝对定位和浮动的元素可以直接加宽高,默认宽度是内容宽度*
5. 绝对定位会压住父元素的padding

## 固定定位
1. 永远根据浏览器可视区拉定位
2. 脱离标准流,在页面中不占据位置
*加了固定定位和浮动的元素可以直接加宽高,默认宽度是内容宽度*

<!-- 层叠顺序 -->
*z-index*

**兄弟元素可用**

<!-- 注意顺序：爱恨法则  -->
<!--  被访问的链接  -->
a:link{
    color: rgb(23, 124, 131);
}
<!-- /* 未被访问的链接 */ -->
a:visited{
    color: rgb(27, 126, 77);
} 

<!-- /* 选中鼠标悬停的a元素     常用*/ -->
a:hover{
    color: red;
}
<!-- /* 鼠标点击后的元素 */ -->
a:active{
    color: #008c8c;
}


## 隐藏
display: none    常用
隐藏后不占位置

visibility:hidden
隐藏后还在距位置


## 鼠标样式
cursor: pointer 手
cursor: move 移动
cursor: text 文本
cursor: not-allowed禁止
cursor: wait 缓冲
cursor: help 帮助

##　取消轮廓线
outline:none 

## 防止文本域拖拽
resize:none

## 低\基\中\顶线对齐
vertical-align:bottom
vertical-align:baseline
vertical-align:middle
vertical-align:top

`vertical-align`是用来设置`行内元素`对齐方式的



## 溢出文字省略号显示
1. 强制一行内显示文本
white-space:nowrap
2. 超出部分隐藏
overflow:hidden
3. 文字省略号显示
text-overflow:ellipsis

## html5新增语义化标签

```html
<header>头部
    
<nav>导航
    
<article>内容
    
<section>定义文档某个区域
    
    
<aside>侧边栏
<footer>尾部
    
    
<video>
    //其他格式视频
   <source src="horse.ogg" type="audio/ogg">
   <source src="horse.mp3" type="audio/mpeg">
    
    
  controls 控制控件显示
  autoplay 自动播放
  muted 静音播放
  loop 循环播放
  poster     海报帧 (视频封面)
 <video/>
```





## 属性选择器

<!-- 选择make -->
input[class=make]
或
input[属性]
<!-- 选择以make开头的 -->
input[class^=make]
<!-- 选择以make结尾的 -->
input[class$=make]
<!-- 选择有make -->
input[class*=make]


### 结构伪类选择器

结构伪类选择器主要根据文档结构来选择器元素， 常用于根据父级选择器里面的子元素


#### E:first-child

匹配父元素的第一个子元素E

```html
 <style>
    ul li:first-child{
      background-color: red;
    }
  </style>

  <ul>
    <li>列表项一</li>
    <li>列表项二</li>
    <li>列表项三</li>
    <li>列表项四</li>
  </ul>
```

**E:last-child**  则是选择到了最后一个li标签

#### E:nth-child(n)（★★★）

匹配到父元素的第n个元素

- 匹配到父元素的第2个子元素  

  `ul li:nth-child(2){}`

- 匹配到父元素的序号为奇数的子元素

  `ul li:nth-child(odd){}`    **odd** 是关键字  奇数的意思（3个字母 ）

- 匹配到父元素的序号为偶数的子元素

  `ul li:nth-child(even){}`   **even**（4个字母 ）

- **匹配到父元素的前3个子元素**

  `ul li:nth-child(-n+3){}`    

  选择器中的  **n** 是怎么变化的呢？

  因为 n是从 0 ，1，2，3.. 一直递增

  所以 -n+3 就变成了   

  - n=0 时   -0+3=3
  - n=1时    -1+3=2
  - n=2时    -2+3=1
  - n=3时    -3+3=0 
  - ...

**常用的结构伪类选择器是：** `nth-child(n) {...}`

#### E:nth-child 与 E:nth-of-type 的区别

这里只讲明  **E:nth-child(n)**  和 **E:nth-of-type(n)**  的区别  剩下的 **E:first-of-type**     **E:last-of-type**  **E:nth-last-of-type(n)**   同理做推导即可

```html
<style>
    ul li:nth-child(2){
      /* 字体变成红色 */
        color: red;
    }

    ul li:nth-of-type(2){
      /* 背景变成绿色 */
      background-color: green;
    }
  </style>


  <ul>
    <li>列表项一</li>
    <p>乱来的p标签</p>
    <li>列表项二</li>
    <li>列表项三</li>
    <li>列表项四</li>
  </ul>
```

![]()

也就是说：

- `E:nth-child(n)`     **匹配父元素的第n个子元素E**，也就是说，nth-child 对父元素里面所有孩子排序选择（序号是固定的）  先找到第n个孩子，然后看看是否和E匹配
- `E:nth-of-type(n)` **匹配同类型中的第n个同级兄弟元素E**，也就是说，对父元素里面指定子元素进行排序选择。 先去匹配E ，然后再根据E 找第n个孩子

**小结**

- 结构伪类选择器一般用于选择父级里面的第几个孩子
- nth-child 对父元素里面所有孩子排序选择（序号是固定的）  先找到第n个孩子，然后看看是否和E匹配
- nth-of-type 对父元素里面指定子元素进行排序选择。 先去匹配E ，然后再根据E 找第n个孩子
- 关于 nth-child（n） 我们要知道 n 是从 0 开始计算的，要记住常用的公式
- 如果是无序列表，我们肯定用 nth-child 更多
- 类选择器、属性选择器、伪类选择器，权重为 10


## 模糊处理
filter：blur(5px);

## 过渡
<!-- transition:属性 花费时间 运动曲线(ease默认-先快后蛮  linear匀速) 延迟时间 -->
前面连个属性必写
transition :width 1s               单个属性
transition :width 1s ,height ,1s   多个属性
transition :all 1s                 所有属性


## 2D转换
### 移动
transform: translate(x,y)
transform: translateX(n)
transform: translateY(n)

- 定义的2D转换中的移动,沿x,y轴移动元素
- translate最大优点: 不影响其他元素的位置
- translate中的%单位是相对于自身的
- 对行内元素无效

### 旋转
transform: rotate(360deg)
- rotate里面跟度数,单位deg
- 正数正转,负数反转
- 默认旋转中心点为元素中心点

### 中心点
transform: origin:ｘｙ；
- x和y之间用空格隔开
- x\y可以用 像素 \ 方位词 \ 百分比 表示

### 缩放
transform:scale(x,y)

- x,y里面填倍数
- 默认以中心点为参考进行缩放,并且不影响别的盒子

### 连写
- transform: translate() rotate() scale()..
- 先旋转会影响坐标轴的方向
- 位移属性要放在最前面

## 动画
1. 动画的基本使用
   - 先定义动画
   - 在调用定义好的动画

2. 语法格式(定义动画)

   ```css
   @keyframes 动画名称 {
       0% {
           width: 100px;
       }
       100% {
           width: 200px
       }
   }
   ```


3.  语法格式(使用动画)

   ```
   div {
   	/* 调用动画 */
       animation-name: 动画名称;
    	/* 持续时间 */
    	animation-duration: 持续时间；
   }
   ```

  4. /* 动画名称 */
     animation-name: move;
     /* 动画花费时长 */
     animation-duration: 2s;
     /* 动画速度曲线 */
     animation-timing-function: ease-in-out;
     /* 动画等待多长时间执行 */
     animation-delay: 2s;
     /* 规定动画播放次数 infinite: 无限循环 */
     animation-iteration-count: infinite;
     /* 是否逆行播放 */
     animation-direction: alternate;
     /* 动画结束之后的状态 */
     animation-fill-mode: forwards;

  /* 规定动画是否暂停或者播放 */
     animation-play-state: paused;
     
**连写**
     **animation: 动画名称 持续时间   运动曲线         何时开始   播放次数       是否反方向   起始与结束状态**
 animation: name          10s        linear(匀速 )      2s                  5              alternate        forwards
                                steps(步长)


## 3d转换
`3D` 移动 `translate3d`
`transform: translate3d(x, y, z)`

透视 `perspective`

   - 如果想要网页产生 `3D` 效果需要透视
   - 实际上模仿人类的视觉位置，可视为安排一直眼睛去看
   - 透视也称为视距，所谓的视距就是人的眼睛到屏幕的距离
   - 距离视觉点越近的在电脑平面成像越大，越远成像越小
   - 透视的单位是像素
   - **透视需要写在被视察元素的父盒子上面**


   `translateZ` 与 `perspecitve` 的区别
   - `perspecitve` 给父级进行设置，`translateZ` 给 子元素进行设置不同的大小

   `3D` 旋转`rotateX`

### 3D 旋转指可以让元素在三维平面内沿着 x 轴、y 轴、z 轴 或者自定义轴进行旋转

   - `transform: rotateX(45deg)` -- 沿着 x 轴正方向旋转 45 度
   -  `transform: rotateY(45deg)` -- 沿着 y 轴正方向旋转 45 度
   -  `transform: rotateZ(45deg)` -- 沿着 z 轴正方向旋转 45 度
   - `transform: rotate3d(x, y, z, 45deg)` -- 沿着自定义轴旋转 45 deg 为角度

   `左手准则`

   - 左手的手拇指指向 x 轴的正方向

   - 其余手指的弯曲方向就是该元素沿着 x 轴旋转的方向


`rotate3d`
   - `transform: rotate3d(x, y, z, deg)` -- 沿着自定义轴旋转 deg 为角度
   - x, y, z 表示旋转轴的矢量，是标识你是否希望沿着该轴进行旋转，最后一个标识旋转的角度
     - `transform: rotate3d(1, 1, 0, 180deg)` -- 沿着对角线旋转 45deg
     - `transform: rotate3d(1, 0, 0, 180deg)` -- 沿着 x 轴旋转 45deg




### `3D` 呈现 `transform-style`

   1.  `transform-style`


      -  控制子元素是否开启三维立体环境
      - `transform-style: flat`  代表子元素不开启 `3D` 立体空间，默认的
      - `transform-style: preserve-3d` 子元素开启立体空间
      -  代码写给父级，但是影响的是子盒子

# 移动
## meta视口 
` <meta name="viewport" content="width=device-width, initial-scale=1.0,maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">`

- width：视口的宽度，width=device-width：宽度是设备的宽度
- initial-scale：初始化缩放，- initial-scale=1.0：不缩放
- user-scalable：是否允许用户自行缩放，取值0或1，yes或no
- minimum-scale：最小缩放
- maximum-scale：最大缩放

## 二倍图
图片放入移动端前进行缩放,在移动内会自动发大两倍(物理像素比的原因)


## 背景缩放
background-size

单位： 长度|百分比|cover|contain;

cover把背景图像扩展至足够大，以使背景图像完全覆盖背景区域。

contain把图像图像扩展至最大尺寸，以使其宽度和高度完全适应内容区域

## 4.4移动端特殊样式

/*CSS3盒子模型*/
box-sizing: border-box;
-webkit-box-sizing: border-box;
/*点击高亮我们需要清除清除  设置为transparent 完成透明*/
-webkit-tap-highlight-color: transparent;
/*在移动端浏览器默认的外观在iOS上加上这个属性才能给按钮和输入框自定义样式*/
-webkit-appearance: none;
/*禁用长按页面时的弹出菜单*/
img,a { -webkit-touch-callout: none; }

## 移动端常见布局

###　移动端单独制作

+ 流式布局（百分比布局）
+ flex 弹性布局（强烈推荐）
+ less+rem+媒体查询布局
+ 混合布局


- **流式布局：**

流式布局，就是百分比布局，也称非固定像素布局。

通过盒子的宽度设置成*百分比来根据屏幕的宽度来进行伸缩*，不受固定像素的限制，内容向两侧填充。

流式布局方式是移动web开发使用的比较常见的布局方式。



###　　响应式

+ 媒体查询
+ bootstarp


# flex布局

通过给父盒子添加flex属性,来控制子盒子的位置和排列方式


## 父项常见属性

+ flex-direction：设置主轴的方向
+ justify-content：设置主轴上的子元素排列方式
+ flex-wrap：设置子元素是否换行  
+ align-content：设置侧轴上的子元素的排列方式（多行）
+ align-items：设置侧轴上的子元素排列方式（单行）
+ flex-flow：复合属性，相当于同时设置了 flex-direction 和 flex-wrap

### flex-direction设置主轴的方向

+ 在 flex 布局中，是分为主轴和侧轴两个方向，同样的叫法有 ： 行和列、x 轴和y 轴
+ 默认主轴方向就是 x 轴方向，水平向右  *row*    (row-reverse 水平反向)
+ 默认侧轴方向就是 y 轴方向，水平向下  *column* (column-reverse 垂直反向)

+ 注意： 主轴和侧轴是会变化的，就看 flex-direction 设置谁为主轴，剩下的就是侧轴。而我们的子元素是跟着主轴来排列的

### justify-content 设置主轴上的子元素排列方式
*子元素根据主轴排列*
- *flex-start* 默认to right
- *flex-end*  尾部开始排列
- *center*    在主轴居中对齐
- *space-around* 平分剩余空间
- *space-between* 先贴两边再平分剩余空间

### flex-wrap设置是否换行

+ 默认情况下，项目都排在一条线（又称”轴线”）上。flex-wrap属性定义，flex布局中默认是不换行的。
+ nowrap 不换行
+ wrap 换行

### align-items 设置侧轴上的子元素排列方式（单行 ）
*子元素根据主轴排列*
+ 该属性是控制子项在侧轴（默认是y轴）上的排列方式  在子项为单项（单行）的时候使用

+ flex-start 从头部开始

+ flex-end 从尾部开始

+ center 居中显示

+ stretch 拉伸

+ baseline 基线对齐

  

###  align-content  设置侧轴上的子元素的排列方式（多行）

*设置子项在侧轴上的排列方式 并且只能用于子项出现 换行 的情况（多行），在单行下是没有效果的。*

- *flex-start* 默认to right
- *flex-end*  尾部开始排列
- *center*    在主轴居中对齐
- *space-around* 平分剩余空间
- *space-between* 先贴两边再平分剩余空间
- *stretch*   设置子项元素高度平分平分父元素高度

### flex-flow：复合属性(连写)
*flex-flow:column wrap;*



##  flex布局子项常见属性

+ flex子项目占的份数

  - *flex-shrink*  规定项目将相对于其他灵活的项目进行收缩的量。
  - *flex-grow*  规定项目将相对于其他灵活的项目进行扩展的量。
  - flex-basis 项目的长度。

+ align-self控制子项自己在侧轴的排列方式

+ order属性定义子项的排列顺序（前后顺序）

  


### flex属性
`*flex子项目占的份数*`
flex: <number>; /* 默认值 0 */

`flex-shrink`

* 单行使用 默认值为1

`lex-grow`

- 单行使用 默认值为0

`flex-basis`

- 所以他和width放在一起时,把width替代
- 不给图片设置



`flex-shrink` 例子:

父元素400px ; 有三个子元素，宽度分别200px。 那么加起来600px。

第三个li设置了flex-shrink属性为3，另外两个没设置，没设置默认1

```html
<ul id="flex">
    <li>a</li>
    <li>b</li>
    <li>c</li>
</ul>
```

![](images\flex.png)

a:  200-(600-400)*(1/5)=160

b:  200-(600-400)*(1/5)=160

a:  200-(600-400)*(3/5)=80



**flex-grow**  200 + (600-400)*(3/5)=80



### align-self控制子项自己在侧轴上的排列方式
align-self: flex-end


###  order 属性定义项目的排列顺序

数值越小，排列越靠前，默认为0。
order: <number>




# 移动web开发之rem布局
rem的基准是相对于html元素的字体大小。
rem的优势：父元素文字大小可能不一致， 但是整个页面只有一个html，可以很好来控制整个页面的元素大小。

## 媒体查询语法规范
`和判断语句类似`
+ 用 @media开头 注意@符号
+ mediatype   媒体类型`all所有设备 print打印设备 screen移动设备 `
+ 关键字 and  not  only
+ media feature 媒体特性必须有小括号包含

```
@media mediatype and|not|only (media feature) {
    CSS-Code;
}
```

![](images\尺寸.png)







## 语义化标签

![](images\语义化111.png)

# video

**video** : HTML5 中的新属性。

| 属性                                                         | 值       | 描述                                                         |
| :----------------------------------------------------------- | :------- | :----------------------------------------------------------- |
| [autoplay](https://www.w3school.com.cn/tags/att_video_autoplay.asp) | autoplay | 如果出现该属性，则视频在就绪后马上播放。                     |
| [controls](https://www.w3school.com.cn/tags/att_video_controls.asp) | controls | 如果出现该属性，则向用户显示控件，比如播放按钮。             |
| [height](https://www.w3school.com.cn/tags/att_video_height.asp) | *pixels* | 设置视频播放器的高度。                                       |
| [loop](https://www.w3school.com.cn/tags/att_video_loop.asp)  | loop     | 如果出现该属性，则当媒介文件完成播放后再次开始播放。         |
| [muted](https://www.w3school.com.cn/tags/att_video_muted.asp) | muted    | 规定视频的音频输出应该被静音。                               |
| [poster](https://www.w3school.com.cn/tags/att_video_poster.asp) | *URL*    | 规定视频下载时显示的图像，或者在用户点击播放按钮前显示的图像。(海报帧) |
| [preload](https://www.w3school.com.cn/tags/att_video_preload.asp) | preload  | 如果出现该属性，则视频在页面加载时进行加载，并预备播放。如果使用 "autoplay"，则忽略该属性。 |
| [src](https://www.w3school.com.cn/tags/att_video_src.asp)    | *url*    | 要播放的视频的 URL。                                         |
| `paused`                                                     | bool     | 用于获取媒体对象是否正在暂停                                 |
| `ended`                                                      | bool     | `ended`属性用于获取媒体对象是否播放完毕                      |
| volume                                                       |          | `volume`属性用于获取/设置媒体对象的音量，其取值范围为`[0.0~1.0]`， |
| `playbackRate`                                               |          | `playbackRate`属性用于获取/设置 媒体的播放速率               |
| currentTime                                                  |          | `currentTime`属性用于获取/设置当前媒体的播放时间，单位为秒   |
| `duration`                                                   |          | `duration`属性用于获取媒体对象的总时长，单位为秒             |

**auido** : HTML5 中的新属性。

| 属性                                                         | 值       | 描述                                                         |
| :----------------------------------------------------------- | :------- | :----------------------------------------------------------- |
| [autoplay](https://www.w3school.com.cn/tags/att_audio_autoplay.asp) | autoplay | 如果出现该属性，则音频在就绪后马上播放。                     |
| [controls](https://www.w3school.com.cn/tags/att_audio_controls.asp) | controls | 如果出现该属性，则向用户显示控件，比如播放按钮。             |
| [loop](https://www.w3school.com.cn/tags/att_audio_loop.asp)  | loop     | 如果出现该属性，则每当音频结束时重新开始播放。               |
| [muted](https://www.w3school.com.cn/tags/att_audio_muted.asp) | muted    | 规定视频输出应该被静音。                                     |
| [preload](https://www.w3school.com.cn/tags/att_audio_preload.asp) | preload  | 如果出现该属性，则音频在页面加载时进行加载，并预备播放。如果使用 "autoplay"，则忽略该属性。 |
| [src](https://www.w3school.com.cn/tags/att_audio_src.asp)    | *url*    | 要播放的音频的 URL。                                         |

### vidio方法

### · `play()`

`play()`方法用于实现媒体的播放，其语法结构是：

```javascript
HTMLMediaElement.play()

```

### · `pause()`

`pause()`方法用于实现媒体的暂停，其语法结构是：

```javascript
HTMLMediaElement.pause()

```

## video 事件

· `loadeddata`在第一帧加载完成后触发

```js
HTMLMeDiaElement.addEventListener('loadeddata'()=>{})
```

· `play` 视频对象播放

· `pause `视频对象暂停

## 全屏

全屏API可以控制刘浏览器的全屏模式,让任何一个HTML元素占满屏幕

**进入全屏**

HTMLELelement.requestFullscreen()

**退出全屏**

HTMLELelement.exitFullscreen()



**以下自定义播放控件代码:**

```js
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body {
            margin: 0;
            padding: 0;
        }
        
        .container {
            position: relative;
            width: 640px;
            margin: 0 auto;
            border: 1px solid #ccc;
        }
        
        .controls button {
            border: none;
            background-color: #0aa1eb;
            color: #fff;
            outline: none;
            display: inline-block;
            padding: 2px 10px;
            border-radius: 3px;
            font-size: 12px;
            font-family: 'Microsoft Yahei';
            cursor: pointer;
        }
        
        #ad {
            position: absolute;
            width: 400px;
            height: 300px;
            z-index: 666;
            left: 50%;
            top: 30px;
            margin-left: -200px;
            background-color: #f00;
        }
        
        #progress-outer {
            position: relative;
            width: 640px;
            height: 5px;
            background: #ccc;
        }
        
        #progress-inner {
            position: absolute;
            left: 0;
            top: 0;
            height: 5px;
            background-color: #0aa1eb;
            width: 0;
        }
        
        .mask {
            position: absolute;
            left: 0;
            top: 0;
            width: 640px;
            height: 360px;
            z-index: 555;
        }
    </style>
</head>

<body>
    <div class="container">
        <div id="ad"><img src="./video-resource/resource/ad/0D0100005E0DB3591241923143384738.jpg" alt=""></div>
        <!-- 遮罩层挡住video避免用户触发浏览器自带的播放控件 -->
        <div class="mask"></div>
        <video src="./video-resource/resource/video/video.mp4" id="video" width="640" height="360"></video>
        <div id="progress-outer">
            <div id="progress-inner"></div>
        </div>
        <div class="controls">
            <span id="currentTime">00:00</span>/<span id="duration"></span>
            <button onclick="playOrPause()">播放/暂停</button>
            <button onclick="incVolume()">增大音量</button>
            <button onclick="decVolume()">减小音量</button>
            <button onclick="changePlaybackRate('0.5')">0.5倍速</button>
            <button onclick="changePlaybackRate('1.0')">1.0倍速</button>
            <button onclick="changePlaybackRate('1.5')">1.5倍速</button>
            <button onclick="changePlaybackRate('2.0')">2.0倍速</button>
            <button onclick="enterFullscreen()">进入</button>
            <button onclick="exitFullscreen()">退出</button>
        </div>
    </div>
    <script>
        let array = [
            //图片数组
    '0D0100005E0DB3591241923143384738.jpg',
            '0D0100005E2EF493395059357930375A.jpg',
            '0D0100005E4DDCB31126293290574D55.jpg',
            '0D0100005E40CB833950593579383235.jpg',
            '0D0100005E254C951831383513533435.jpg',
            '0D0100005E4149B13950593579363944.jpg',
            '0D0100005E42288F9115223570333345.jpg',
            '0D0100005E588109395059360246315A.jpg'
        ];

        let videoEle = document.getElementById('video');

        //在媒体对象播放时，隐藏广告位
        videoEle.addEventListener('play', () => {
            document.getElementById('ad').style.display = 'none';
        });

        //在媒体对象暂停时，显示广告位
        videoEle.addEventListener('pause', () => {
            document.getElementById('ad').style.display = 'block';
            let filename = array[Math.floor(Math.random() * array.length)];
            document.getElementById('ad').getElementsByTagName('img')[0].src = './video-resource/resource/ad/' + filename;
        });

        // 进入全屏
        function enterFullscreen() {
            //获取播放器容器对象
            let divEle = document.querySelector('.container');
            //播放器容器对象进入全屏
            divEle.requestFullscreen();
        }
        //退出全屏
        function exitFullscreen() {
            document.exitFullscreen();
        }


        //loadeddata事件在第一帧加载完成后触发,既然第一帧已经加载完成
        //那么一定意味着视频的宽度、高度及总时长等相关的头数据也已经加载完成
        //所以可以在loadeddata事件内获取总时长等相关信息
        videoEle.addEventListener('loadeddata', () => {
            //获取媒体当前播放时间
            let currentTime = videoEle.currentTime;
            document.getElementById('currentTime').innerText = currentTime;
            //获取媒体的总时长
            let duration = parseInt(videoEle.duration);
            document.getElementById('duration').innerText = duration;
        });

        //实时获取媒体的当前播放时间
        //timeupdate事件在当前播放时间更新时被触发，也就意味着只要这个事件触发了
        //当前时间肯定发生了变化，所以需要在该事件内获取现在的播放时间以显示在页面中
        videoEle.addEventListener('timeupdate', () => {
            let currentTime = parseInt(videoEle.currentTime);
            let duration = parseInt(videoEle.duration);
            document.getElementById('currentTime').innerText = currentTime;
            document.getElementById('progress-inner').style.width = 640 * currentTime / duration + 'px';
        });

        /**
         * 改变播放速率
         */
        function changePlaybackRate(value) {
            value = parseFloat(value);
            let videoEle = document.getElementById('video');
            videoEle.playbackRate = value;
        }
        /**
         * 增大音量
         */
        function incVolume() {
            let videoEle = document.getElementById('video');
            //假设原来的音量是0.5 , 0.5+0.1 ==> 0.6,现在的音量就应该是0.6
            //假设原来的音量是0.6 , 0.6+0.1 ==> 0.7,现在的音量就应该是0.7
            //假设原来的音量是0.7 , 0.7+0.1 ==> 0.8,现在的音量就应该是0.8
            //假设原来的音量是0.8 , 0.8+0.1 ==> 0.9,现在的音量就应该是0.9
            //假设原来的音量是0.9 , 0.9+0.1 ==> 1.0,现在的音量就应该是1.0
            //假设原来的音量是1.0 , 1.0+0.1 ==> 1.1,现在的音量就应该是1.0
            videoEle.volume = Math.min(1, videoEle.volume + 0.1);
            console.log(videoEle.volume);
        }

        /**
         * 减小音量
         */
        function decVolume() {
            let videoEle = document.getElementById('video');
            videoEle.volume = Math.max(0, videoEle.volume - 0.1);
            console.log(videoEle.volume);
        }

        /**
         * 实现媒体的播放/暂停    
         */
        function playOrPause() {
            //获取视频对象 -- HTMLVideoElement
            let videoEle = document.getElementById('video');
            //无论正常的暂停还是播放完毕造成的暂停，
            if (videoEle.paused || videoEle.ended) {
                // 视频对象播放
                videoEle.play();
            } else {
                // 视频对象暂停
                videoEle.pause();
            }
        }
    </script>
</body>

</html>
```





# `Canvas`

##  什么是`canvas?`

`canvas`是可以使用`JavaScript`来绘制图形的`HTML`元素 ,其语法结构是：

``` html
<canvas width="宽度" height="高度">
</canvas>

```

> `canvas`默认的尺寸为 `300X150`

##  `canvas`的应用场景

· 数据可视化工具，如百度的`ECharts`

· 游戏画面

```js
       let canvasEle = document.getElementById('canvas');
        
        //获取HTMLCanvasElement的上下文类型
        let ctx = canvasEle.getContext("2d");
```





**要在绘制图像前更改属性**

设置描边色`ctx.strokeStyle = "yellow"`

描边矩形:`ctx.strokeRect(x, y, w, h)`

设置填充色:`ctx.fillStyle = 'red';`

填充矩形:`ctx.fillRect(100, 200, 100, 100)`

###  `font`属性

`font`属性用于获取/设置文本样式，其语法结构是：

```javascript
CanvasRenderingContext2D.font = "字号 字体"

```

> `font`属性的使用参照`CSS`样式的`font`属性
>
> ```javascript
> ctx.font = '20px Microsoft Yahei';
> 
> //加粗
> ctx.font = 'bold 20px Microsoft Yahei';
> //倾斜
> ctx.font = 'italic 20px Microsoft Yahei';
> //加粗和倾斜
> ctx.font = 'italic bold  20px Microsoft Yahei';
> 
> ```

###  `textAlign`属性

`textAlign`属性用于获取/设置文本水平对齐方式，其语法结构是：

```js
CanvasRenderingContext2D.textAlign = string(left|center|right)
```

## · 路径

路径是将事先预设定的坐标点顺序连接起来所形成的图形。

路径绘制的基本步骤：

A、通过`beginPath()`方法开始一条新的路径

B、通过`moveTo()`方法来定义路径的起点

C、开始绘制各种路径，如通过`lineTo()`方法来绘制线段，`arc()`方法来绘制圆弧等

D、调用`stroke()`或`fill()`方法来进行描边或填充操作

### `beginPath()` 方法

`beginPath()`方法用于开始一条新的路径，其语法结构是：

```javascript
CanvasRenderingContext2D.beginPath()

```

###  `moveTo()`方法

`moveTo()`方法用于将路径的起点移动到指定位置，其语法结构是：

```javascript
CanvasRenderingContext2D.moveTo(X轴坐标,Y轴坐标)

```

###  `lineTo()`方法

`lineTo()`方法用于通过直线连接路径的终点（并不会真正的进行绘制），其语法结构是：

```javascript
CanvasRenderingContext2D.lineTo(X轴坐标,Y轴坐标)

```

### `stroke()`方法

`stroke()`方法用于根据当前的描边样式进行绘制当前的路径，其语法结构是：

```javascript
CanvasRenderingContext2D.stroke()

```

### `fill()`方法

`fill()`方法用于根据当前的填充样式进行绘制当前的路径，其语法结构是：

```javascript
CanvasRenderingContext2D.fill()

```

```js
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .canvas {
            display: block;
            margin: 0 auto;
            border: 1px solid #333;
        }
    </style>
</head>

<body>
    <canvas class="canvas"></canvas>
    <script>
        let dataset = [{
            label: '服装鞋帽',
            value: 220
        }, {
            label: '家居家具',
            value: 310
        }, {
            label: '家用电器',
            value: 182
        }, {
            label: '音像制品',
            value: 198
        }];
        let canvasEle = document.querySelector('.canvas');
        canvasEle.width = 600;
        canvasEle.height = 480;
        let ctx = canvasEle.getContext('2d');
        ctx.beginPath();
        ctx.moveTo(50, 50);
        ctx.lineTo(50, canvasEle.height - 50)
        ctx.lineTo(canvasEle.width - 50, canvasEle.height - 50)
        ctx.stroke();

        //标识柱形图的宽度
        let width = 50;
        let distance = Math.ceil((canvasEle.width - 100 - dataset.length * width) / (dataset.length + 1));
        for (let n = 0; n < dataset.length; n++) {
            let x = (n + 1) * distance + n * width + 50;
            let y = canvasEle.height - dataset[n].value - 50;
            ctx.fillStyle = n % 2 ? '#c23531' : '#2f4554';
            ctx.fillRect(x, y, width, dataset[n].value);
            //设置文本颜色
            ctx.fillStyle = '#000';
            //设置文本字体样式
            ctx.font = '14px Microsoft Yahei';
            //设置文本的水平对齐方式
            ctx.textAlign = 'center';
            //绘制文本
            ctx.fillText(dataset[n].value, x + Math.ceil(width / 2), y - 10);
            //绘制标签文本
            ctx.fillText(dataset[n].label, x + Math.ceil(width / 2), canvasEle.height - 30);
        }
    </script>
</body>

</html>
```

![](images\柱形图.png)

### `clearRect()`方法

`clearRect()`方法用于擦除画布指定区域的像素点，其语法结构是：

```javascript
CanvasRenderingContext2D.clearRect(起点X轴,起点Y轴,宽度,高度)

```

通过`window.setInterval()`或`window.setTimeout()`方法实现的动画效果会存在丢帧/卡顿现象，因为是显示器的刷新频率可能与实现的动果效果的时间不能进行整除操作。

> 假设当前显示器的刷新为`60Hz`,代表每秒钟显示器要刷新`60`次，也就代表刷新的时间间隔为`16ms`，另外假设`setInterval()`设置的动画时间为`100ms`执行一次
>
> 也就是在动画执行第一次的时候，但显示器没有刷新，用户所以看不到效果,只有当下一次显示器刷新时才可以看到效果。 所以用户看到的效果比真实发生的效果要晚一些，就称其为丢帧/卡顿现象。

### `requestAnimationFrame()`

`requestAnimationFrame()`方法用于让浏览器执行定时循环的操作，它与显示器的刷新频率保持一致，所以不再会出现丢帧/卡顿现象。除此之外，如果使用`requestAnimationFrame()`所实现的动画效果不处理当前标签的话，其动画效果将自动停止，以节省`CPU`的资源，其语法结构是：

```javascript
window.requestAnimationFrame(回调函数)

```

> 回调函数是指可以完成动画帧绘制功能的函数名称
>
> `requestAnimationFrame()`的优点：
>
> A.因为它充分利用了显示器的刷新频率，所以不会出现丢帧/卡顿的现象
>
> B.`requestAnimationFrame()`实现的动果效果如果不处于当标签页的话，会自动停止，以节省`CPU`的资源
>
> `window.RequestAnimationFrame()`能取代`setInterval()`或`setTimeout()`吗?
>
> 不能，原因是因为`requestAnimationFrame()` 不能设置动画执行的时间间隔，而`setInterval()`或`setTimeout()`是可以的，针对像倒计时效果只能通过`setInterval()`或`setTimeout()`来实现。

### `cancelAnimationFrame()`

`cancelAnimationFrame()`方法用于取消之前用`requestAnimationFrame()`方法生成的的`id`，其语法结构是：

```javascript
window.clearAnimationFrame(timeId)

```



# 1.`WebSocket`

## 1.1 什么是`Websocket?socket.io?`

`Websocket`是一种网络通信协议，其最大的特点在于：客户端可以向服务器端发送消息，服务端也可以主动向客户端推送消息，是真正的双向、平等对话。

`websocket`用于实现实时双向通信，如在线聊天室。

`websocket`协议产生于`2008`年，`2011`年成为国际标准。

`Socket.io`是一个为浏览器和服务器之间提供实时、双向通讯的软件库，其封装了`websocket`协议，抹平了一些技术细节及平台的兼容性。

`Socket.io`包括：

- `Node.js`服务器

- 浏览器的`JavaScript`客户端

  > 客户端下载地址：https://cdnjs.com/libraries/socket.io

## 1.2 `Websocket`的优点

A.传输的数据格式非常轻量，高效

B.没有同源限制，可以与任何服务器进行通信

C.协议标识符为`ws`，如果为加密的话，则为`wss`

## 1.3 安装`socket.io`

### · 服务器

```javascript
npm install --save socket.io

```

创建服务器

```javascript
//创建HTTP
let app = require('http').createServer();
//HTTP将作为参数注入到socket.io(依赖注入)
let server = require('socket.io')(app);
//监听端口号
server.listen(3000)

```

### · 客户端

直接在网页中通过`<script>`标签引入`socket.io`客户端的`JavaScript`库文件即可，如：

```html
<script src="scripts/socket.io.js"></script>

```

> 当在浏览器中引入`socket.io` 的`JavaScript`库后，会自动暴露名称为`io`的函数。

## 1.4 客户端`API`

### ·`emit()`

`emit()`方法用于向服务器广播事件（其实就是向服务器提交信息），其语法结构是：

```javascript
客户端对象.emit("事件名称"[,数据])

```

> 事件名称是用户根据需要自定义的字符串名称（与`JS`中的事件没有任何关系）
>
> 数据是指需要提交到服务器中的数据，可以为任意数据类型

### · `on()`方法

`on()`方法用于监听客户端的事件，并且执行相关的回调函数，其语法结构是：

```javascript
客户端.on("事件名称",回调函数)

```

## 1.5 服务器端`API`

### · `on()`方法

`on()`方法用于监听客户端的事件，并且执行相关的回调函数，其语法结构是：

```javascript
服务器端.on("事件名称",回调函数)

```

### ·`emit()`

`emit()`方法用于向客户端广播事件（其实就是向客户端推送信息），其语法结构是：

```javascript
服务器端对象.emit("事件名称"[,数据])

```

