import { Link, useLocation } from "react-router-dom";

const NavItem = ({ path, children }: any) => {
  const location = useLocation(); // ✅ inside component

  const isActive = (path: string) => location.pathname === path;

  const navItemClass = (path: string) =>
    `text-base font-medium transition-colors relative ${
      isActive(path)
        ? "text-[#4A90E2]"
        : "text-black hover:text-[#4A90E2]"
    }`;

  return (
    <div className="relative">
      <Link to={path} className={navItemClass(path)}>
        {children}
      </Link>

      {isActive(path) && (
        <div className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-gradient-to-r from-[#4A90E2] to-[#6FCF97]" />
      )}
    </div>
  );
};

export { NavItem };
