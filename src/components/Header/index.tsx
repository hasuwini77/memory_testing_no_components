import Image from "next/image";
import logo from "/public/logo.png";

const Header = () => {
  return (
    <div>
      <Image src={logo} alt="logo" width={50} height={50} />
      <h1>Memorista</h1>
    </div>
  );
};

export default Header;
