import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function Layout({ children }) {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="main-section">
        <Topbar />
        <div className="content-area">
          {children}
        </div>
      </div>
    </div>
  );
}