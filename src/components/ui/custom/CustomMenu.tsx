import { NavigationMenuItem, NavigationMenuLink } from "@radix-ui/react-navigation-menu"
import { Link, useLocation } from "react-router"
import { NavigationMenu, NavigationMenuList } from "../navigation-menu"
import { cn } from "@/lib/utils";
// import { NavigationMenu } from "../navigation-menu"

export const CustomMenu = () => {
    //Donde me ubico actualmente en el URL
    const { pathname } = useLocation();
    
    const isActive = (path: string) => {
        return pathname === path;
    }
    
    return (
        <NavigationMenu className="py-5">
            <NavigationMenuList>
                {/* Home */}
                <NavigationMenuItem>
                    <NavigationMenuLink asChild className= { cn( isActive('/') && "bg-slate-200 ", "p-2 rounded-md")}>
                        <Link to="/">Inicio</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Search */}
                <NavigationMenuItem>
                    <NavigationMenuLink asChild className= { cn( isActive('/search') && "bg-slate-200", "p-2 rounded-md")}>
                        <Link to="/search">Buscar superhéroes</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

            </NavigationMenuList>       
        </NavigationMenu>
    );
};
