import React from "react";

const Header: React.FC = () => {
  return (
    <header className="h-12 mb-3">
      <div className="text-[20px] text-main-white h-12 animate-loginLoad font-bold justify-center fixed bg-cart-bg-dark w-full inline-flex items-center">
        TR-English
      </div>
    </header>
  );
};

export default Header;
