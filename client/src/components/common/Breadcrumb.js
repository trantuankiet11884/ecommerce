import React, { memo } from "react";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { Link } from "react-router-dom";
import icons from "utils/icons";

const { IoIosArrowForward } = icons;

const Breadcrumb = ({ title, category }) => {
  const routes = [
    { path: "/:category", breadcrumb: category },
    { path: "/", breadcrumb: "Home" },
    { path: "/:category/:pid/:title", breadcrumb: title },
  ];

  const breadcrumb = useBreadcrumbs(routes);
  return (
    <div className="text-sm flex items-center">
      {breadcrumb
        ?.filter((item) => !item.match.route === false)
        ?.map(({ match, breadcrumb }, index, self) => (
          <Link
            className="flex items-center capitalize"
            key={match.pathname}
            to={match.pathname}
          >
            <span>{breadcrumb}</span>
            {index !== self.length - 1 && <IoIosArrowForward />}
          </Link>
        ))}
    </div>
  );
};

export default memo(Breadcrumb);
