import React, { useState } from 'react'
import "./Pagination.css";

function Pagination({data,itemsPerPage,handlePageChange}) {
    const [currentPage,setCurrentPage] = useState(1)
    const totalPages = Math.ceil(data.length/itemsPerPage);
    
    const handleClick = (page) =>{
        setCurrentPage(page)
        handlePageChange(page);
    }

    const renderPaginationItems = () => {
        const paginationItems = [];
        for(let i = 1; i<= totalPages ; i++){
            paginationItems.push(
                <li
                className={i===currentPage?'active':''} 
                onClick={()=>{handleClick(i)}}
                >
                    {i}
                </li>
            )
        }
        return paginationItems;
    }
  return (
    <div className='pagination-tool'>
        <ul>
            {renderPaginationItems()}
        </ul>
    </div>
  )
}

export default Pagination