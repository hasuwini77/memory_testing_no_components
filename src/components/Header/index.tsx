import Image from "next/image";
import logo from "/public/logo.png";

const Header = () => {
  return (
    <div>
      <Image src={logo} alt="logo" width={50} height={50} priority />
      <h1 className="text-2xl bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 text-transparent bg-clip-text [text-shadow:0_0_2px_rgba(0,0,0,0.1)]">
        Memorista
      </h1>
    </div>
  );
};

export default Header;
