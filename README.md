# 核心防线 · 合成战场

可独立运行的第一人称三维浏览器游戏。守住三道核心防线，与 AI 队友作战，收集并合成武器。

- 在线游玩：<https://youlinh.github.io/core-frontier/>
- GitHub：<https://github.com/youlinh/core-frontier>
- 纯静态运行，无需登录、后端、API Key 或在线 CDN。

## 本地启动

安装 Node.js 22 或更新版本。在项目目录执行：

```powershell
npm start
```

浏览器打开 <http://127.0.0.1:4173/>。Windows 也可双击 `启动游戏.cmd`，按窗口提示打开地址。按 `Ctrl+C` 停止服务。

**运行游戏不需要先执行 npm install**：Three.js 和运行资源已放在 `dist/vendor/` 中。首次取得完整仓库后即可断网启动游玩。不要直接双击 `dist/index.html`，浏览器的 ES Module 需要 HTTP 服务。

如端口占用，可在 PowerShell 中指定其他端口：

```powershell
$env:PORT = '4174'
npm start
```

本地服务仅监听 `127.0.0.1`。也可用任意静态 HTTP 服务器托管 `dist/`。

## 操作

| 动作 | 电脑 | 手机/触屏 |
| --- | --- | --- |
| 移动 | WASD | 左侧摇杆 |
| 瞄准 | 鼠标（点击战场捕获鼠标） | 拖动右侧区域 |
| 攻击/挥刀 | 按住鼠标左键 | 按住开火 |
| 跳跃 | 空格 | 跳跃按钮 |
| 趴下 | C | 趴下按钮 |
| 冲刺 | Shift | — |
| 切换武器 | 1 / 2 | 切换武器按钮 |
| 手雷 / 地雷 | G / F | 对应按钮 |
| 暂停 | Esc 或暂停按钮 | 暂停按钮 |

## 现有玩法

- 开局一把一级小刀；通关第 1、2、3 关依次解锁手枪、地雷、手雷，第 4 关开放合成。
- 四类武器各自最高 500 级。两把同类同级武器可合成，并获得金币；持有的枪械持续产生银币。
- 银币购买已解锁等级的装备，枪械达到二级后开放金币商店，铜币购买涂装。
- 双方均有雕像、小型隐藏核心、激光核心三层防线；我方三层全部被摧毁才失败，摧毁敌方三层获胜。没有战斗倒计时，角色可复活。
- 1000 个程序生成关卡、四种战区主题，支持随机/自选已有枪械、核心升级和每日领取。
- 每日奖励以北京时间（Asia/Shanghai）计算，每个日期仅领一次。

## 存档

自动保存在当前浏览器的 localStorage（键 `core-frontier-v1`）。本地地址、GitHub Pages、原 ChatGPT Sites 属于不同网址，各自独立存档，不会自动迁移；更换浏览器、隐私窗口或清理网站数据也会影响进度。本项目不包含跨设备云存档。

## 开发与验证

```powershell
npm ci --ignore-scripts
npm test
```

测试覆盖解锁、合成、商店、经济、每日领取、存档规范化、核心伤害、软件渲染裁剪，以及本地静态服务器的资源类型和目录边界。

游戏源码直接位于 `dist/`，没有额外构建步骤。`dist/vendor/` 包含 Three.js 0.180.0 运行文件及其 MIT 许可证。`package-lock.json` 用于依赖版本复现；若更新 Three.js，需同步更新 vendor 文件并回归验证。

## GitHub Pages 发布

仓库 Settings → Pages → Build and deployment 选择 **GitHub Actions**。推送到 `main` 后，`.github/workflows/pages.yml` 会先执行测试与语法检查，再发布 `dist/`；也可在 Actions 手动运行。只有验证成功的提交才会进入部署作业。工作流根据 GitHub 的[自定义 Pages 工作流说明](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)配置。

## 来源与范围

移植自用户指定对话中的《核心防线 · 合成战场》，来源源码提交 `50981708a76b7a39485181d24ba074558b59d90e`。本次补充独立本地启动、中文部署说明、服务测试及 Pages 自动发布，保留原有游戏内容。原 Sites 身份与凭据不随仓库发布。

画面使用简化的程序化三维模型；1000 关与 500 级武器由参数生成，不代表 1000 张手工地图或 500 个独立精细模型。优先使用 WebGL2；不可用时降级为 CPU Canvas 渲染，画质与性能会有所降低。未进行全部 1000 关的人工通关测试。
