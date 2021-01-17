## Angular

### 脚手架的安装

同vue, 官方提供了脚手架, 可以快速生成项目包, 进行开发!

要求:

* node的版本必须 `>=10.9`, 推荐使用最新版本

  下载地址: http://nodejs.cn/download/

  ```
  node -v
  ```

* 检查 npm 的中国镜像

  > npm默认从国外源下载数据, 非常慢.  
  >
  > taobao 每隔几秒就从国外服务器下载所有内容到国内的服务器,  这个国内服务器就是中国镜像

  ```
  # 有 taobao 字样的结果 是正确的
  npm config get registry
  
  # 切换为中国镜像
  npm config set registry https://registry.npm.taobao.org
  ```

* 安装 angular 的脚手架

  > 带-g: 就是全局安装命令.  -g是 global 全局

  ```
  npm i -g @angular/cli
  ```

* 查看已安装的脚手架版本

  ```
  ng v
  ```

* 常见报错: `已经安装过, 再次安装会因为电脑权限问题, 拒绝覆盖`

  > 报错关键词: File Exists
  >
  > 解决办法: 手动到 npm 目录下, 删除已安装的 ng 相关的程序即可!


### 生成项目包

因为网络问题, 时间可能会比较久.   生成不成功, 使用`其他人生成`的包也可以!

> 生成命令: ng new 包名
>
> 注意: cmd在哪个目录下打开, 就会生成在此目录下
>
> 问题: 过程中的所有询问都 `回车` 确认即可!

例如: `ng new ngpro`



### 启动命令

在 `项目包根目录` 下方执行: 

```
ng s -o
```

## 项目的启动

启动命令:

```
原始版:  启动之后需要手动到浏览器输入:  localhost:4200 打开网站
ng serve

简化: 
ng s

自动化: 自动在默认浏览器打开网站
ng s -o

-o: 是 --open 的缩写
```

> 
>

## 项目的启动流程

当在浏览器中输入 http://localhost:4200/ 发生了什么?

* `localhost`: 域名.  计算器在网络中的名称.  此处相当于 `我`   代表当前计算机
* `4200`: 端口号. 计算机中的程序的唯一名称.  此处4200 就是 angular服务器的名称.
* `localhost:4200` : 访问当前计算机上 唯一标识是4200的的程序
* angular服务器的处理
  * 类似于公司: 有一个岗位--前台. 负责接待来访人员
  * angular服务器的前台: 是 index.html 文件
* index.html 中有一个标签: `<app-root></app-root>`

  * 这个标签就是 自定义组件
* webpack工具: 自动打包工具

* angular默认集成此工具, 会自动打包 `main.ts` 文件到 `index.html` 中

* main.ts 中加载了 `app/app.module.ts`

* app.module.ts: 是全局配置文件

* 根组件: app.module.ts




## 组件结构

angular组件由三个文件组成:

* html
* css
* ts: 主文件, 负责合并 html 和 css

```typescript
// 东哥: 长脑子... JS逻辑部分
/**
 * TS语言: 推荐 面向对象开发方式. 所以会有大量的 类 class
 * 
 * 关于主体问题:
 * 原生开发中: 主体是 html.  在 html 中引入 JS 和 CSS
 * angular中: 主体 ts.  在 ts 文件中引入 html 和 css
 */
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  // 引入html
  templateUrl: './app.component.html',
  // 引入css: 可以多个css
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ngpro';
}

```

## 组件的制作与使用

## 快捷命令

> 自动化命令: 
>
> ng generate component 组件名
>
> * generate 生成
> * component 组件
>
> 简化:
>
> ng g c 组件名

例如: 生成myc03组件:  `ng g c myc03`



## 变量的绑定

> 在vue中: 使用 {{ }} 把 JS 的变量 绑定到 html 中
>
> {{}} 还可以进行很多 JS 的代码操作

angular中没有差异!

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-myc03',
  templateUrl: './myc03.component.html',
  styleUrls: ['./myc03.component.css'],
})
export class Myc03Component implements OnInit {
  // 面向对象中属性的写法:  属性名 = 值;
  name = 'dongdong';
  age = 33;
  married = true;

