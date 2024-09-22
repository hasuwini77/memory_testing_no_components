// import MyFish from "@/components/newFishIcon";

const Header = () => {
  return (
    <div className="flex flex-col justify-between align-center">
      <img src="/logo.png" alt="logo" width={100} height={100} />
      {/* <MyFish /> */}
      <h1 className="text-center text-4xl p-4 bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 text-transparent bg-clip-text [text-shadow:0_0_2px_rgba(0,0,0,0.1)]">
        Memorista
      </h1>
    </div>
  );
};

export default Header;
