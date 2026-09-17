import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"

import Link from "next/link"

const MainNavigation = () => {
  return (
    <NavigationMenu className="hidden sm:flex">
      <NavigationMenuList className="gap-1">
        <NavigationMenuItem>
          <NavigationMenuLink
            render={<Link href="/" />}
            className="rounded-full px-3 py-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
          >
            Dashboard
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink
            render={<Link href="/issues" />}
            className="rounded-full px-3 py-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
          >
            Issues
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink
            render={<Link href="/projects" />}
            className="rounded-full px-3 py-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
          >
            Projects
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default MainNavigation
