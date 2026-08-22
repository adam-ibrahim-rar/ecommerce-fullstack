import * as FiIcons from "react-icons/fi";
import * as TbIcons from "react-icons/tb";
import * as LuIcons from "react-icons/lu";
import * as MdIcons from "react-icons/md";
import * as GiIcons from "react-icons/gi";

import type { IconType } from "react-icons";

export interface IconItem {
  name: string;
  icon: IconType;
}

const icons = {
  ...FiIcons,
  ...TbIcons,
  ...LuIcons,
  ...MdIcons,
  ...GiIcons,
};

export const iconList: IconItem[] = Object.entries(icons)
  .filter(
    ([name, icon]) =>
      typeof icon === "function" &&
      name !== "IconContext"
  )
  .map(([name, icon]) => ({
    name,
    icon: icon as IconType,
  }))
  .sort((a, b) =>
    a.name.localeCompare(b.name)
  );