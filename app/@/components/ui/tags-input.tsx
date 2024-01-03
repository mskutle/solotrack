import * as React from "react";
import {cn} from "app/@/lib/utils";
import {Cross, CrossIcon, X, XCircle} from "lucide-react";

type Props = {};

export const TagsInput = (props: Props) => {
  const [value, setValue] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [tags, setTags] = React.useState<string[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key.toLowerCase()) {
      case "enter":
        handleEnterPress(e);
        break;
      case "backspace":
        handleBackspacePress(e);
        break;
    }
  };

  const handleBackspacePress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (value !== "") return;

    setTags((prev) => prev.filter((tag, i) => i !== tags.length - 1));
  };

  const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    setTags((prev) => [...prev, value]);
    setValue("");
  };

  const handleTagClick = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
    inputRef.current?.focus();
  };

  return (
    <div className="flex min-h-10 gap-1 flex-wrap rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:ring-offset-zinc-950 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-800">
      <ul className="flex flex-wrap items-center gap-1">
        {tags.map((tag) => (
          <li key={tag}>
            <button
              type="button"
              onClick={() => handleTagClick(tag)}
              className="gap-1 w-fit text-xs bg-zinc-900 whitespace-nowrap text-white flex items-center justify-center py-0.5 px-1 rounded-md"
            >
              <span>{tag}</span>
              <X className="w-4 h-4" />
            </button>
          </li>
        ))}
      </ul>
      <input
        ref={inputRef}
        placeholder="Add a tag"
        type="text"
        className="border-0 focus:outline-none grow shrink"
        onKeyDown={handleKeyDown}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};
