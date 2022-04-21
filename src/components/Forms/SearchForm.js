import React from "react"
import ChevronRight from "../../images/ios-arrow-forward.svg"

const SearchForm = ({ searchTerm, handleSearchTermChange, handleSubmit }) => {
  return (
    <div className="cs-container cs-search mt-8 lg:mt-14">
      <div className="bg-light-green p-4 lg:p-12">
        <h3 class="text-2xl lg:text-4xl">Find a postcode</h3>
        <form
          method="post"
          className="search-form max-w-815px mx-auto relative bg-white mt-4 p-4 md:flex md:items-center lg:mt-14"
          onSubmit={handleSubmit}
        >
          <label
            htmlFor="search"
            class="font-bold text-lg lg:text-bin-title text-dark-green"
          >
            Search
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={e => handleSearchTermChange(e.target.value)}
            placeholder="Enter postcode"
            id="search"
            className="border border-border-grey border-opacity-20 w-full h-btn rounded-30px focus:outline-none focus:ring-2 focus:ring-primary pl-4 h-10 md:h-20 my-4 md:my-0 md:mx-4 md:text-2xl"
          />
          <button className="cs-btn md:h-20 md:max-w-270px" type="submit">
            Search
            <ChevronRight />
          </button>
        </form>
      </div>
    </div>
  )
}

export default SearchForm
