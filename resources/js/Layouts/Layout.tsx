import { PropsWithChildren } from "react";
import { Link, usePage } from "@inertiajs/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/Avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/Popover";
import { Button } from "@/Components/Button";
import NavLink from "@/Components/NavLink";

const Layout = ({ children }: PropsWithChildren) => {
    const user = usePage().props.auth.user;

    return (
        <div>
            <header className="shadow-sm">
                <div className="container mx-auto py-6 flex justify-between items-center">
                    <div className="flex items-center space-x-6">
                        <h1 className="text-2xl font-medium">
                            Another Blog Site
                        </h1>
                        <nav>
                            <NavLink
                                href={route("home")}
                                active={route().current("home")}
                            >
                                Home
                            </NavLink>
                        </nav>
                    </div>
                    <Popover>
                        <PopoverTrigger>
                            <Avatar>
                                <AvatarImage src="" />
                                <AvatarFallback>
                                    {user.name[0].toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                        </PopoverTrigger>
                        <PopoverContent className="w-fit p-1">
                            <Button variant="ghost" size="sm" asChild>
                                <Link href={route("logout")} method="post">
                                    Sign Out
                                </Link>
                            </Button>
                        </PopoverContent>
                    </Popover>
                </div>
            </header>
            <main>{children}</main>
        </div>
    );
};

export default Layout;
