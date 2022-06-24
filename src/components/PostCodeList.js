import React from "react"
import { useQuery, gql } from "@apollo/client"
import Loading from "../images/loading.svg"
import NoPostcodeFound from "./NoPostcodeFound"

const searchPosts = gql`
  query POSTS_SEARCH_QUERY($searchTerm: String!) {
    postcodes(where: { search: $searchTerm }) {
      nodes {
        id
        title
        postCodeFields {
          info {
            suburb
            price2m3
            price3m3
            price4m3
            price5m3
            price6m3
            price8m3
            price9m3
            price10m3
          }
        }
      }
    }
  }
`

function PostCodeLists({ searchTerm }) {
  const { loading, error, data } = useQuery(searchPosts, {
    variables: { searchTerm },
  })

  let searchLength = 0

  if (loading) {
    return (
      <div className="absolute bg-white bg-opacity-50 w-full h-full top-0 cs-spinner flex items-center justify-center">
        <Loading />
      </div>
    )
  }

  if (error) return <p>Error</p>

  const postsFound = !!data?.postcodes.nodes.length
  if (!postsFound) {
    return <NoPostcodeFound />
  }

  if (!searchTerm) {
    return <div className="pb-14 lg:pb-40"></div>
  }

  return (
    <div className="posts-list relative overflow-x-scroll xl:overflow-hidden">
      {data.postcodes.nodes.forEach(
        post => (searchLength += post.postCodeFields.info.length)
      )}
      <div className="cs-container">
        <p
          className="text-center text-bin-title text my-5 2xl:my-50px"
          style={"color: #a7a7a7"}
        >
          {`${searchLength} ${
            searchLength > 1 ? "results" : "result"
          } for "${searchTerm}"`}
        </p>
        <table class="w-full border-collapse">
          <thead className="text-left">
            <tr>
              <th className="pb-7 lg:min-w-[144px]">Postcode</th>
              <th className="pb-7">Suburb</th>
              <th className="pb-7">2m3</th>
              <th className="pb-7">3m3</th>
              <th className="pb-7">4m3</th>
              <th className="pb-7">5m3</th>
              <th className="pb-7">6m3</th>
              <th className="pb-7">8m3</th>
              <th className="pb-7">9m3</th>
              <th className="pb-7">10m3</th>
            </tr>
          </thead>
          <tbody className="border-b border-t border-dark-green border-opacity-20">
            {data.postcodes.nodes.map(post => {
              let postCode = post.title
              return post.postCodeFields.info.map((item, i) => {
                return (
                  <tr
                    key={i}
                    className="border-b last:border-b-0 hover:bg-gray-100"
                  >
                    <td className="py-3">{postCode}</td>
                    <td>{item.suburb}</td>
                    <td>
                      <span>from </span>${item.price2m3}
                    </td>
                    <td>
                      <span>from </span>${item.price3m3}
                    </td>
                    <td>
                      <span>from </span>${item.price4m3}
                    </td>
                    <td>
                      <span>from </span>${item.price5m3}
                    </td>
                    <td>
                      <span>from </span>${item.price6m3}
                    </td>
                    <td>
                      <span>from </span>${item.price8m3}
                    </td>
                    <td>
                      <span>from </span>${item.price9m3}
                    </td>
                    <td>
                      <span>from </span>${item.price10m3}
                    </td>
                  </tr>
                )
              })
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PostCodeLists
