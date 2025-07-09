import React from "react";
import DynamicFeatherIcon from '@/Common/DynamicFeatherIcon';

const SearchRica = ({searchBarOpen,setSearchBarOpen}:{searchBarOpen:boolean,setSearchBarOpen:(val:boolean)=>void}) => {
  return (
    <form className={`form-inline search-full col ${searchBarOpen?"open":""} `}>
      <div className="form-group w-100">
        <div className="Typeahead Typeahead--twitterUsers">
          <div className="u-posRelative">
            <span
              className="twitter-typeahead"
              style={{ position: "relative", display: "inline-block" }}
            >
              <input
                className="demo-input Typeahead-input form-control-plaintext w-100 tt-hint"
                type="text"
                style={{position: "absolute",top: 0,left: 0,borderColor: "transparent",boxShadow: "none",opacity: 1,background:"none 0% 0% / auto repeat scroll padding-box border-box rgb(242, 249, 252)",}}
              />
              <input
                className="demo-input Typeahead-input form-control-plaintext w-100 tt-input"
                type="text"
                placeholder="Search Rica .."
                style={{ position: "relative", verticalAlign: "top" }}
              />
              <pre
                aria-hidden="true"
                style={{position: "absolute",visibility: "hidden",whiteSpace: "pre",fontFamily: "Nunito, sans-serif, sans-serif",fontSize: 16,fontStyle: "normal",fontVariant: "normal",fontWeight: 400,wordSpacing: 0,letterSpacing: 0,textIndent: 0,textRendering: "auto",textTransform: "none",}}
              />
            </span>
            <DynamicFeatherIcon iconName="X"  className="close-search" onClick={()=>setSearchBarOpen(!searchBarOpen)} />
            <div className="spinner-border Typeahead-spinner" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
          <div className="Typeahead-menu">
            <div className="tt-dataset tt-dataset-0" />
          </div>
        </div>
      </div>
    </form>
  );
};

export default SearchRica;
