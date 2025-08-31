import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Kyle",
  lastName: "Huang",
  name: `Kyle Huang`,
  role: "前端工程师",
  avatar: "/images/avatar.png",
  email: "1250901577@qq.com",
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
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Kyle Huang</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">useState</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          精选博客
        </Text>
      </Row>
    ),
    href: "/blog/react-deep-dive-use-state",
  },
  subline: <>Hi～ 我是一个热衷于用代码解决实际问题的前端工程师 💻</>,
};

const about: About = {
  path: "/resume",
  label: "简历",
  title: `${person.name}｜简历`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
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
        Hi~
        我是Kyle，一个具有全栈开发能力的前端工程师；事实上，我更倾向于认为自己是一个善于解决问题的开发者。平时会关注一些
        AI、技术开源领域的最新动态。
        <br /> <br />
        我有代码洁癖，喜欢重构代码，对高效的系统架构情有独钟；但我非常认同过早进行性能优化反而会降低开发效率。
        <br /> <br />
        Project-Based Learning
        是我最喜欢的一种学习方式，因为用代码解决实际应用问题是最容易理解技术的路径！
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
        timeframe: "2025/07 - 至今",
        role: "客户端开发 - 架构小组",
        achievements: [
          <>
            构建优化：基于 Bazel 改造 Protobuf → Rust Binding 的生成流程，接入远端缓存以复用 PB
            构建产物，CI 构建性能提升约 30%
          </>,
          <>
            Monorepo架构优化：参与飞书多端代码向大型单体仓库迁移，复用底层 Rust 代码；完成 Android
            端 CI 任务脚本适配，适配率 100%
          </>,
          <>
            代码质量提升：开发 Ruby 脚本优化 iOS 编译策略，落地
            treat_warnings_as_errors；清理仓库冗余 public import，加速编译过程
          </>,
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
          { name: "HTML", icon: "html" },
          { name: "CSS", icon: "css" },
          { name: "JavaScript", icon: "javascript" },
          { name: "TypeScript", icon: "typescript" },
          { name: "React", icon: "react" },
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
          { name: "Android Studio", icon: "androidStudio" },
          { name: "Xcode", icon: "xcode" },
          { name: "Swift", icon: "swift" },
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
          { name: "appwrite", icon: "appwrite" },
          { name: "Node.js", icon: "nodejs" },
          { name: "Express.js", icon: "expressjs" },
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
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work: Work = {
  path: "/project",
  label: "项目经历",
  title: "项目经历",
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  // Images by https://lorant.one
  // These are placeholder images, replace with your own
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
