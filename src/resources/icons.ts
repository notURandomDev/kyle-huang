import { IconType } from "react-icons";

import {
  HiArrowUpRight,
  HiOutlineLink,
  HiArrowTopRightOnSquare,
  HiEnvelope,
  HiCalendarDays,
  HiArrowRight,
  HiOutlineEye,
  HiOutlineEyeSlash,
  HiOutlineDocument,
  HiOutlineGlobeAsiaAustralia,
  HiOutlineRocketLaunch,
} from "react-icons/hi2";

import {
  PiHouseDuotone,
  PiUserCircleDuotone,
  PiGridFourDuotone,
  PiBookBookmarkDuotone,
  PiImageDuotone,
} from "react-icons/pi";

import {
  SiJavascript,
  SiNextdotjs,
  SiFigma,
  SiSupabase,
  SiReact,
  SiGit,
  SiVercel,
  SiHtml5,
  SiCss3,
  SiTypescript,
  SiAndroidstudio,
  SiXcode,
  SiSwift,
  SiAppwrite,
  SiNodedotjs,
  SiExpress,
} from "react-icons/si";

import {
  FaDiscord,
  FaGithub,
  FaLinkedin,
  FaX,
  FaThreads,
  FaGitlab,
} from "react-icons/fa6";
import { TbBrandReactNative } from "react-icons/tb";

export const iconLibrary: Record<string, IconType> = {
  arrowUpRight: HiArrowUpRight,
  arrowRight: HiArrowRight,
  email: HiEnvelope,
  globe: HiOutlineGlobeAsiaAustralia,
  person: PiUserCircleDuotone,
  grid: PiGridFourDuotone,
  book: PiBookBookmarkDuotone,
  openLink: HiOutlineLink,
  calendar: HiCalendarDays,
  home: PiHouseDuotone,
  gallery: PiImageDuotone,
  discord: FaDiscord,
  eye: HiOutlineEye,
  eyeOff: HiOutlineEyeSlash,
  github: FaGithub,
  gitlab: FaGitlab,
  vercel: SiVercel,
  appwrite: SiAppwrite,
  linkedin: FaLinkedin,
  x: FaX,
  threads: FaThreads,
  arrowUpRightFromSquare: HiArrowTopRightOnSquare,
  document: HiOutlineDocument,
  rocket: HiOutlineRocketLaunch,
  html: SiHtml5,
  css: SiCss3,
  javascript: SiJavascript,
  typescript: SiTypescript,
  swift: SiSwift,
  react: SiReact,
  reactNative: TbBrandReactNative,
  expressjs: SiExpress,
  nextjs: SiNextdotjs,
  nodejs: SiNodedotjs,
  supabase: SiSupabase,
  figma: SiFigma,
  git: SiGit,
  androidStudio: SiAndroidstudio,
  xcode: SiXcode,
};

export type IconLibrary = typeof iconLibrary;
export type IconName = keyof IconLibrary;
