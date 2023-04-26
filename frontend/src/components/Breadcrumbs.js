import {useLocation} from "react-router-dom";
import Breadcrumb from 'react-bootstrap/Breadcrumb';

export default function BreadCrumbs() {
    const location = useLocation();

    const crumbs = location.pathname.split("/")
        .filter((crumb) => crumb !== "")


    console.log('crumbs', crumbs);

    return (
        <Breadcrumb>
            {crumbs.map((crumb, index) => {
                const routeTo = `/${crumbs.slice(0, index + 1).join("/")}`;
                const isLast = index === crumbs.length - 1;
                return isLast ? (
                    <Breadcrumb.Item active>{crumb}</Breadcrumb.Item>
                ) : (
                    <Breadcrumb.Item href={routeTo}>{crumb}</Breadcrumb.Item>
                );
            })}
        </Breadcrumb>
    );
}