## git作用 

> 团队协作时,合并代码
>
> 个人块提交代码
>
> 保存多个代码版本,版本之间可以随意切换
>
> 对比前后代码区别



## git安装

查看安装的git软件版本号

> git --version



## git命令

![](images\git.png)

 git config --global user.name  "lei"  配置用户名

 git config --global user.email  "315455509@qq.com"  配置邮箱

git config --list 查看配置

clear 清屏



> git init                 					把文件夹变成git管理仓库
>
> git config --system --unset credential.helper  清除本地的gitee用户名和密码
>
> git status         						查看仓库当前状态
>
> git log                                       查看当前版本以及以前版本
>
> git reflog                                   查看所有版本
>
> git reset --hard   版本号       回滚版本
>
> git add 文件名     					把一个文件添加到暂存区   
>
> git add    .            				    把所有文件添加到暂存区
>
> git commit -m 提交说明        把暂存区的文件提交给本地仓库
>
> git push                                    把本地仓库的历史记录推到远程仓库
>
> git diff:                                      比较工作区与暂存区的差异
>
> git diff --cached                      比较暂存区与版本区的差异(get add 后)
>
> git diff master                        比较工作区域版本区的差异(git commit后)

### 本地仓库推送给网络仓库

$ git remote add origin https://github.com/LeiBiao/first-test.git  把仓库网络连接命名为 origin

$ git remote -v 查看是否连接成功

![](images\git123.png)

$ git push -u origin master           把本地仓库推送给网络仓库的master分支

### 从网络仓库下载到本地

git clone  仓库地址