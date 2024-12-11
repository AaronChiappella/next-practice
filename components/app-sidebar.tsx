import { 
  Home, 
  Users, 
  Factory, 
  File, 
  Settings, 
  Plus,
  UserRoundX,
  BookUser,
  UserRoundPen,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem
} from "@/components/ui/sidebar";

import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent
} from "@/components/ui/collapsible";

// Menu items
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
    options: [],
  },
  {
    title: "Usuarios",
    url: "/users",
    icon: Users,
    options: [
      {
        title: "Listado",
        url: "/users/list",
        icon: BookUser,
      },
      {
        title: "Añadir",
        url: "/users/create",
        icon: Plus,
      },
      
      {
        title: "Modificar",
        url: "/users/delete",
        icon: UserRoundPen,
      },
      {
        title: "ELiminar",
        url: "/users/delete",
        icon: UserRoundX,
      },
     
    ],
  },
  {
    title: "Ordenes",
    url: "#",
    icon: File,
    options: [],
  },
  {
    title: "Sectores",
    url: "#",
    icon: Factory,
    options: [],
  },
  {
    title: "Ajustes",
    url: "#",
    icon: Settings,
    options: [],
  },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Gestión Comercial</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.options && item.options.length > 0 ? (
                    <Collapsible defaultOpen={false} className="group/collapsible">
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton className="flex items-center justify-between">
                          <div className="flex items-center">
                            <item.icon />

                            <a href={item.url} className="flex items-center">
                            <span className="ml-2">{item.title}</span>
                            </a>  
                          
                          </div>
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.options.map((option) => (
                            <SidebarMenuSubItem key={option.title}>
                              <SidebarMenuButton asChild>
                                <a href={option.url} className="flex items-center">
                                  <option.icon />
                                  <span className="ml-2">{option.title}</span>
                                </a>
                              </SidebarMenuButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton asChild>
                      <a href={item.url} className="flex items-center">
                        <item.icon />
                        <span className="ml-2">{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
