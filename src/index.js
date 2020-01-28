import marked from 'marked';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

marked.setOptions({
  breaks: true,
});

const defaultEditorText = `
# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want!
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorText: defaultEditorText,
    };
    this.handleEditorTextChange = this.handleEditorTextChange.bind(this);
  }

  handleEditorTextChange(text) {
    this.setState({
      editorText: text,
    });
  }

  render() {
    return (
      <div>
        <Editor
          editorText={this.state.editorText}
          onEditorTextChange={this.handleEditorTextChange}
        />
        <Preview editorText={this.state.editorText} />
      </div>
    );
  }
}

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.handleEditorTextChange = this.handleEditorTextChange.bind(this);
  }

  handleEditorTextChange(event) {
    this.props.onEditorTextChange(event.target.value);
  }

  render() {
    const title = 'Editor';
    const editorText = this.props.editorText;

    return (
      <div className="editorWrap">
        <Toolbar title={title} />
        <textarea
          id="editor"
          onChange={this.handleEditorTextChange}
          value={editorText}
        ></textarea>
      </div>
    );
  }
}

Editor.defaultProps = {
  editorText: '',
  onEditorTextChange: function() {},
};
Editor.propTypes = {
  editorText: PropTypes.string.isRequired,
  onEditorTextChange: PropTypes.func.isRequired,
};

class Preview extends React.Component {
  render() {
    const title = 'Previewer';
    const editorText = this.props.editorText;
    const markdownPreview = marked(editorText); // unsanitized

    return (
      <div className="previewWrap">
        <Toolbar title={title} />
        <div
          id="preview"
          dangerouslySetInnerHTML={{ __html: markdownPreview }}
        ></div>
      </div>
    );
  }
}

class Toolbar extends React.Component {
  render() {
    const title = this.props.title;

    return (
      <div className="toolbar">
        <i className="fa fa-free-code-camp"></i> {title}
      </div>
    );
  }
}

Toolbar.defaultProps = {
  editorText: '',
  title: 'Toolbar',
};
Toolbar.propTypes = {
  editorText: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

ReactDOM.render(<App />, document.getElementById('root'));
