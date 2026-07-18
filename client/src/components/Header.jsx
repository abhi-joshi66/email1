import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const auth = useSelector((state) => state.auth);
  const renderContent = () => {
    switch (auth) {
      case null:
        return;
      // return (
      //   <li>
      //     <a href="/auth/google">Login With Google</a>
      //   </li>
      // );

      case false:
        return (
          <li>
            <a href="/auth/google">Login With Google</a>
          </li>
        );
      default:
        return (
          <li>
            <a href="/api/logout">Logout</a>
          </li>
        );
    }
  };
  console.log("auth", auth);
  return (
    <nav>
      <div className="nav-wrapper">
        <Link to={auth ? "/surveys" : "/"} className="left brand-logo">
          Email Project
        </Link>
        <ul className="right">{renderContent()}</ul>
      </div>
    </nav>
  );
};

export default Header;
