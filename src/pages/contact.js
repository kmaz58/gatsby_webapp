import * as React from "react"

import MainLayout from "../components/layouts/MainLayout"
import Img_404 from "../images/404.gif"

const Contact = () => (
  <MainLayout>
    <h2>Επικοινωνία</h2>
    <img src={Img_404} alt="404" />
  </MainLayout>
)

export default Contact
