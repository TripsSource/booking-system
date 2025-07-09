import { BlogPostText } from "@/utils/Constant";
import dynamic from "next/dynamic";
import React from "react";

const EditorsSimple = () => {
  const SimpleMdeReact = dynamic(() => import("react-simplemde-editor"), { ssr: false });

  return (
    <SimpleMdeReact
      id="editor_container"
      value={BlogPostText}
      options={{ autofocus: true, spellChecker: false }}
    />
  );
};

export default EditorsSimple;
