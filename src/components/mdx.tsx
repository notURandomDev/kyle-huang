import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
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
      enlarge
      radius="m"
      border="neutral-alpha-medium"
      sizes="(max-width: 960px) 100vw, 960px"
      alt={alt}
      src={src}
      caption={
        <Row
          as="figcaption"
          fillWidth
          textVariant="label-default-s"
          onBackground="neutral-weak"
          paddingX="24"
          paddingY="0"
          horizontal="center"
          align="center"
        >
          {alt}
        </Row>
      }
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
      marginBottom="8"
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
      <Line marginY="12" maxWidth="40" />
    </Row>
  );
}

interface TableAlignment {
  align?: "left" | "center" | "right";
}

interface CreateTableProps {
  children: ReactNode;
}

function createTable({ children }: CreateTableProps) {
  // Extract table data from children
  const tableData = extractTableData(children);

  if (!tableData) {
    return null;
  }

  return (
    <Table
      data={{
        headers: tableData.headers,
        rows: tableData.rows,
      }}
    />
  );
}

function extractTableData(children: ReactNode): {
  headers: Array<{ content: ReactNode; key: string; align?: "left" | "center" | "right" }>;
  rows: ReactNode[][];
} | null {
  try {
    // Convert children to array and filter out whitespace
    const childArray = React.Children.toArray(children).filter(
      (child) => typeof child !== "string" || child.trim() !== ""
    );

    if (childArray.length === 0) {
      return null;
    }

    // Look for table sections (thead, tbody) or direct tr elements
    const rows: ReactNode[][] = [];
    let headers: Array<{ content: ReactNode; key: string; align?: "left" | "center" | "right" }> =
      [];
    let alignments: ("left" | "center" | "right")[] = [];

    // Helper function to extract cell content from different data structures
    const extractCellContent = (cell: any): ReactNode => {
      if (typeof cell === "string") return cell;
      if (cell?.props?.children) return cell.props.children;
      if (cell?.children) return cell.children;
      return "";
    };

    // Helper function to process table rows
    const processRow = (row: any, isHeader: boolean = false) => {
      if (!row || !row.props?.children) return null;

      const cells = React.Children.toArray(row.props.children).filter(
        (cell: any) => cell?.type === "th" || cell?.type === "td"
      );

      if (cells.length === 0) return null;

      const cellContents = cells.map((cell: any) => extractCellContent(cell));

      // Check for alignment information in cell props
      const cellAlignments = cells.map((cell: any) => {
        const cellProps = cell?.props || {};

        // Check for align attribute
        if (cellProps.align) {
          return cellProps.align as "left" | "center" | "right";
        }

        // Check for style.textAlign
        if (cellProps.style?.textAlign) {
          return cellProps.style.textAlign as "left" | "center" | "right";
        }

        // Default alignment
        return "left" as const;
      });

      if (isHeader) {
        headers = cellContents.map((content, i) => ({
          content: content || "",
          key: `header-${i}`,
          align: cellAlignments[i],
        }));
        alignments = cellAlignments;
      } else {
        rows.push(cellContents.map((content) => content || ""));
      }
    };

    // Process children looking for table structure
    childArray.forEach((child) => {
      if (React.isValidElement(child)) {
        const element = child as any;

        // Handle thead section
        if (element.type === "thead" && element.props?.children) {
          const theadChildren = React.Children.toArray(element.props.children);
          theadChildren.forEach((theadChild) => {
            if (React.isValidElement(theadChild) && (theadChild as any).type === "tr") {
              processRow(theadChild, true); // Process as header row
            }
          });
        }

        // Handle tbody section
        else if (element.type === "tbody" && element.props?.children) {
          const tbodyChildren = React.Children.toArray(element.props.children);
          tbodyChildren.forEach((tbodyChild) => {
            if (React.isValidElement(tbodyChild) && (tbodyChild as any).type === "tr") {
              processRow(tbodyChild, false); // Process as data row
            }
          });
        }

        // Handle direct tr elements (fallback)
        else if (element.type === "tr") {
          processRow(element, headers.length === 0); // First tr becomes header if no headers yet
        }
      }
    });

    // If no headers found but we have rows, infer headers from first row
    if (headers.length === 0 && rows.length > 0) {
      headers = rows[0].map((_, index) => ({
        content: `Column ${index + 1}`,
        key: `header-${index}`,
        align: "left",
      }));
      rows.shift(); // Remove first row from data since it's used as header
    }

    return { headers, rows };
  } catch (error) {
    console.error("Error extracting table data:", error);
    return null;
  }
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
  table: createTable as any,
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

const options = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
  },
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
      options={options}
    />
  );
}
