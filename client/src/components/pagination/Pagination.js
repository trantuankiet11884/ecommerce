import usePagination from "hooks/usePagination";
import PaginationItem from "./PaginationItem";
import { useSearchParams } from "react-router-dom";

const Pagination = ({ totalCount }) => {
  const [params] = useSearchParams();
  const pagination = usePagination(totalCount, 2);
  const range = () => {
    const currentPage = +params.get("page");
    const pageSize = +process.env.REACT_APP_PRODUCT_LIMIT || 10;
    const s = (currentPage - 1) * pageSize + 1;
    const e = Math.min(currentPage * pageSize, totalCount);
    return `${s} - ${e}`;
  };
  return (
    <div className="w-main flex justify-between items-center">
      {!+params.get("page") && (
        <span className="text-sm font-semibold">{`Show Products 1 - ${
          process.env.REACT_APP_PRODUCT_LIMIT || 10
        } of ${totalCount}`}</span>
      )}
      {+params.get("page") && (
        <span className="text-sm font-semibold">{`Show Products  ${range()} of ${totalCount}`}</span>
      )}
      <div className="flex items-center">
        {pagination?.map((item) => (
          <PaginationItem key={item}>{item}</PaginationItem>
        ))}
      </div>
    </div>
  );
};

export default Pagination;
