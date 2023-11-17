import type {User} from "@prisma/client";
import {DropdownMenu} from "@radix-ui/react-dropdown-menu";
import type {SerializeFrom} from "@remix-run/node";
import {NavLink, useNavigate} from "@remix-run/react";
import {
  Award,
  Briefcase,
  GanttChartSquare,
  Home,
  LogOut,
  PersonStanding,
  Scroll,
  User as UserIcon,
} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "~/@/components/ui/avatar";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/@/components/ui/dropdown-menu";
import {cn} from "~/@/lib/utils";

type Props = {
  user: SerializeFrom<User>;
};

export function MainNavigation(props: Props) {
  const navigate = useNavigate();
  return (
    <nav className="flex flex-col bg-zinc-50 z-10 p-b absolute top-0 left-0 bottom-0 lg:z-auto lg:static border-r text-sm shrink-0">
      <header className="p-4 text-center text-lg font-extrabold first-letter:text-2xl">
        SoloTrack
      </header>
      <ul className="flex flex-col grow px-3 gap-1">
        <li>
          <NavLink
            to="/dashboard"
            className={({isActive}) =>
              cn(
                "flex items-center gap-4 px-2 py-[5px] rounded-md",
                isActive ? "bg-black text-white" : "hover:bg-stone-200"
              )
            }
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/projects"
            className={({isActive}) =>
              cn(
                "flex items-center gap-4 px-2 py-[5px] rounded-md",
                isActive ? "bg-black text-white" : "hover:bg-stone-200"
              )
            }
          >
            <GanttChartSquare className="w-4 h-4" />
            <span>Projects</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/clients"
            className={({isActive}) =>
              cn(
                "flex items-center gap-4 px-2 py-[5px] rounded-md",
                isActive ? "bg-black text-white" : "hover:bg-stone-200"
              )
            }
          >
            <Briefcase className="w-4 h-4" />
            <span>Clients</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/courses-and-certifications"
            className={({isActive}) =>
              cn(
                "flex items-center gap-4 px-2 py-[5px] rounded-md",
                isActive ? "bg-black text-white" : "hover:bg-stone-200"
              )
            }
          >
            <Award className="w-4 h-4" />
            <span className="whitespace-nowrap">Courses & Certifications</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/cv"
            className={({isActive}) =>
              cn(
                "flex items-center gap-4 px-2 py-[5px] rounded-md",
                isActive ? "bg-black text-white" : "hover:bg-stone-200"
              )
            }
          >
            <Scroll className="w-4 h-4" />
            <span className="whitespace-nowrap">CV</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/profile"
            className={({isActive}) =>
              cn(
                "flex items-center gap-4 px-2 py-[5px] rounded-md",
                isActive ? "bg-black text-white" : "hover:bg-stone-200"
              )
            }
          >
            <UserIcon className="w-4 h-4" />
            <span>Profile</span>
          </NavLink>
        </li>
      </ul>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex justify-center items-center gap-2 mt-auto p-3 rounded-md hover:bg-zinc-200 mx-2 mb-3">
            <Avatar>
              <AvatarImage
                src={props.user.photoUrl}
                alt={props.user.firstName}
              />
              <AvatarFallback className="uppercase">
                {props.user.firstName[0]}
                {props.user.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex items-start flex-col">
              <span>
                {props.user.firstName} {props.user.lastName}
              </span>
              <span className="text-xs text-gray-500">{props.user.email}</span>
            </div>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-32">
          <DropdownMenuItem
            className="flex items-center gap-4"
            onSelect={() => navigate("/logout")}
          >
            <LogOut className="w-4 h-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}
