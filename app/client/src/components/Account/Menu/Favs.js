import React from "react";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import SVGIcon from "../../SVG/SVGIcon";
import favsSVG from "../../../images/favs.svg";
import FavsList from "../Content/Favs/FavsList"

class Favs extends React.Component {
  render() {
    return (
      <div className="p-6 bg-purple-700">
        <div className="flex flex-col font-sans bg-white">
          <div className="container px-8 mx-auto">
            <Header />

            <main className="flex flex-col-reverse items-center py-8 my-12 sm:flex-row jusitfy-between">
              <div className="flex flex-col items-center w-full text-center sm:items-start sm:text-left">
                <h1 className="mb-2 text-6xl font-bold leading-none tracking-wide text-blue-900">
                  Your favorites
                </h1>
                <h2 className="mb-6 text-4xl tracking-widest text-orange-500 text-secondary">
                  All products you liked.
                </h2>
              </div>
              <SVGIcon src={favsSVG} cls="absolute right-0 z-0 hidden h-64 max-w-xs mr-32 lg:flex" />
              <div className="mt-8 mb-16 sm:mb-0 sm:mt-0 sm:w-3/5 sm:pl-12"></div>
            </main>

            <FavsList />
          </div>

          <Footer/>
        </div>
      </div>
    );
  }
}

export default Favs;
