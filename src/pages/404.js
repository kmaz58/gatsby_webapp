import * as React from "react"

import MainLayout from "../components/layouts/MainLayout"
import Img_404 from "../images/404.gif"

const NotFoundPage = () => (
  <MainLayout>
    <h1>404: Not Found</h1>
    <img src={Img_404} alt="404" />
  </MainLayout>
)

export default NotFoundPage
