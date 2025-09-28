import Header from "./Header";
import BottomInputBar from "./BottomInputBar";

const Layout = ({ children, showHeader = true, showInput = true }) => {
  return (
    <div>
      {showHeader && <Header />}
      <div>{children}</div>
      {showInput && <BottomInputBar />}
    </div>
  );
};

export default Layout;
