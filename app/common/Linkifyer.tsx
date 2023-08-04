import Linkify from "linkify-react";
import type { IntermediateRepresentation } from "linkifyjs";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const LinkRenderer = (props: IntermediateRepresentation) => {
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

export function Linkifyer(props: Props) {
  return <Linkify options={{ render: LinkRenderer }}>{props.children}</Linkify>;
}