  names = ['东东', '亮亮', '然然'];

  boss = { name: '文华', age: 40 };

  constructor() {}

  ngOnInit(): void {}
}

/**
 * ts文件 就相当于是 vue 的 script 范围, 用来书写 JS 代码
 */

// 关注 面向对象 和 对象 在写法上的不同
let obj = {
  name: '东东',
  age: 33,
};

class Demo {
  name = '东东';
  age = 33;
}

```

```html
<p>myc03 works!</p>

<!-- 属性的绑定 -->
<ul>
  <li>{{ name }}</li>
  <li>{{ age }}</li>
  <li>{{ married }}</li>
  <li>{{ names }}</li>
  <li>{{ boss }}</li>
  <!-- 数组下标取值 -->
  <li>{{ names[0] }}</li>
  <!-- 对象 属性取值 -->
  <li>{{ boss.name }}</li>
</ul>

<!-- 数学运算符 -->
<ul>
  <li>{{ 3 + 6 }}</li>
  <li>{{ 3 - 6 }}</li>
  <li>{{ 3 * 6 }}</li>
  <li>{{ 3 / 6 }}</li>
  <li>{{ 3 % 6 }}</li>
</ul>

<!-- 比较运算符 -->
<ul>
  <li>{{ age > 20 }}</li>
  <li>{{ age >= 20 }}</li>
  <li>{{ age < 20 }}</li>
  <li>{{ age <= 20 }}</li>
  <li>{{ age == 20 }}</li>
  <li>{{ age != 20 }}</li>
</ul>

<!-- 逻辑运算符 -->
<!-- 
  逻辑或 ||  或者 松散   有真则真 全假为假
  逻辑与 &&  并且 严格   全真则真 有假为假
  逻辑非  !  不是    非真为假 非假为真
 -->
<ul>
  <li>{{ true || false }}</li>
  <li>{{ false || false }}</li>
  <li>{{ true && true }}</li>
  <li>{{ true && false }}</li>
  <li>{{ !true }}</li>
  <li>{{ !false }}</li>
</ul>

<!-- 三目运算符: 条件 ? 真值 : 假值 -->
<ul>
  <li>{{ married ? "已婚" : "未婚" }}</li>
</ul>

<!-- 对象方法使用 -->
<ul>
  <li>{{ name.toUpperCase() }}</li>
</ul>

```

## 指令

### 属性的绑定

> 在 vue 中, 对应 v-bind,  简写:
>
> :src="路径"

生成组件: `ng g c myc04`

```vue
<p>myc04 works!</p>

<!-- 
  在 vue 中:
  :src="imgUrl"
 -->
<!-- 
  在 ng 中: 
  [src]=""
 -->
<img [src]="imgUrl" alt="" />

<!-- 另一种写法 -->
<img src="{{ imgUrl }}" alt="" />

```

### 事件的绑定

> 在 vue 中: 
>
> @事件名="方法名"  或 v-on:事件名="方法名"
>
> 例如: @click=""

生成组件: `ng g c myc05`

```vue
<p>myc05 works!</p>

<!-- 事件 -->

<!-- 在 vue 中: @事件名="方法名" -->
<!-- 在 ng 中: (事件名)="方法名" -->

<button (click)="show()">点我</button>

<!-- 
  与 vue 对比的小差异:
  在 vue 中, 方法如果没有参数, 可以省略()
  但 在ng 中, 不允许省略()
 -->

```

### 双向数据绑定

> 在 vue 中使用  `v-model` 

生成组件: `ng g c myc06`

#### 注册Forms模块

```vue
<p>myc06 works!</p>

<!-- 双向数据绑定 -->

<!-- 在 vue 中, 使用 v-model -->
<!--
  在 ng 中, 快捷提示 ng-model
  实际写法: [(ngModel)]
 -->
<!-- 实时监听输入框的变化, 事件 ngModelChange -->
<input type="text" [(ngModel)]="word" (ngModelChange)="_doChange()" />
<p>{{ word }}</p>
<!-- 
  注意!!!
  angular默认不加载 Form 模块, 不支持双向数据绑定
  必须手动到 app.module.ts 中手动加载模块, 并重启

 imports: [
    FormsModule
  ],

 -->

