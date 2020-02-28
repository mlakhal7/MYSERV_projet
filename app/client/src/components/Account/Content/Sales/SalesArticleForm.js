import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faStream, faTags } from "@fortawesome/free-solid-svg-icons";
import SalesImageUploader from "./SalesImageUploader";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";

export default function SalesArticleForm(props) {
  let state = {
    img: null,
    categories: ["Gaming", "High-tech", "Garden", "Kitchen", "House", "Sport"],
    devises: ["€", "$"]
  };

  const [tags, setTags] = React.useState([]);
  const nbTagsMax = 5;

  return (
    <form /*onSubmit={this.send}*/>
      <div className="flex flex-col px-8 pt-6 pb-8 my-2 mb-4 bg-white border-gray-300 rounded md:shadow-md md:border">
        <div className="mb-6 -mx-3 md:flex">
          <div className="px-3 mb-6 md:w-1/2 md:mb-0">
            <SalesImageUploader />
          </div>
          <div className="px-3 md:w-1/2">
            <label
              className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
              htmlFor="grid-product-description"
            >
              Description <FontAwesomeIcon icon="edit" size="1x" />
            </label>
            <textarea
              className="block w-full px-4 py-3 text-gray-700 bg-gray-200 border rounded appearance-none border-gray-lighter"
              id="grid-product-description"
              rows="9"
              type="text"
              placeholder="Describe me"
            />
          </div>
        </div>

        <div className="mb-2 -mx-3 md:flex">
          <div className="px-3 mb-6 md:w-1/2 md:mb-0">
            <label
              className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
              htmlFor="grid-product-price"
            >
              Price <FontAwesomeIcon icon="money-bill-wave-alt" size="1x" />
            </label>
            <div className="relative flex flex-wrap items-stretch w-full py-1">
              <div className="flex">
                <span className="flex items-center px-3 text-sm leading-normal text-gray-700 whitespace-no-wrap bg-gray-200 border border-gray-500">
                  €
                </span>
              </div>
              <input
                type="number"
                id="grid-product-price"
                className="relative flex-1 flex-auto flex-grow flex-shrink w-px h-10 px-3 px-4 py-3 leading-normal bg-gray-200 border border-gray-200 rounded appearance-none"
              />
            </div>
          </div>
          <div className="px-3 mb-6 md:w-1/2 md:mb-0">
            <label
              className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
              htmlFor="grid-product-category"
            >
              Category <FontAwesomeIcon icon={faStream} size="1x" />
            </label>
            <input
              className="block w-full px-4 py-3 text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none"
              id="grid-product-category"
              type="text"
              placeholder="High-tech, gaming, ..."
            />
          </div>
        </div>

        <div className="mt-2">
          <label
            className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
            htmlFor="grid-product-tags"
          >
            Tags <FontAwesomeIcon icon={faTags} size="1x" />
          </label>
          <ReactTagInput
            id="grid-product-tags"
            tags={tags}
            placeholder={"Type and press enter ("+ nbTagsMax +" max.)"}
            maxTags={nbTagsMax}
            editable={true}
            readOnly={false}
            removeOnBackspace={true}
            onChange={newTags => setTags(newTags)}
          />
        </div>

        <div className="flex content-center my-8 text-center">
          <div className="w-1/2">
            <a
              className="hidden px-4 py-3 my-1 text-white bg-teal-500 border border-blue-500 rounded md:inline hover:bg-teal-700 focus:outline-none"
              href="#top"
            >
              Watch your offer before sending
            </a>
            <a
              className="inline px-16 py-3 text-white bg-teal-500 border border-blue-500 rounded md:hidden hover:bg-teal-700 focus:outline-none"
              href="#top"
            >
              <FontAwesomeIcon icon={faEye} size="1x" />
            </a>
          </div>
          <div className="w-1/2">
            <button
              type="submit"
              className="w-40 py-3 -mt-4 text-white bg-green-500 rounded hover:bg-green-700 focus:outline-none"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}