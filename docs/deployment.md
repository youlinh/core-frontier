# 本地与 GitHub 部署记录

日期：2026-11-07（北京时间）。

## 已验证

- 从用户指定的原游戏取回源码，来源提交为 `50981708a76b7a39485181d24ba074558b59d90e`。
- 保留原游戏资源和规则，新增 `npm start`、Windows 启动脚本、服务测试和中文说明。
- Node.js 24.19.0 下 `npm ci --ignore-scripts` 成功，16 项测试全部通过，4 个业务/服务 JavaScript 文件语法检查通过。
- 本地服务首页、CSS、JavaScript、Three.js 模块返回成功且 MIME 正确；HEAD、缺失资源、不允许的方法、路径越界场景通过测试。
- 浏览器 1280×800 与 390×844 检查：加载完成、场景可见，无控制台错误；手机宽度与页面 scrollWidth 均为 390。
- 实际 UI 验证进入战斗、暂停/返回、周六奖励领取（重复领取被禁用）、手枪装备、移动（核心距离从 98m 降至 75m）、开火（敌方当前核心血量由 1 降到 0.23077）、趴下（按钮变为“站起”）。
- 返回指挥台并刷新页面后，已领取的手枪与银币进度保留。

## 发布配置

- 目标仓库：`youlinh/core-frontier`，公开仓库。
- Pages 目标：`https://youlinh.github.io/core-frontier/`。
- Actions 在 `main` 推送后验证并发布 `dist/`，验证与部署作业分开。
- 原 Sites 源码快照保留在本地 `.sites-checkout/`，已被 Git 忽略；原 Sites 的访问控制和发布版本不受本次迁移影响。

## 发布结果

- 首次发布提交：`8f1ae42357ca4db0ead95b0d6f3281b8c871fd00`。
- [GitHub Actions 42349301133](https://github.com/youlinh/core-frontier/actions/runs/42349301133) 的验证与部署作业均成功。
- 公开站点的首页、游戏脚本、规则模块、软件渲染器、CSS 和两份 Three.js 模块均返回 HTTP 200；七个文件的 SHA-256 与已提交 Git 对象逐字节一致。Windows 工作副本的 CRLF 与 Git 中的 LF 仅有换行格式差异。
- 在浏览器直接访问公开站点，首页和三维场景加载成功，无需登录、无控制台错误。

未进行所有 1000 关人工通关、实体手机或所有显卡/浏览器组合测试。