<!-- 
  双向数据绑定:
  方向1: 数据 绑定到 UI
  方向2: UI变化时, 会同步更新到数据 -- Form表单
 -->

```

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-myc06',
  templateUrl: './myc06.component.html',
  styleUrls: ['./myc06.component.css'],
})
export class Myc06Component implements OnInit {
  constructor() {}

  word = '123546';

  _doChange() {
    console.log(this.word);
  }

  ngOnInit(): void {}
}

```



### html展示

> 在 vue 中:  v-html

生成组件: `ng g c myc07`

```vue
<p>myc07 works!</p>

<!-- 
  在 vue 中:  v-html="data"
 -->

<!-- {{}} 相当于 v-text 原生的 innerText -->
<p>{{ data }}</p>

<!-- 在 ng 中: [innerHtml]="" -->
<p [innerHTML]="data"></p>

```

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-myc07',
  templateUrl: './myc07.component.html',
  styleUrls: ['./myc07.component.css'],
})
export class Myc07Component implements OnInit {
  data = '<h1>Hello World!</h1>';

  constructor() {}

  ngOnInit(): void {}
}

```

### 样式

> 在 vue 中:
>
> * :style="{样式名: 值...}"
> * :class="{样式类: true/false}"   根据true/false 来决定是否生效

新建组件: `ng g c myc08`

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-myc08',
  templateUrl: './myc08.component.html',
  styleUrls: ['./myc08.component.css'],
})
export class Myc08Component implements OnInit {
  // 变量: 运行期间可以变化的量
  size = 17;

  color = 'black';

  constructor() {}

  ngOnInit(): void {}
}

```



```vue
<p>myc08 works!</p>

<!-- 静态样式: 运行期间不会变化 -->
<p style="font-size: 20px; color: green">Hello World!</p>

<!-- 动态样式: 运行期间可以变化 -->
<!-- 快捷: ng-style -->
<!-- 对象类型 {属性名:值}  属性名的命名规范: 只允许 数字 字母 _ 
font-size: 不能做属性名, 因为 - 是非法字符. 
解决方案: fontSize 或 'font-size'
-->
<button (click)="size = size + 1">变大</button>
<br />
<button (click)="color = 'green'">绿green</button>
<button (click)="color = 'red'">红red</button>
<button (click)="color = 'blue'">蓝blue</button>
<p [ngStyle]="{ fontSize: size + 'px', color: color }">Hello World!</p>
<!-- 
  vue中相同:
  (click)="js代码"
  本质就是点击后 执行 "" 里的代码
 -->

<hr />

<!-- 动态的 class -->
<!-- 快捷 ng-class -->
<span
  class="btn"
  (click)="size = size + 1"
  [ngClass]="{ success: size >= 20 && size < 30, danger: size >= 30 }"
  >{{ size }}</span
>

```



### 条件渲染

> 在 vue 中,  `v-if`

创建组件: `ng g c myc01`

```vue
<p>myc01 works!</p>

<div>
  <button (click)="married = true">结婚</button>
  <button (click)="married = false">单身</button>
</div>
<!-- 利用 if 判断, 根据条件显示不同的UI -->
<!-- 在 vue 中  v-if -->
<!-- 在 ng 中: *ngIf -->
<p *ngIf="married">已婚</p>
<p *ngIf="!married">未婚</p>

<!-- 
  在 vue 中, 有 v-if 和 v-else
  在 ng 中, 也有 if 和 else,  不过因为格式较为麻烦, 通常不用
 -->
<!-- ng-if-else -->
<ng-container *ngIf="married; else abc">
  <p>已婚</p>
</ng-container>
<!-- 语法糖写法: #xxx  类似于 id="xxx";  用于声明唯一标识 -->
<ng-template #abc>
  <p>未婚</p>
</ng-template>

```

### 列表渲染

> 在 vue 中: v-for="(item, index) in items"  :key="index"

组件: `ng g c myc02`

