import Image from "next/image";
import logo from "/public/logo.png";
import MyFish from "@/components/newFishIcon";

const Header = () => {
  return (
    <div className="flex flex-col justify-between align-center">
      <Image src={logo} alt="logo" width={50} height={50} priority hidden />
      <MyFish />
      <h1 className="text-center text-2xl bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 text-transparent bg-clip-text [text-shadow:0_0_2px_rgba(0,0,0,0.1)]">
        Memorista
      </h1>
    </div>
  );
};

export default Header;
