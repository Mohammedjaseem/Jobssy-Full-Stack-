import React from 'react'
import { useRouter } from 'next/router';

const Filters = () => {

    const router = useRouter();

    let queryParams;   //typeof used to check if window is defined or not
    if(typeof window !== 'undefined') {
        queryParams = new URLSearchParams(window.location.search);
        // if query params have page then we are deleting it from the query params and set it to 1
        if(queryParams.has('page')) {
            queryParams.delete('page');
            queryParams.set('page', 1);
        }
    }

    // unchekc all checkboxes except the one that is clicked
    function handleClick(checkbox){
        if(typeof window !== 'undefined') {
            const checkboxes = document.getElementsByName(checkbox.name)

            // here we are unchecking all checkboxes except the one that is clicked ( checkbox is the one that is clicked)
            checkboxes.forEach((item) => {
                if(item !== checkbox) item.checked = false
            })

        // here we are checking if the checkbox is checked or not if it is checked then we are adding it to the query params 
        // if it is not checked then we are deleting it from the query params
        if(checkbox.checked === false){
            if(queryParams.has(checkbox.name)){
                queryParams.delete(checkbox.name)
                router.replace({
                    search: queryParams.toString(),
                })
            }

        } else {
            // Set new filter value if it already exists
            if (queryParams.has(checkbox.name)) {
                queryParams.set(checkbox.name, checkbox.value);
            // Append new filter value if it doesn't exist
            } else {
                queryParams.append(checkbox.name, checkbox.value);
            }

            router.replace({
                search: queryParams.toString(),
            })
        }
    }
}

    function checkHandler(checkBoxType, CheckBoxValue){
        if(typeof window !== 'undefined') {
            const value = queryParams.get(checkBoxType)
            if(CheckBoxValue === value) return true;
            else return false;
            
        }
    }

  return (
    <div className="sidebar mt-5 bg-white p-4 rounded">
      <h3>Filters</h3>

      <hr />
      <h5 className="filter-heading mb-3">Job Type</h5>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="jobType"
          id="check1"
          value="Permanent"
          defaultChecked={checkHandler("jobType", "Permanent")}
          onClick={(e) => handleClick(e.target)}
        />
        <label className="form-check-label" htmlFor="check1">
          Permanent
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="jobType"
          id="check2"
          value="Temporary"
          defaultChecked={checkHandler("jobType", "Temporary")}
          onClick={(e) => handleClick(e.target)}

        />
        <label className="form-check-label" htmlFor="check2">
          Temporary
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="jobType"
          id="check3"
          value="Intenrship"
          defaultChecked={checkHandler("jobType", "Intenrship")}
          onClick={(e) => handleClick(e.target)}


        />
        <label className="form-check-label" htmlFor="check3">
          Internship
        </label>
      </div>

      <hr />
      <h5 className="mb-3">Education</h5>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="education"
          id="check4"
          value="Bachelors"
          defaultChecked={checkHandler("education", "Bachelors")}
          onClick={(e) => handleClick(e.target)}


        />
        <label className="form-check-label" htmlFor="check4">
          Bachelors
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="education"
          id="check5"
          value="Master"
          defaultChecked={checkHandler("education", "Master")}
          onClick={(e) => handleClick(e.target)}


        />
        <label className="form-check-label" htmlFor="check5">
          Masters
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="education"
          id="check6"
          value="Phd"
          defaultChecked={checkHandler("education", "Phd")}
          onClick={(e) => handleClick(e.target)}


        />
        <label className="form-check-label" htmlFor="check6">
          Phd
        </label>
      </div>

      <hr />

      <h5 className="mb-3">Experience</h5>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="experience"
          id="check7"
          value="No Experience"
          defaultChecked={checkHandler("experience", "No Experience")}
          onClick={(e) => handleClick(e.target)}


        />
        <label className="form-check-label" htmlFor="check7">
          No Experience
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="experience"
          id="check8"
          value="1 Year"
          defaultChecked={checkHandler("experience", "1 Year")}
          onClick={(e) => handleClick(e.target)}


        />
        <label className="form-check-label" htmlFor="check8">
          1 Years
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="experience"
          id="check9"
          value="2 Years"
          defaultChecked={checkHandler("experience", "2 Years")}
          onClick={(e) => handleClick(e.target)}


        />
        <label className="form-check-label" htmlFor="check9">
          2 Years
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="experience"
          id="check10"
          value="3 Years Plus"
          defaultChecked={checkHandler("experience", "3 Years Plus")}
          onClick={(e) => handleClick(e.target)}


        />
        <label className="form-check-label" htmlFor="check10">
          3 Year+
        </label>
      </div>

      <hr />
      <h5 className="mb-3">Salary Range</h5>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="salary"
          id="check11"
          value="1-50000"
          defaultChecked={checkHandler("salary", "1-50000")}
          onClick={(e) => handleClick(e.target)}


        />
        <label className="form-check-label" htmlFor="check11">
        ₹1 - ₹50000
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="salary"
          id="check12"
          value="50000-100000"
          defaultChecked={checkHandler("salary", "50000-100000")}
          onClick={(e) => handleClick(e.target)}

        />
        <label className="form-check-label" htmlFor="check12">
        ₹50000 - ₹100,000
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="salary"
          id="check13"
          value="100000-200000"
          defaultChecked={checkHandler("salary", "100000-200000")}
          onClick={(e) => handleClick(e.target)}


        />
        <label className="form-check-label" htmlFor="check13">
        ₹100,000 - ₹200,000
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="salary"
          id="defaultCheck2"
          value="300000-500000"
          defaultChecked={checkHandler("salary", "300000-500000")}
          onClick={(e) => handleClick(e.target)}


        />
        <label className="form-check-label" htmlFor="defaultCheck2">
        ₹300,000 - ₹500,000
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="salary"
          id="check14"
          value="500000-1000000"
          defaultChecked={checkHandler("salary", "500000-1000000")}
          onClick={(e) => handleClick(e.target)}


        />
        <label className="form-check-label" htmlFor="check14">
        ₹500,000 - ₹1,000,000
        </label>
      </div>

      <hr />
    </div>
  )
}

export default Filters