```html
<p>myc02 works!</p>

<!-- 
  vue中:
  <li v-for="(item,index) in items" :key="index">
  
  v-for="item in items"
 -->

<ul>
  <!-- ng-for -->
  <!-- angular中不需要 key -->
  <li *ngFor="let item of names">
    <span>{{ item }}</span>
  </li>
</ul>

<ul>
  <!-- ng-for-index -->
  <li *ngFor="let item of names; let i = index">
    <span>{{ i }}. </span>
    <span>{{ item }}</span>
  </li>
</ul>

<table border="1">
  <tr>
    <td>序号</td>
    <td>姓名</td>
    <td>年龄</td>
    <td>手机号</td>
  </tr>
  <tr *ngFor="let item of emps; let i = index">
    <td>{{ i + 1 }}</td>
    <td>{{ item.name }}</td>
    <td>{{ item.age }}</td>
    <td>{{ item.phone }}</td>
  </tr>
</table>

<!-- 
  vue 循环, 支持遍历数字
  v-for="item in 4"    则 item 的值是 1 2 3 4
 -->
<ul>
  <!-- angular不支持数字的循环遍历, 只支持 数组 -->
  <li *ngFor="let item of range(4)">{{ item }}</li>
</ul>

```



```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-myc02',
  templateUrl: './myc02.component.html',
  styleUrls: ['./myc02.component.css'],
})
export class Myc02Component implements OnInit {
  names = ['html5', 'axios', 'ajax', 'jsonp', 'cors', 'proxy'];

  emps = [
    { name: '东东', age: 33, phone: '13877889988' },
    { name: '然然', age: 34, phone: '13877779988' },
    { name: '亮亮', age: 29, phone: '13877239988' },
    { name: '小新', age: 28, phone: '13877549988' },
  ];

  // 自制方法: 4 -> [1,2,3,4]
  range(num) {
    let arr = [];

    for (let i = 1; i <= num; i++) {
      arr.push(i);
    }

    return arr;
  }

  constructor() {}

  ngOnInit(): void {}
}

```

## 管道 pipe

> 在 vue 中,  称为 过滤器  filter
>
> 用法: {{ 值 | 过滤器 }}

创建组件: `ng g c myc03`

### 官方提供的管道

```vue
<p>myc03 works!</p>

<!-- 
  与 vue 不同:  vue 必须自定义过滤器之后 才能使用.

  angular 官方贴心的 提供了一些 常用的管道, 可以直接使用
  当然 也可以像 vue 一样自定义
 -->
<ul>
  <li>全大写: {{ "nice to meet you" | uppercase }}</li>
  <li>全小写: {{ "HELLO WORLD!" | lowercase }}</li>
  <li>首字母大写: {{ "nice to meet you" | titlecase }}</li>
  <li></li>
  <li>百分数: {{ 0.55555 | percent }}</li>
  <!-- {{ 值 | percent: 'n.m' }}  最少n位整数, 不足补0.  小数m位,不足补0 -->
  <li>百分数: {{ 0.55555 | percent: "2.2" }}</li>
  <li>百分数: {{ 0.055 | percent: "2.2" }}</li>
  <li></li>
  <li>钱: {{ 123456.789 | currency }}</li>
  <li>钱: {{ 123456.789 | currency: "¥" }}</li>
  <li></li>
  <!-- 时间戳的转换: 当前时间距离 1970.1.1 的秒数 -->
  <!-- 此处要求单位: 毫秒  1秒 = 1000毫秒 -->
  <li>日期: {{ 1609126768000 | date }}</li>
  <!-- 
    year   年   y
    month  月   M
    day    日   d
    hour   小时 h12 H24
    minute 分钟 m
    second 秒   s
   -->
  <!-- mm: 保证两位, 不足补0 -->
  <li>日期: {{ 160912625000 | date: "yyyy-MM-dd HH:mm:ss" }}</li>
  <li>日期: {{ 160912625000 | date: "y-M-d H:m:s" }}</li>
</ul>

```

### 自定义管道

生成组件: `ng g c my04`

管道生成命令:

```
ng generate pipe 管道名

简写: ng g p 管道名
```

![](E:\笔记.md\images\angurla\QQ截图20201228204722.png)

