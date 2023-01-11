import Link from 'next/link'
import React from 'react'
import JobItem from './job/JobItem'
import { useRouter } from 'next/router'
import Pagination from 'react-js-pagination'
import Filters from './layout/Filters'


const Home = ({data}) => {

  const { jobs, count, resPerPage } = data

  const router = useRouter();

  const { page = 1, keyword } = router.query;
 
  const active_page_number = Number(page); // convert string to number for passing in pagtion active property

  let queryParams;
   
  if(typeof window !== 'undefined') {
    queryParams = new URLSearchParams(window.location.search);
  }

  const handlePageClick = (currentPage) => {

    if (queryParams.has('page')) {
      queryParams.set('page', currentPage);
    } else {
      queryParams.append('page', currentPage);
    }

    router.push({
      search: queryParams.toString(),
    })
  }
  return (
    <div className="container container-fluid">
        <div className="row">
          <div className="col-xl-3 col-lg-4"><Filters /> </div>

          <div className="col-xl-9 col-lg-8 content-left-offset">
            <div className="my-5">
              <h4 className="page-title text-white">
                {keyword ? `${jobs.length} Search Results for "${keyword}"` : "Latest Jobs"}
              </h4>
              <Link href="/stats">
                <button className="btn float-right stats_btn">
                  Get Topic stats
                </button>
              </Link>
              <div className="d-block ">
                <Link href="/search" className='text-white'>Go to Search</Link>
              </div>
            </div>
            {/* if jobs exits */}
            {jobs && jobs.map((job) => <JobItem key={job.id} job={job}/>)}

            {resPerPage <= count && (
              <div className="d-flex justify-content-center mt-5">
                <Pagination 
                activePage={active_page_number}
                itemsCountPerPage={resPerPage}
                totalItemsCount={count}
                onChange={handlePageClick}
                nextPageText={'Next'}
                prevPageText={'Prev'}
                firstPageText={'First'}
                lastPageText={'Last'}
                itemClass="page-item"
                linkClass="page-link"
              />
              </div>
            )}
          </div>
        </div>
      </div>
  )
}

export default Home