import {Link, useLocation} from "react-router-dom";

export default function Breadcrumbs() {
    const location = useLocation();

    const crumbs = location.pathname.split("/")
        .filter((crumb) => crumb !== "")

    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                {crumbs.map((crumb, index) => {
                    const routeTo = `/${crumbs.slice(0, index + 1).join("/")}`;
                    const isLast = index === crumbs.length - 1;
                    return isLast ? (
                        <li key={crumb} className="breadcrumb-item active" aria-current="page">{decodeURI(crumb)}</li>
                    ) : (
                        <li key={crumb} className="breadcrumb-item">
                            <Link to={routeTo}>{decodeURI(crumb)}</Link>
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}