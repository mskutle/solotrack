import { Link } from "@react-pdf/renderer";
import Linkify from "linkify-react";
import type { IntermediateRepresentation } from "linkifyjs";
import type { ReactNode } from "react";

type Props = {
  target?: "web" | "pdf";
  children: ReactNode;
};

export function Linkifyer(props: Props) {
  const { target = "web" } = props;
  switch (target) {
    case "web":
      return (
        <Linkify options={{ render: WebLinkRenderer }}>
          {props.children}
        </Linkify>
      );
    case "pdf":
      return (
        <Linkify options={{ render: PdfLinkRenderer }}>
          {props.children}
        </Linkify>
      );
    default:
      throw new Error("no renderer for that target");
  }
}

const WebLinkRenderer = (props: IntermediateRepresentation) => {
  const { attributes, content } = props;
  const { href, ...rest } = attributes;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-blue-700 hover:underline"
      {...rest}
    >
      {content}
    </a>
  );
};

const PdfLinkRenderer = (props: IntermediateRepresentation) => {
  const { attributes, content } = props;
  const { href, ...rest } = attributes;

  return (
    <Link src={href} {...rest}>
      {content}
    </Link>
  );
};
