import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Nav } from "./nav";
import { links, links2 } from "./data";
import { Menu } from "lucide-react";

export function CustomDrawer() {
  return (
    <Drawer direction="left">
      <DrawerTrigger>
        <Menu />
      </DrawerTrigger>
      <DrawerContent>
        <Nav links={links} />
        <Nav links={links2} />
      </DrawerContent>
    </Drawer>
  );
}
