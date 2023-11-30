import React from "react";

export type PaginationProps = {
    currentPage: number;
    pageSize: number;
    totalAds?: number;
};

const Pagination: React.FC<PaginationProps> = ({ pageSize, currentPage, totalAds }) => {

    const totalPages = totalAds !== undefined ? Math.ceil(totalAds / pageSize) : 0;

    return (
        <>
            <nav aria-label="Page navigation example">
                <ul className="inline-flex -space-x-px text-sm">
                    <li>
                        <a href="#"
                           className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Précédent</a>
                    </li>
                    <li>
                        <a href="#"
                           className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                    </li>
                    <li>
                        <a href="#"
                           className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
                    </li>
                </ul>
            </nav>
        </>
    );
}

export default Pagination;
