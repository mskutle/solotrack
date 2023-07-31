import { ScrollArea } from "~/@/components/ui/scroll-area";
import type { ReactNode } from "react";
import { cn } from "~/@/lib/utils";

type Props = {
  children: ReactNode;
};

type HeaderProps = {
  children: ReactNode;
  color?: "white" | "gray";
};

type MasterProps = {
  children: ReactNode;
};

type ListItemProps = {
  highlight?: boolean;
  children: ReactNode;
};

type ListItemHeadingProps = {
  children: ReactNode;
  highlight?: boolean;
};

type DetailContentProps = {
  children: ReactNode;
};

export const MasterDetail = (props: Props) => {
  return (
    <div className="h-full w-full grid grid-cols-[minmax(275px,380px)auto] grow">
      {props.children}
    </div>
  );
};

const Master = (props: MasterProps) => (
  <ScrollArea className="border-r max-h-screen bg-zinc-50">
    {props.children}
  </ScrollArea>
);

const List = (props: Props) => (
  <nav className="h-full">
    <ul className="flex flex-col px-3 gap-1 text-sm py-2">{props.children}</ul>
  </nav>
);

const ListItem = (props: ListItemProps) => (
  <li
    className={cn(
      "px-3 py-2 rounded-md w-full block",
      props.highlight ? "bg-black text-white" : "hover:bg-stone-200"
    )}
  >
    <div className="flex flex-col grow">{props.children}</div>
  </li>
);

const Header = (props: HeaderProps) => {
  const { color = "gray" } = props;
  return (
    <header
      className={cn(
        color === "gray" && "bg-zinc-50",
        color === "white" && "bg-white",
        "flex items-center justify-between py-1 h-16 px-3 border-b shadow-sm font-semibold sticky top-0"
      )}
    >
      {props.children}
    </header>
  );
};

const Detail = (props: Props) => (
  <div className="flex flex-col">{props.children}</div>
);

const DetailContent = (props: DetailContentProps) => {
  const { children } = props;
  return <main className={cn("w-full grow")}>{children}</main>;
};

const ListItemHeading = (props: Props) => (
  <span className="font-semibold">{props.children}</span>
);

const ListItemDescription = (props: ListItemHeadingProps) => (
  <p
    className={cn(
      "text-xs whitespace-pre-wrap line-clamp-2",
      props.highlight ? "text-stone-300" : "text-gray-600"
    )}
  >
    {props.children}
  </p>
);

MasterDetail.Master = Master;
MasterDetail.MasterHeader = Header;
MasterDetail.MasterList = List;
MasterDetail.MasterListItem = ListItem;

ListItem.Heading = ListItemHeading;
ListItem.Description = ListItemDescription;

MasterDetail.Detail = Detail;
MasterDetail.DetailHeader = Header;
MasterDetail.DetailContent = DetailContent;
