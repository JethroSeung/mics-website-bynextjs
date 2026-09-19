import { createElement, type CSSProperties, type ReactNode } from "react";

export type RichNode =
  | string
  | {
      readonly tag: string;
      readonly attrs: Readonly<Record<string, string>>;
      readonly children: readonly RichNode[];
    };

const allowedTags = new Set([
  "a", "address", "article", "br", "code", "details", "div", "em", "figcaption",
  "figure", "h1", "h2", "h3", "h4", "h5", "hr", "img", "li", "ol", "p", "path",
  "pre", "section", "small", "span", "strong", "summary", "svg", "table", "tbody", "td",
  "th", "thead", "tr", "ul",
]);
const voidTags = new Set(["br", "hr", "img"]);

const attributeNames: Record<string, string> = {
  class: "className",
  tabindex: "tabIndex",
  "stroke-width": "strokeWidth",
  "stroke-linecap": "strokeLinecap",
  "stroke-linejoin": "strokeLinejoin",
  viewbox: "viewBox",
};

function parseStyle(style: string): CSSProperties {
  const result: Record<string, string> = {};
  for (const declaration of style.split(";")) {
    const separator = declaration.indexOf(":");
    if (separator < 0) continue;
    const property = declaration.slice(0, separator).trim();
    const value = declaration.slice(separator + 1).trim();
    if (!property || !value) continue;
    const reactProperty = property.startsWith("--")
      ? property
      : property.replace(/-([a-z])/g, (_, letter: string) => letter.toUpperCase());
    result[reactProperty] = value;
  }
  return result as CSSProperties;
}

function normalizeAttributes(attrs: Readonly<Record<string, string>>) {
  const props: Record<string, unknown> = {};
  for (const [name, value] of Object.entries(attrs)) {
    if (name.startsWith("on") || name === "data-en") continue;
    if (name === "style") props.style = parseStyle(value);
    else if (name === "hidden") props.hidden = true;
    else props[attributeNames[name] ?? name] = value;
  }
  return props;
}

function renderNode(node: RichNode, key: string): ReactNode {
  if (typeof node === "string") return node;
  if (!allowedTags.has(node.tag)) return null;
  const props = { ...normalizeAttributes(node.attrs), key };
  if (voidTags.has(node.tag)) return createElement(node.tag, props);
  return createElement(
    node.tag,
    props,
    node.children.map((child, index) => renderNode(child, `${key}-${index}`)),
  );
}

export function RichContent({ nodes }: { nodes: readonly RichNode[] }) {
  return nodes.map((node, index) => renderNode(node, String(index)));
}
