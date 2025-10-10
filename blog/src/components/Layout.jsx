import Header from "./Header";
import Sidebar from "./Sidebar";
import BottomInputBar from "./BottomInputBar";

const Layout = ({ children, showHeader = true, showSidebar = true, showInput = true }) => {
  return (
    <div className="min-h-screen flex flex-col">

      {showHeader && <Header />}

      <div className="flex flex-1 overflow-hidden">
        {showSidebar && (
          <aside className="w-60 flex-shrink-0">
            <Sidebar />
          </aside>
        )}

        {/* Main Content (children) */}
        <main className="flex-1 overflow-y-auto ">
          {children}
        </main>
      </div>

      {showInput && <BottomInputBar />}
    </div>
  );
};

export default Layout;
