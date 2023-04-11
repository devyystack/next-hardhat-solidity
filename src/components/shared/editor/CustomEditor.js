import React, { useEffect } from "react";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import dynamic from "next/dynamic";
import { useTheme } from "@mui/material/styles";
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  {
    ssr: false,
  }
);
import { stateToHTML } from "draft-js-export-html";
import { convertFromHTML, ContentState, EditorState } from "draft-js";
//mui
import { Box } from "@mui/material";

export default function CustomEditor({
  isCollection,
  isProfile,
  editorState,
  setEditorState,
}) {
  const theme = useTheme();
  const handleIsProfile = (profile) => {
    if (profile) {
      return "340px";
    } else {
      return "500px";
    }
  };
  const handleIsProfileEditor = (profile) => {
    if (profile) {
      return "280px";
    } else {
      return "440px";
    }
  };

  return (
    <Box>
      <Box
        style={{
          height: isCollection ? "260px" : handleIsProfile(isProfile),
          boxShadow: theme.customShadows.stage,
          backgroundColor: "#F7F3FF",
        }}
      >
        <Editor
          defaultEditorState={EditorState.createWithContent(
            ContentState.createFromBlockArray(convertFromHTML(editorState))
          )}
          onEditorStateChange={(e) => {
            setEditorState(stateToHTML(e.getCurrentContent()));
          }}
          toolbar={{
            options: [
              "inline",
              "blockType",
              "fontSize",
              "list",
              "textAlign",
              "history",
            ],
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
          }}
          editorStyle={{
            height: isCollection ? "210px" : handleIsProfileEditor(isProfile),
          }}
        />
      </Box>
    </Box>
  );
}
