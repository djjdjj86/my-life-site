# 我的小站

一个属于我自己、会随着人生一起长大的个人网站（深色玻璃风格）。

## 有哪些栏目

- 🙋 **关于我** —— 自我介绍
- 🗓️ **人生时间线** —— 每个阶段的经历
- 📝 **随笔 · 想法** —— 平时的思考
- 🖼️ **相册** —— 照片墙
- 📚 **阅读 · 影单** —— 读过的书、看过的片、听过的歌
- ✈️ **足迹 · 旅行** —— 去过和想去的地方
- ⭐ **收藏夹** —— 喜欢的东西和链接

## 怎么打开看效果

**方法一（最简单）：** 直接双击 `index.html`，浏览器里打开。

**方法二（用 VS Code）：** 打开文件夹 → 右键 `index.html` → 「Open with Live Server」。

## 怎么添加 / 修改内容

所有内容都在 `data.js` 一个文件里，**只改它就行**。文件里有详细中文注释，照着示例「复制一条 → 改文字」即可。

- 改自我介绍 → 改 `about`
- 加一段经历 → 往 `timeline` 里加一条
- 加一篇随笔 → 往 `essays` 里加一条
- 加一张照片 → 往 `gallery` 里加一条
- 加一本书/一部片 → 往 `reading` 里加一条
- 加一个足迹 → 往 `travels` 里加一条
- 加一个收藏 → 往 `favorites` 里加一条

保存后刷新网页即可看到，最新的会自动排在最上面。

### 相册怎么换成自己的照片

1. 在本文件夹里新建一个 `images` 文件夹
2. 把照片放进去
3. 打开 `data.js`，把那张照片的 `url` 改成 `"images/照片名.jpg"`

现在相册用的是网络占位图，联网时才能显示。

## 怎么免费发布到网上（GitHub Pages）

1. 去 [github.com](https://github.com) 注册账号
2. 点右上角 `+` → `New repository`，仓库名填 `my-life-site`，选 Public，点创建
3. 回到本文件夹，打开终端，依次执行：

```bash
git init
git add .
git commit -m "我的第一个网站"
git branch -M main
git remote add origin https://github.com/你的用户名/my-life-site.git
git push -u origin main
```

4. 打开仓库页面 → `Settings` → 左侧 `Pages` → `Branch` 选 `main`，点 Save
5. 等一两分钟，访问 `https://你的用户名.github.io/my-life-site/` 就能看到你的网站 🎉

以后更新内容后，只需执行：

```bash
git add .
git commit -m "更新内容"
git push
```

## 文件说明

| 文件 | 作用 |
|------|------|
| `index.html` | 页面结构（一般不用改） |
| `style.css` | 样式（想换颜色、字号改这里） |
| `data.js` | **内容**（所有栏目都往这里加） |
| `script.js` | 渲染逻辑（一般不用改） |
