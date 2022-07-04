import React from "react"
import { useQuery, gql } from "@apollo/client"
import Loading from "../images/loading.svg"
import NoPostcodeFound from "./NoPostcodeFound"
import DoubleDown from "../images/double-chevron-down.svg"
import { useStaticQuery, graphql } from "gatsby"

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

  const showData = useStaticQuery(graphql`
    {
      wp {
        siteGeneralSettings {
          siteSettingsFields {
            show2m3
            show3m3
            show4m3
            show5m3
            show6m3
            show8m3
            show9m3
            show10m3
          }
        }
      }
    }
  `)

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

  const show2m3 = showData.wp.siteGeneralSettings.siteSettingsFields.show2m3
  const show3m3 = showData.wp.siteGeneralSettings.siteSettingsFields.show3m3
  const show4m3 = showData.wp.siteGeneralSettings.siteSettingsFields.show4m3
  const show5m3 = showData.wp.siteGeneralSettings.siteSettingsFields.show5m3
  const show6m3 = showData.wp.siteGeneralSettings.siteSettingsFields.show6m3
  const show8m3 = showData.wp.siteGeneralSettings.siteSettingsFields.show8m3
  const show9m3 = showData.wp.siteGeneralSettings.siteSettingsFields.show9m3
  const show10m3 = showData.wp.siteGeneralSettings.siteSettingsFields.show10m3

  return (
    <>
      <DoubleDown className="absolute right-[10px] top-[-10px] z-50 w-[24px] animate-bounce lg:right-[-30px]" />
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
                {show2m3 && <th className="pb-7">2m3</th>}
                {show3m3 && <th className="pb-7">3m3</th>}
                {show4m3 && <th className="pb-7">4m3</th>}
                {show5m3 && <th className="pb-7">5m3</th>}
                {show6m3 && <th className="pb-7">6m3</th>}
                {show8m3 && <th className="pb-7">8m3</th>}
                {show9m3 && <th className="pb-7">9m3</th>}
                {show10m3 && <th className="pb-7">10m3</th>}
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
                      {show2m3 && (
                        <td>
                          <span>from </span>${item.price2m3}
                        </td>
                      )}
                      {show3m3 && (
                        <td>
                          <span>from </span>${item.price3m3}
                        </td>
                      )}
                      {show4m3 && (
                        <td>
                          <span>from </span>${item.price4m3}
                        </td>
                      )}
                      {show5m3 && (
                        <td>
                          <span>from </span>${item.price5m3}
                        </td>
                      )}
                      {show6m3 && (
                        <td>
                          <span>from </span>${item.price6m3}
                        </td>
                      )}

                      {show8m3 && (
                        <td>
                          <span>from </span>${item.price8m3}
                        </td>
                      )}
                      {show9m3 && (
                        <td>
                          <span>from </span>${item.price9m3}
                        </td>
                      )}
                      {show10m3 && (
                        <td>
                          <span>from </span>${item.price10m3}
                        </td>
                      )}
                    </tr>
                  )
                })
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default PostCodeLists
