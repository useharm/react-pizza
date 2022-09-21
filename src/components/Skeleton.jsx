import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
  <ContentLoader 
    className='pizza-block'
    speed={2}
    width={280}
    height={466}
    viewBox="0 0 280 466"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="130" cy="130" r="130" /> 
    <rect x="0" y="314" rx="10" ry="10" width="280" height="88" /> 
    <rect x="0" y="418" rx="10" ry="10" width="91" height="27" /> 
    <rect x="123" y="411" rx="10" ry="10" width="155" height="46" /> 
    <rect x="0" y="275" rx="10" ry="10" width="280" height="28" />
  </ContentLoader>
)

export default Skeleton;