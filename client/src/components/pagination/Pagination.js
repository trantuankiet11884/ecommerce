import usePagination from "hooks/usePagination";
import PaginationItem from "./PaginationItem";
import { useSearchParams } from "react-router-dom";

const Pagination = ({ totalCount }) => {
  const [params] = useSearchParams();
  const pagination = usePagination(totalCount, +params.get("page") || 1);

  const range = () => {
    const currentPage = +params.get("page");
    const pageSize = +process.env.REACT_APP_LIMIT || 10;
    const s = Math.min((currentPage - 1) * pageSize + 1, totalCount);
    const e = Math.min(currentPage * pageSize, totalCount);
    return `${s} - ${e}`;
  };
  return (
    <div className="w-full flex justify-between items-center">
      {!+params.get("page") ? (
        <span className="text-sm font-semibold">{`Show Products ${Math.min(
          totalCount,
          1
        )} - ${Math.min(
          +process.env.REACT_APP_LIMIT,
          totalCount
        )} of ${totalCount}`}</span>
      ) : (
        ""
      )}
      {+params.get("page") ? (
        <span className="text-sm font-semibold">{`Show Products  ${range()} of ${totalCount}`}</span>
      ) : (
        ""
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
