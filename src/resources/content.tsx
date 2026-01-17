import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Kyle",
  lastName: "Huang",
  name: `Kyle Huang`,
  role: "前端工程师",
  avatar: "/images/avatar.png",
  email: "1250901577@qq.com",
  base: "Beijing, China",
  location: "Asia/Shanghai", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: [], // optional: Leave the array empty if you don't want to display languages
};

const newsletter: Newsletter = {
  display: false,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>My weekly newsletter about creativity and engineering</>,
};

const social: Social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  // Set essentials: true for links you want to show on the about page
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/notURandomDev",
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.png",
  label: "Home",
  title: `${person.name}`,
  description: `${person.role} - ${person.name} 的个人网站`,
  headline: <>Kyle Huang</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Sourcemap原理剖析</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          精选博客
        </Text>
      </Row>
    ),
    href: "/blog/source-map",
  },
  subline: <>专注前端工程，具备全栈视角与实践能力</>,
};

const about: About = {
  path: "/resume",
  label: "简历",
  title: `${person.name} - 简历`,
  description: `Hi~ 我是 ${person.name}, base 北京的${person.role}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "个人介绍",
    description: (
      <>
        <b>👋 个人介绍</b>
        Hi～ 我是一个具有全栈开发能力的前端工程师；
        同时也做过构建优化、研发效率相关的架构工作，写过服务端 API Service。
        <br /> <br />
        React.js 是我的核心技术栈，BaaS
        是我独立开发的好帮手；在设计产品时，我习惯从用户角度出发，探索最佳的交互模式。
        <br /> <br />
        我有丰富的项目经验，做过 Web、RN跨平台、微信小程序，以及 iOS 和 Android
        的原生开发；Project-Based Learning 是我最喜欢的学习方式！
        <br /> <br />
        业余时间，我喜欢参与有意思的开源项目，为 Open-Sourcing 做出自己的贡献~
        <br /> <br />
        <b>⌨️ 关于我的编码态度</b>
        我喜欢秉承一种「代码工匠」的精神，将自己开发的项目当作一个艺术品来雕刻；这不仅体现在我对 UX
        细节的高标准还原，还体现在对于屎山代码的零容忍以及架构合理性的考量。
        <br /> <br />
        这种观念并不和效率冲突；相反地，我在开发过程中会尽量避免这种 Coding-OCD 对开发效率的影响。
        <br /> <br />
        基于 YAGNI
        原则，往往我会保证先在能向后兼容的架构基础上实现功能，尽可能避免抽象层的过早设计；然后在开发过程中随时重构，对通用
        service 逻辑进行提取，对可复用的 hook 进行封装等等，渐进式地优化代码质量。
      </>
    ),
  },
  studies: {
    display: true, // set to false to hide this section
    title: "教育经历",
    institutions: [
      {
        name: "软件工程-大四｜杭州电子科技大学",
        description: (
          <>
            GPA：4.2/5，平均绩点专业前三
            <br />
            <br />
            获浙江省政府奖学金、校优秀学生奖学金一等奖2次，二等奖1次
          </>
        ),
      },
    ],
  },
  work: {
    display: true, // set to false to hide this section
    title: "实习经历",
    experiences: [
      {
        company: "飞书｜字节跳动",
        timeframe: "2025/11 - 至今",
        role: "前端开发 - 企业知识问答",
        achievements: [<>企业级 Knowledge-Based AI 应用开发</>],
        images: [
          // optional: leave the array empty if you don't want to display images
          {
            src: "/images/work/lark/logo-02.png",
            alt: "Knowledge AI Logo",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "飞书｜字节跳动",
        timeframe: "2025/07 - 2025/10",
        role: "客户端开发 - Infra",
        achievements: [
          <>
            ✨ RustSDK 集成 Bazel 构建：将 PB 生成流程从 Cargo 迁至
            Bazel，实现产物多级缓存；增量构建提速 61.7%，二次构建缓存提速 94.9%
          </>,
          <>Monorepo 迁移：通过插件开发与脚本适配，完成了 47 个 Android 端 CI 任务迁移</>,
          <>iOS 构建优化：对 16 个模块进行 internal import 优化，提升构建速度</>,
        ],
        images: [
          // optional: leave the array empty if you don't want to display images
          {
            src: "/images/work/lark/logo-01.jpg",
            alt: "Lark Logo",
            width: 16,
            height: 9,
          },
        ],
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "专业技能",
    skills: [
      {
        title: "Web前端开发",
        description: (
          <>熟悉 HTML、CSS、JavaScript、TypeScript；熟悉 React 框架、UI组件库应用及开发</>
        ),
        tags: [
          { name: "React", icon: "react" },
          { name: "TypeScript", icon: "typescript" },
          { name: "HTML", icon: "html" },
          { name: "CSS", icon: "css" },
          { name: "JavaScript", icon: "javascript" },
        ],
        // optional: leave the array empty if you don't want to display images
        images: [],
      },
      {
        title: "跨平台开发",
        description: (
          <>熟悉 React Native 跨平台开发、微信小程序开发；有 Android、iOS 客户端开发经验</>
        ),
        tags: [
          { name: "React Native", icon: "reactNative" },
          { name: "Swift", icon: "swift" },
          { name: "Xcode", icon: "xcode" },
          { name: "Android Studio", icon: "androidStudio" },
        ],
        // optional: leave the array empty if you don't want to display images
        images: [],
      },
      {
        title: "全栈开发",
        description: (
          <>有使用 云开发平台/BaaS 协助全栈开发的能力；了解常规的 Node.js 后端项目开发</>
        ),
        tags: [
          { name: "Node.js", icon: "nodejs" },
          { name: "Express.js", icon: "expressjs" },
          { name: "appwrite", icon: "appwrite" },
        ],
        // optional: leave the array empty if you don't want to display images
        images: [],
      },
      {
        title: "DevOps",
        description: <>熟悉Git；有GitHub/GitLab的DevOps相关经验，以及Web项目的部署全流程经验</>,
        tags: [
          { name: "Git", icon: "git" },
          { name: "GitHub", icon: "github" },
          { name: "GitLab", icon: "gitlab" },
          { name: "Vercel", icon: "vercel" },
          { name: "Sentry", icon: "sentry" },
        ],
        // optional: leave the array empty if you don't want to display images
        images: [],
      },
      {
        title: "设计能力",
        description: <>熟悉UI、UX设计，有Figma使用经验，艺术审美较高；善于将想法转化为产品</>,
        tags: [
          {
            name: "Figma",
            icon: "figma",
          },
        ],
        // optional: leave the array empty if you don't want to display images
        images: [],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "技术博客",
  title: "在项目中积累开发经验",
  description: "沉淀技术时写的一些博客",
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work: Work = {
  path: "/project",
  label: "项目经历",
  title: "项目经历",
  // description: `Design and dev projects by ${person.name}`,
  description: "我做过的项目精选集",
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery: Gallery = {
  path: "/gallery",
  label: "键盘",
  title: `${person.name} - 键盘`,
  description: `${person.name}'s Keyboard Collection`,
  // Images by https://lorant.one
  // These are placeholder images, replace with your own
  images: [
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-5.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "image",
      orientation: "horizontal",
    },

    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
