import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { ModeToggle } from "./ThemeToggle";

const NavBar = () => {
  return (
    <div className="flex justify-between items-center w-[90%] mx-auto py-10">
      {/* logo */}
      <div>
        <Link href="/">
          {" "}
          <Image
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
            src="/next.svg"
            alt="Next.js Logo"
            width={100}
            height={20}
            priority
          />
        </Link>
      </div>
      {/* buttons */}
      <div className="flex items-center gap-3">
        <ModeToggle />
        <Link href="register">
          <Button>Register</Button>
        </Link>
        <Link href="movies">
          <Button>Movies</Button>
        </Link>
        <Link href="people">
          <Button>Table</Button>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
