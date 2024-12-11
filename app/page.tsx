import { ModeToggle } from "./ui/ModeToggle/ModeToggle";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Home() {
  return (
    <>
      {/* Contenedor principal */}
      <div className="flex flex-col min-h-screen w-full">
        {/* Contenedor superior */}
        

        {/* Contenido central */}
        <div className="flex flex-1 items-center justify-center">
          <p className="text-xl font-semibold text-gray-800">Welcome to the Home Page</p>
        </div>
      </div>
    </>
  );
}
