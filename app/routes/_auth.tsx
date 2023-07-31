import { Outlet } from "@remix-run/react";

export default function AuthLayout() {
  return (
    <div className="flex flex-col w-full h-full">
      <header className="flex items-center px-4 py-2 h-20 bg-white border-b shadow-sm">
        <h1 className="text-lg font-extrabold first-letter:text-2xl">
          SoloTrack
        </h1>
      </header>
      <main className="grow">
        <Outlet />
      </main>
    </div>
  );
}
