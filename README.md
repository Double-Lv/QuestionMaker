##QuestionMaker

这是一个学习项目。

使用“MEAN”技术栈（即：mongodb、express、angular、nodejs）开发的实验性项目，用于研究基本技术。

####项目概述：
QuestionMaker可以用来编辑试题（选择题、填空题）和试卷，然后把题目添加到试卷中，从而生成一份调查问卷，类似调查派。
![demo](http://images.cnblogs.com/cnblogs_com/lvdabao/507840/o_QQ%e5%9b%be%e7%89%8720150907163253.png)

项目的功能主要是CRUD操作，所以非常适合angular的应用场景，双向绑定对于实现实时预览这样的功能简直是信手拈来。

本着前后端分离的原则，所有页面都由前端渲染（angular的模板），后端只通过express提供数据接口。

####如何运行项目（windows环境为例）
首先确保你机器上安装了nodejs和mongodb，如没有，先去官网下载安装。然后安装如下步骤进行;

1. 克隆项目代码到你的机器，如目录为E:\QuestionMaker下
2. 运行数据库并导入demo数据
    1. 运行cmd，输入命令启动mongo服务：mongod --dbpath E:\QuestionMakerDB
    2. 导入demo数据：在cmd中运行：mongorestore -d QuestionMaker --drop E:\QuestionMaker\backup\mongodb\QuestionMaker
3. npm安装所需的包，直接在项目根目录下执行：npm install
4. 修改protect/server.js文中_rootDir的值，表示网站根目录，如'/QuestionMaker'，默认端口为3000， 你也可以修改
5. 启动服务器：进入protect目录，运行nodemon server.js(我本地有安装nondemon，你若没有安装，先自行安装，或者直接node server.js)
6. 打开浏览器，访问127.0.0.1:3000，能看到如下首页，说明部署成功，如果未能成功，查看报错信息解决对应问题
![](http://images.cnblogs.com/cnblogs_com/lvdabao/507840/o_QQ%e5%9b%be%e7%89%8720150907181135.png)

####gulp构建（非必须）
该项目使用了gulp来进行资源的压缩合并，gulpfile已经编写好，只需执行gulp命令即可，编译完成后会生成一个dist目录，里面是压缩好的代码，然后在把server.js中的路径由src改为dist即可访问。



