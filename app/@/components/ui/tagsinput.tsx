import * as React from "react";
import {Check, ChevronsUpDown, XIcon} from "lucide-react";

import {cn} from "app/@/lib/utils";
import {Button} from "app/@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "app/@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "app/@/components/ui/popover";
import invariant from "tiny-invariant";

type Tag = {label: string; value: any};

type Props = {
  options: Tag[];
  onChange: (selected: Tag[]) => void;
};

export function TagsInput(props: Props) {
  const [open, setOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const [tags, setTags] = React.useState<Tag[]>([]);

  const removeTag = (tag: Tag) => {
    setTags((prev) => prev.filter((t) => t.value !== tag.value));
  };

  const addTag = (tag: Tag) => {
    setTags((prev) => [...prev, tag]);
  };

  const handleSelect = (value: string) => {
    const tag = props.options.find((x) => x.value === value);
    if (!tag) return;

    const alreadySelectedTag = tags.find((x) => x.value === value);

    alreadySelectedTag ? removeTag(tag) : addTag(tag);
  };

  const handleTagClick = (tag: Tag) => {
    const alreadySelectedTag = tags.find((x) => x.value === tag.value);
    if (!alreadySelectedTag) return;

    removeTag(alreadySelectedTag);
  };

  React.useEffect(() => {
    props.onChange(tags);
  }, [tags]);

  return (
    <div className="flex flex-col gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="justify-between"
          >
            Add skills...
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="top">
          <Command className="max-h-52">
            <CommandInput
              placeholder="Search..."
              onValueChange={setSearchValue}
              value={searchValue}
            />
            <CommandEmpty>No entries found</CommandEmpty>
            <CommandGroup>
              {props.options.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={handleSelect}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      tags.map((t) => t.value).includes(item.value)
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      <ul className="flex items-center flex-wrap p-1 gap-1 text-sm">
        {tags.map((tag) => (
          <li
            key={tag.value}
            className="bg-green-100 text-green-600 border-green-300 border font-semibold rounded-md outline-none focus:border-zinc-300"
          >
            <button
              type="button"
              className="flex items-center gap-1 px-2 py-0.5"
              onClick={() => handleTagClick(tag)}
            >
              {tag.label}
              <XIcon className="w-4 h-4" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
