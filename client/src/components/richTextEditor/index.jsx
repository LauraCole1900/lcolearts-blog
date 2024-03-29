import { Component } from "react";
import { ContentState, EditorState } from "draft-js";
import htmlToDraft from "html-to-draftjs";
import { Editor } from "react-draft-wysiwyg";
import ColorPicker from "./colorPicker";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./style.css";


class EditorContainer extends Component {
  constructor(props) {
    super(props);

    // State
    const html = props.value;
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      this.state = { editorState };
    } else {
      this.state = EditorState.createEmpty()
    };
    this.name = props.name;
    this.value = props.value;
    this.onChange = props.onChange;
  }

  // Handles input changes to editor form
  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
    this.onChange(this.name, editorState)
  };


  // Defines options to render
  render() {
    const { editorState } = this.state;
    return <div className='editor richTextEditor'>
      <Editor
        editorState={editorState}
        onEditorStateChange={this.onEditorStateChange}
        stripPastedStyles={true}
        ref={(ref) => this.editor = ref}
        toolbarClassName="blogToolbar"
        toolbar={{
          options: ["inline", "blockType", "fontSize", "fontFamily", "list", "textAlign", "link", "colorPicker", "history"],
          inline: {
            inDropdown: false,
            options: ["bold", "italic", "underline", "strikethrough", "monospace", "superscript", "subscript"]
          },
          blockType: {
            inDropdown: true,
            options: ["Normal", "H1", "H2", "H3", "H4", "H5", "H6", "Blockquote", "Code"]
          },
          list: {
            inDropdown: false,
            options: ["unordered", "ordered"]
          },
          textAlign: { inDropdown: false },
          link: {
            inDropdown: false,
            defaultTargetOption: "_blank",
            options: ['link', 'unlink']
          },
          history: { inDropdown: false },
          colorPicker: { component: ColorPicker }
        }}
      />
    </div>
  }
};

export default EditorContainer;