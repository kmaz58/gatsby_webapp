import './src/styles/main.scss';

/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

// You can delete this file if you're not using it

export const onClientEntry = () => {
  localStorage.setItem("acceptedDiff", "2.5")
  console.log(localStorage.getItem("acceptedDiff"))

  //loginUser('kmaz58@yahoo.com', 'azxnm42')
}