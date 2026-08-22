import { useMemo, useState } from "react";

import { FiSearch, FiCheck } from "react-icons/fi";

import { iconList } from "../data/icon-list";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

interface IconPickerProps {
  value?: string;
  onChange: (value: string) => void;
}

export default function IconPicker({
  value,
  onChange,
}: IconPickerProps) {
  const [search, setSearch] = useState("");

 const filteredIcons = useMemo(() => {
  const query = search.trim().toLowerCase();

  if (query.length < 2) {
    return [];
  }

  return iconList
    .filter((item) =>
      item.name
        .replace(/^(Fi|Tb|Lu|Md|Gi)/, "")
        .toLowerCase()
        .includes(query)
    )
    .slice(0, 40);
}, [search]);

  const selected = iconList.find(
    (item) => item.name === value
  );

  return (
    <div className="space-y-4">

      {/* Preview */}

      <div className="rounded-xl border p-4 flex items-center gap-4">

        <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-muted">

          {selected ? (
            <selected.icon size={30} />
          ) : (
            <span className="text-xs text-muted-foreground">
              None
            </span>
          )}

        </div>

        <div>

          <p className="font-medium">
            Selected Icon
          </p>

          <p className="text-sm text-muted-foreground">

            {selected
              ? selected.name
              : "No icon selected"}

          </p>

        </div>

      </div>

      {/* Search */}

      <div className="relative">

        <FiSearch
          className="absolute left-3 top-1/2 -translate-y-1/2"
        />

        <Input
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search icons..."
          className="pl-10"
        />

      </div>

      {/* Grid */}

    <div
  className="
    rounded-xl
    border
    p-4
    max-h-[350px]
    overflow-y-auto
  "
>
  {search.trim().length < 2 ? (
    <div className="flex h-40 items-center justify-center text-sm text-muted-foreground">
      Type at least 2 characters to search...
    </div>
  ) : filteredIcons.length === 0 ? (
    <div className="flex h-40 items-center justify-center text-sm text-muted-foreground">
      No icons found.
    </div>
  ) : (
    <div className="grid grid-cols-4 gap-3">
      {filteredIcons.map((item) => {
        const Icon = item.icon;

        const active = value === item.name;

        return (
          <Button
            key={item.name}
            type="button"
            variant={active ? "default" : "outline"}
            onClick={() => onChange(item.name)}
            className="
              relative
              h-24
              flex-col
              gap-2
            "
          >
            {active && (
              <FiCheck
                className="
                  absolute
                  right-2
                  top-2
                "
              />
            )}

            <Icon size={28} />

            <span className="line-clamp-1 text-[11px]">
              {item.name.slice(2)}
            </span>
          </Button>
        );
      })}
    </div>
  )}
</div>

    </div>
  );
}