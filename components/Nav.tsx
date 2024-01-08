import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

const NavBar = () => {
  return (
    <div className="flex justify-between items-center w-[90%] mx-auto py-10">
      {/* logo */}
      <div>
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={100}
          height={20}
          priority
        />
      </div>
      {/* buttons */}
      <div>
        <Link href="table">
          {" "}
          <Button>Table</Button>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
