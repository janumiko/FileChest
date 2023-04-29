import {useLocation} from "react-router-dom";

export default function Breadcrumbs() {
    const location = useLocation();

    const crumbs = location.pathname.split("/")
        .filter((crumb) => crumb !== "")


    console.log('crumbs', crumbs);

    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
            {crumbs.map((crumb, index) => {
                const routeTo = `/${crumbs.slice(0, index + 1).join("/")}`;
                const isLast = index === crumbs.length - 1;
                return isLast ? (
                    <li key={crumb} className="breadcrumb-item active" aria-current="page">{crumb}</li>
                ) : (
                    <li key={crumb} className="breadcrumb-item">
                        <a href={routeTo}>{crumb}</a>
                    </li>
                );
            })}
            </ol>
        </nav>
    );
}