```html
<p>myc04 works!</p>

<!-- 自定义管道 -->

<!-- 练习: 性别 在服务器存储的值 往往是数字: 0女 1男 2未知 ...代号 -->

<!-- 生成管道的命令: ng generate pipe 管道名   例如: ng g p gender -->

<!-- 生成管道后, 必须重启服务器才生效 -->
<ul>
  <!-- 显示 女 -->
  <li>{{ 0 | gender }}</li>
  <!-- 显示 男  -->
  <li>{{ 1 | gender }}</li>
  <!-- 显示 保密 -->
  <li>{{ 2 | gender }}</li>
</ul>

<!-- 练习: pf  求平方 -->
<ul>
  <li>{{ 3 | pf }} 9</li>
  <li>{{ 9 | pf }} 81</li>
</ul>

<!-- 带参数的写法 -->
<ul>
  <li>{{ 2 | pow: 10 }} 2^10=1024</li>
  <li>{{ 5 | pow: 4 }} 5^4 = 5xx</li>
</ul>

```

````js
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gender',
})
export class GenderPipe implements PipeTransform {
  transform(value: number) {
 
     if (value == 0) return '女';
     if (value == 1) return '男';
     if (value == 2) return '保密'
  }
}


````

```js
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pf',
})
export class PfPipe implements PipeTransform {
  transform(value: number) {
    return value * value;
  }
}

```

```js
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pow',
})
export class PowPipe implements PipeTransform {
  // {{ 2 | pow: 10}}
  transform(value: number, exp: number) {
    // **: 次幂运算符  2**10  就是 2的10次方
    return value ** exp;
  }
}

```



## TS的静态类型分析

```typescript
// 语言排行榜 TIOBE 中, 除了JS 都有 静态类型分析功能;
function show(abc: string) {
  // vscode: 读代码时  就知道 变量abc 是个 string 类型
  return abc.toUpperCase();
}

show(123);//编译器报错预警  只能是字符串

/**
 * 静态类型分析功能:  就是对程序员友好的特性
 * 1. 变量使用有提示
 * 2. 预警: 代码不用运行 也能预判错误
 *
 * 有了这两个特征: 有效降低 bug 的出现
 */

```



## 自定义指令

> 在 vue 中: directive

生成组件: `ng g c myc05`

> 指令的生成命令:
>
> ng generate directive 指令名
>
> 简化: ng g d 指令名

```html
<p>myc05 works!</p>

<!-- 
  两个特殊
  {{ 值 | 管道}}  管道主要修改 双标签的值

  <tag 指令 />   指令主要修改 标签的DOM属性
 -->
<ul>
  <li>亮亮</li>
  <!-- app-hide: 自定义指令, 用于操作 style.display 属性, 影响元素 -->
  <!-- 生成指令的命令行: ng generate directive 指令名, 简写 ng g d 指令名 -->

  <!-- 重启服务 -->

  <!-- 例如:  ng g d hide-->
  <li>然然</li>
  <li appHide>东东</li>
</ul>

```



```typescript
import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHide]',
})
export class HideDirective {
  // 指令初始化时, 参数固定为 所在的 元素
  // 构造函数: 对象初始化时触发;
  constructor(e: ElementRef) {
    console.log(e);

    e.nativeElement.style.display = 'none';
  }
}

```

## 生命周期

生命周期: 组件拟人化.  从出生 到 死亡 的过程中的 重要节点

> vue的生命周期: 
>
> 准备创建 => 创建出来 => 准备挂载 => 挂载完毕 => 准备更新 => 更新完 => 准备销毁 =>销毁



创建组件: `ng g c myc06`

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-myc06',
  templateUrl: './myc06.component.html',
  styleUrls: ['./myc06.component.css'],
})
export class Myc06Component implements OnInit {
  count = 1;

  constructor() {
    // 构造方法: 严格说不算生命周期.
    // 面向对象中, 对象实例化时 触发
    console.log('constructor: 构造方法');
  }

  ngOnInit(): void {
    // 相当于 vue 的 created
    console.log('ngOnInit: 开始创建');
  }

  // 更新 分为: UI的更新 和 数据的更新
  ngAfterContentInit(): void {
    // 相当于 mounted 挂载
    console.log('ngAfterContentInit: 数据初始化完毕后');
  }

