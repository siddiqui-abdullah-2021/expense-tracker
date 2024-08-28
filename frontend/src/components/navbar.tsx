import { NAVITEMS } from "@/constants/index";
import { Loader2, Menu } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  ClerkLoaded,
  ClerkLoading,
  SignOutButton,
  useUser,
} from "@clerk/clerk-react";

export default function Navbar() {
  const { isSignedIn } = useUser();
  return (
    <nav className="sticky top-0 inset-x-0 z-50 flex items-center h-16 px-4 border-b bg-background/60 backdrop-blur-xl transition-all">
      <Link to="/" className="flex items-center gap-2">
        <img
          className="w-8 h-8"
          src="https://raw.githubusercontent.com/Shreyas-29/astra/main/public/icons/icon.png"
        />
        <span className="text-lg font-medium">spendwise</span>
      </Link>
      <div className="ml-auto items-center flex space-x-2">
        {isSignedIn && (
          <div className="hidden md:block">
            {NAVITEMS?.map(({ title, href }) => (
              <Button key={href} asChild variant={"ghost"}>
                <Link to={href}>{title}</Link>
              </Button>
            ))}
          </div>
        )}
        <div>
          <ClerkLoading>
            <Loader2 className="animate-spin w-5 h-5" />
          </ClerkLoading>
          <ClerkLoaded>
            <SignedOut>
              <SignInButton mode="modal" forceRedirectUrl={"/dashboard"}>
                <Button>Sign in</Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </ClerkLoaded>
        </div>
        {isSignedIn && (
          <div className="md:hidden">
            <SidebarDropdownMenu />
          </div>
        )}
      </div>
    </nav>
  );
}

function SidebarDropdownMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          {NAVITEMS.map(({ title, href }) => (
            <DropdownMenuItem key={href} asChild>
              <Link to={href}>{title}</Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <SignOutButton>
          <DropdownMenuItem>Log out</DropdownMenuItem>
        </SignOutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
