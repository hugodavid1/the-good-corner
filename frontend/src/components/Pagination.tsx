import React from "react";

export type PaginationProps = {
  page: number;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  pagesCount: number;
};

const Pagination: React.FC<PaginationProps> = ({
  setPage,
  page,
  setPageSize,
  pagesCount,
}) => {
  return (
    <div className="flex justify-between">
      <button
        type="button"
        onClick={() => setPage(Math.max(page - 1, 0))}
        className="text-xs text-white bg-yellow-500
           hover:bg-yellow-700 focus:ring-4 focus:outline-none
            focus:ring-blue-300 font-medium rounded-lg 
            p-2 py=1 text-center inline-flex items-center me-2
             dark:bg-blue-600 dark:hover:bg-blue-700
              dark:focus:ring-blue-800"
      >
        <svg
          className="w-3 h-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 5H1m0 0l4-4m-4 4l4 4"
          />
        </svg>
      </button>
      <div>
        <button
          onClick={() => setPageSize(5)}
          disabled={page === 0}
          className={`hover:bg-yellow-500 text-black font-bold py-1 px-3 rounded-full border-2 border-yellow-500`}
        >
          5
        </button>
        <button
          onClick={() => setPageSize(10)}
          className={`hover:bg-yellow-500 text-black font-bold py-1 px-3 rounded-full  border-2 border-yellow-500`}
        >
          10
        </button>
      </div>

      <button
        type="button"
        disabled={page === pagesCount - 1}
        onClick={() => setPage(Math.min(page + 1, pagesCount))}
        className="text-xs text-white bg-yellow-500 hover:bg-yellow-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2 py=1 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <svg
          className="w-3 h-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
        <span className="sr-only">Icon description</span>
      </button>
    </div>
  );
};

export default Pagination;
