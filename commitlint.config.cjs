/** @type {import('cz-git').UserConfig} */
/*******************************************************
 * Git Commit 信息结构
 *
 * Header 行: 包括 提交类型(作用范围): 简述内容
 *
 * Body 行: 采用多行文本记录，可用过 "|" 换行记录多行内容。
 *
 * Footer 行: 用于 Bug 修复或版本发布等场景，并记录破环性描述。
 ******************************************************/

module.exports = {
  /** 继承社区最通用的 Angular 规范（如 feat:, fix:）*/
  extends: ['@commitlint/config-conventional'],

  /** 集成并汉化 cz-git 交互提示器（完美配合 commitizen）*/
  prompt: {
    types: [
      { value: 'feat', name: 'feat:     ✨ 新增功能' },
      { value: 'fix', name: 'fix:      🐛 修复缺陷' },
      { value: 'docs', name: 'docs:     📝 文档变更' },
      { value: 'style', name: 'style:    💄 代码格式 (不影响逻辑的变动)' },
      {
        value: 'refactor',
        name: 'refactor: ♻️  代码重构 (既不修复错误也不添加功能)',
      },
      { value: 'perf', name: 'perf:     ⚡️ 性能优化' },
      { value: 'test', name: 'test:     ✅ 测试相关' },
      { value: 'build', name: 'build:    📦️ 构建相关 (如修改 vite/vp 或依赖)' },
      { value: 'ci', name: 'ci:       🎡 持续集成 (修改 CI 脚本配置)' },
      {
        value: 'chore',
        name: 'chore:    🔨 其他修改 (对构建过程或辅助工具的变动)',
      },
      { value: 'revert', name: 'revert:   ⏪️ 回退代码' },
      { value: 'wip', name: 'wip:      🛠️  仍在开发中 (紧急暂存进度)' },
    ],

    messages: {
      type: '选择你要提交的类型 :',
      scope: '选择一个提交范围 (可选):',
      // customScope: "请输入自定义的提交范围 :",
      subject: '填写简短精炼的变更描述 :\n',
      body: '填写更加详细的变更内容 (可选)。使用 "|" 换行 :\n',
      // breaking: "列举非兼容性重大的变更 (Breaking Changes) (可选) :\n",
      // footerPrefixesSelect: "选择关联issue前缀 (可选):",
      // customFooterPrefix: "输入自定义issue前缀 :",
      footer: '输入关联issue号 (可选) 例如: #31, #34 :\n',
      confirmCommit: '是否提交本次 commit ?',
    },

    /** 本次操作的默认提交范围 */
    scopes: [
      { value: 'root', name: 'root:     根目录/全局配置' },
      { value: 'src', name: 'src:      源代码相关' },
      { value: 'utils', name: 'utils:    工具函数' },
      { value: 'types', name: 'types:    TS 类型定义' },
    ],
  },

  // 自定义验证规则
  plugins: [
    {
      /** 自定义校验规则 */
      rules: {
        'subject-zh-en-lowercase': ({ subject }) => {
          const UppercaseReg = /[A-Z]/;
          const NullSubjectMsg = '标题头的简述内容不能为空。';
          const SubjectExistUppercaseMsg =
            '标题头的简述内容只能使用中文和小写字母，禁止使用大写字母。';

          /** 标题的简述内容为空，报错提示必须输入简述内容。 */
          if (!subject) return [false, NullSubjectMsg];

          /** 标题头的简述内容出现大写字母，报错提示禁止使用大写字母。 */
          const ExistUpperCase = UppercaseReg.test(subject);
          if (ExistUpperCase) return [false, SubjectExistUppercaseMsg];

          return [true];
        },
      },
    },
  ],

  // 流程规则配置
  rules: {
    /** 限制 commit 的类型 */
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'build',
        'ci',
        'chore',
        'revert',
        'wip',
      ],
    ],

    /** Header 行规则配置 */
    'type-empty': [2, 'never'],
    'scope-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
    'subject-max-length': [2, 'always', 100],
    // 关闭原生配置，采用以下自定义配置
    'subject-case': [0],
    'subject-zh-en-lowercase': [2, 'always'],

    /** Body 行规则配置 */
    'body-leading-blank': [2, 'always'],
    /** Footer 行规则配置 */
    'footer-leading-blank': [2, 'always'],
  },
};

/*******************************************************
 * 初始化项目配置的提交模板
 *
 * chore(root): 项目初始化配置
 *
 * 1. 基于 viteplus 创建项目。
 * 2. 通过 cspell 配置单词拼写检查。
 * 3. 通过 commitlint、cz-git 配置代码提交约束。
 *******************************************************/

/*******************************************************
 * 新功能开发场景的提交模板
 *
 * feat(feat-a): feat-a 模块开发
 *
 * 1. 基于 axios 实现数据请求。
 * 2. 完成 feat-a 数据列表渲染。
 *******************************************************/

/*******************************************************
 * 程序缺陷修复场景的提交模板（closes 关闭已修复的缺陷问题）
 *
 * fix(feat-b): feat-b 模块修复
 *
 * 1. 修复 axois 请求参数解析错误。
 *
 * breaking change:
 * 1. 移除 xxx，新版本采用 yyy。
 * closes #31
 *******************************************************/

/*******************************************************
 * 版本预发布场景的提交模板（refs 正在验证缺陷问题或需求）
 *
 * build(root): 版本发布 v1.0.0-beta.0 或 v1.0.0
 *
 * 1. 修复主干分支 n 处阻断性缺陷。
 * 2. 移除 xxx 接口，改用 yyy 接口。
 *
 * breaking change:
 * 1. 移除 xxx 接口，改用 yyy 接口。
 * refs #31, #34
 *******************************************************/

/*******************************************************
 * 版本正式发布场景的提交模板（closes 关闭已修复的缺陷问题）
 *
 * build(root): 版本正式发布 v1.0.0
 *
 * 1. 修复主干分支 n 处阻断性缺陷。
 * 2. 支持更多新特性功能。
 *
 * closes #31, #34
 *******************************************************/
