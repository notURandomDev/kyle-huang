import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import { slugify as transliterate } from "transliteration";
import React, { ReactNode } from "react";

import {
  Heading,
  HeadingLink,
  Text,
  InlineCode,
  CodeBlock,
  TextProps,
  MediaProps,
  Accordion,
  AccordionGroup,
  Table,
  Feedback,
  Button,
  Card,
  Grid,
  Row,
  Column,
  Icon,
  Media,
  SmartLink,
  List,
  ListItem,
  Line,
  OgCard,
} from "@once-ui-system/core";

type CustomLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
};

function CustomLink({ href, children, ...props }: CustomLinkProps) {
  const blacklist = ["youtube", "github"];

  if (href.includes("https://www.youtube.com") || href.includes("https://youtu.be")) {
    return <Media caption={children} src={href} aspectRatio="16/9" radius="xl" />;
  }

  // if (
  //   href.includes("https://") &&
  //   !blacklist.some((item) => href.includes(item))
  // ) {
  //   return <OgCard url={href}>{children}</OgCard>;
  // }

  if (href.startsWith("/")) {
    return (
      <SmartLink href={href} {...props}>
        {children}
      </SmartLink>
    );
  }

  if (href.startsWith("#")) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}

function createImage({ alt, src, ...props }: MediaProps & { src: string }) {
  if (!src) {
    console.error("Media requires a valid 'src' property.");
    return null;
  }

  return (
    <Media
      marginTop="8"
      marginBottom="16"
      enlarge
      radius="m"
      border="neutral-alpha-medium"
      sizes="(max-width: 960px) 100vw, 960px"
      alt={alt}
      src={src}
      caption={alt}
      {...props}
    />
  );
}

function slugify(str: string): string {
  const strWithAnd = str.replace(/&/g, " and "); // Replace & with 'and'
  return transliterate(strWithAnd, {
    lowercase: true,
    separator: "-", // Replace spaces with -
  }).replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

function createHeading(as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6") {
  const CustomHeading = ({
    children,
    ...props
  }: Omit<React.ComponentProps<typeof HeadingLink>, "as" | "id">) => {
    const slug = slugify(children as string);
    return (
      <HeadingLink marginTop="24" marginBottom="12" as={as} id={slug} {...props}>
        {children}
      </HeadingLink>
    );
  };

  CustomHeading.displayName = `${as}`;

  return CustomHeading;
}

function createParagraph({ children }: TextProps) {
  return (
    <Text
      style={{ lineHeight: "175%" }}
      variant="body-default-m"
      onBackground="neutral-medium"
      marginTop="8"
      marginBottom="12"
    >
      {children}
    </Text>
  );
}

function createInlineCode({ children }: { children: ReactNode }) {
  return <InlineCode>{children}</InlineCode>;
}

function createCodeBlock(props: any) {
  // For pre tags that contain code blocks
  if (props.children && props.children.props && props.children.props.className) {
    const { className, children } = props.children.props;

    // Extract language from className (format: language-xxx)
    const language = className.replace("language-", "");

    // Extract custom label from comment and clean code
    const { label, code } = extractLabelAndCleanCode(children, language);

    return (
      <CodeBlock
        marginTop="8"
        marginBottom="16"
        codes={[
          {
            code,
            language,
            label,
          },
        ]}
        copyButton={true}
      />
    );
  }

  // Fallback for other pre tags or empty code blocks
  return <pre {...props} />;
}

function extractLabelAndCleanCode(children: string, fallbackLanguage: string) {
  // Split code into lines
  const lines = children.split("\n");
  const fallbackLanguageLabel =
    fallbackLanguage.charAt(0).toUpperCase() + fallbackLanguage.slice(1);

  // If the code block is empty, return the fallback language label
  if (lines.length === 0) {
    return {
      label: fallbackLanguageLabel,
      code: children,
    };
  }

  const firstLine = lines[0].trim();
  let label = fallbackLanguageLabel;
  let code = children;

  // Check for special MDX renderer label comment: @label: xxx
  const specialLabelMatch = firstLine.match(/^@label:\s*(.+)$/);
  if (specialLabelMatch) {
    label = specialLabelMatch[1].trim();
    // Remove the label comment line and the following empty line if it exists
    const startIndex = lines[1]?.trim() === "" ? 2 : 1;
    code = lines.slice(startIndex).join("\n");
    return { label, code };
  }

  // No custom label found, use fallback
  return { label, code };
}

function createList(as: "ul" | "ol") {
  return ({ children }: { children: ReactNode }) => <List as={as}>{children}</List>;
}

function createListItem({ children }: { children: ReactNode }) {
  return (
    <ListItem marginTop="4" marginBottom="8" style={{ lineHeight: "175%" }}>
      {children}
    </ListItem>
  );
}

function createHR() {
  return (
    <Row fillWidth horizontal="center">
      <Line maxWidth="40" />
    </Row>
  );
}

// function createQuote(props: any) {
//   const quoteNode = props.children.find((el: any) => el !== "\n");

//   const quote = quoteNode.props.children;
//   console.log("[createQuote] quote:", quote);

//   return (
//     <Row fillWidth>
//       <Line vert height="20" />
//       <Text
//         style={{ lineHeight: "175%" }}
//         variant="body-strong-m"
//         onBackground="neutral-medium"
//         marginTop="8"
//         marginBottom="12"
//       >
//         {quote}
//       </Text>
//     </Row>
//   );
// }

const components = {
  p: createParagraph as any,
  h1: createHeading("h1") as any,
  h2: createHeading("h2") as any,
  h3: createHeading("h3") as any,
  h4: createHeading("h4") as any,
  h5: createHeading("h5") as any,
  h6: createHeading("h6") as any,
  img: createImage as any,
  a: CustomLink as any,
  code: createInlineCode as any,
  pre: createCodeBlock as any,
  ol: createList("ol") as any,
  ul: createList("ul") as any,
  li: createListItem as any,
  hr: createHR as any,
  Heading,
  Text,
  CodeBlock,
  InlineCode,
  Accordion,
  AccordionGroup,
  Table,
  Feedback,
  Button,
  Card,
  Grid,
  Row,
  Column,
  Icon,
  Media,
  SmartLink,
  OgCard,
};

type CustomMDXProps = MDXRemoteProps & {
  components?: typeof components;
};

export function CustomMDX(props: CustomMDXProps) {
  return (
    <MDXRemote
      options={{ blockJS: false }}
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}