  ngAfterViewInit(): void {
    // 相当于 mounted 挂载
    console.log('ngAfterViewInit: UI初始化完毕后');
  }

  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked: 数据变更');
  }

  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked: UI变更后');
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy: 将要销毁');
  }
}
```

## TypeScript

微软公司 在 JavaScript 的基础上, 添加了 Java 的很多特征, 是一个升级版的语言.

官方网站: https://www.tslang.cn/

Typescript 无法直接在浏览器运行,  因为浏览器只识别 JavaScript;

此时需要编译器, 来进行编译操作:

```
npm i -g typescript
```

检测版本: `tsc -v`

> 凡是安装之后, 提示 tsc **非内部或把外部命令**:  
>
> 一定是 你的 npm 文件夹没有配置到 环境变量里

```typescript
// 特征:  静态类型分析

// 参数名:类型
// :类型 是给 vscode 看.  vscode 就知道参数的类型, 进而提供两大功能:
// 1. 代码提示
// 2. 报错预警
function show(name: string) {
  // 代码提示
  console.log(name.toUpperCase());
}

//报错预警
show("mike");

/**
 * 想要运行, 则必须转化成 JS 文件
 *
 * 转化方式:
 * 1. 安装成功: tsc 01.ts
 * 2. 安装失败: npx tsc 01.ts
 *    npx是指临时下载 tsc 使用
 */

```

```typescript
// 类型声明 详细介绍

class Demo {
  // 完整格式:  变量名: 类型名 = 值;

  name: string = "lucy"; //字符串
  age: number; //数字
  married: boolean; // 布尔类型 true / false

  xyz: any; //any 任意类型. 为默认值

  // 自定义混合类型
  abc: number | boolean; // 数字 或 布尔

  // 数组: 两种写法, 都代表  数组中 都是 string 类型元素
  names: Array<string>;
  items: string[];

  // 规定数组中每个值的类型 及 数量
  emp: [string, number, boolean];

  show() {
    this.emp = ["dongdong", 33, true];
    this.emp = ["dongdong", 33];
    this.emp = ["dongdong", true];

    // this.names = ["mike", "lucy", 123, true];
    // this.items = ["mike", "lucy", 123, true];

    this.abc = 123;
    this.abc = true;
    // this.abc = "mike";

    this.xyz = 12;
    this.xyz = "mike";
  }
}

```

```typescript
// 对象类型

let boss = {
  name: "wenhua",
  age: 33,
  gender: 1,
  married: true,
};

// 声明对象类型的范式:
// interface: 接口.  新的关键词 与 class function 一样.  用于声明类型
interface Boss {
  // 模板中规定:  要哪些属性, 属性要什么类型
  name: string;
  age: number;
  gender: number;
  married: boolean;
}

// 一个对象 是 Boss 类型:  系统会自动检测 对象是否符合 模板要求
let dong: Boss = {
  name: "东东",
  age: 44,
  gender: 1,
  married: true,
};

// 雇员IT  ---  模板
interface IT_Employee {
  name: string;
  age: number;
  skills: string[]; //数组类型, 其中都是字符串
}

let youyu: IT_Employee = {
  name: "鱿鱼须",
  age: 26,
  skills: ["html", "css", "js", "vue", "react"],
};

```



```typescript
// 面向对象的 访问控制词:  可以让对象的属性 更加安全

/**
 * public: 公开的 --  类外 类内 子类
 * protected: 保护的 -- 类内 子类
 * private: 私有的 -- 类内
 */

class RanGe {
  // 默认不写关键词, 则是 public 代表公开: 类外可以
  public name = "然然";
  // protected: 保护的.  类外无法访问
  protected money = "999元";
  protected wifes = ["貂蝉", "小乔", "贾玲"];
  // 私有: 只有类内可以使用,  子类也不行
  private avi = "然哥珍藏多年的 小电影";

  show() {
    this.avi; //类内可以访问私有
  }
}

// 然哥的儿子
class Son extends RanGe {
  show() {
    // this.avi;
  }
}

// 在 类外 访问类中的属性
let rg = new RanGe();
// rg.money; //类外无法访问 保护属性

```

 