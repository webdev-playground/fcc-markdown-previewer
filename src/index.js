import marked from 'marked';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

marked.setOptions({
  breaks: true,
});

const defaultEditorText = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Here's some code, \`<div></div>\`, between 2 backticks.

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
      editorMaximized: false,
      previewMaximized: false,
    };
    this.handleEditorTextChange = this.handleEditorTextChange.bind(this);
    this.handleEditorMaximize = this.handleEditorMaximize.bind(this);
    this.handlePreviewMaximize = this.handlePreviewMaximize.bind(this);
  }

  handleEditorTextChange(text) {
    this.setState({
      editorText: text,
    });
  }

  handleEditorMaximize() {
    this.setState(state => ({
      editorMaximized: !state.editorMaximized,
      previewMaximized: false,
    }));
  }

  handlePreviewMaximize() {
    this.setState(state => ({
      previewMaximized: !state.previewMaximized,
      editorMaximized: false,
    }));
  }

  render() {
    return (
      <div className="appWrap">
        <Editor
          editorText={this.state.editorText}
          onEditorTextChange={this.handleEditorTextChange}
          onEditorMaximize={this.handleEditorMaximize}
        />
        <Preview
          editorText={this.state.editorText}
          onPreviewMaximize={this.handlePreviewMaximize}
        />
      </div>
    );
  }
}

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.handleEditorTextChange = this.handleEditorTextChange.bind(this);
    this.handleEditorMaximize = this.handleEditorMaximize.bind(this);
  }

  handleEditorTextChange(event) {
    this.props.onEditorTextChange(event.target.value);
  }

  handleEditorMaximize() {
    this.props.onEditorMaximize();
  }

  render() {
    const title = 'Editor';
    const editorText = this.props.editorText;

    return (
      <div className="editorWrap">
        <Toolbar title={title} onClick={this.handleEditorMaximize} />
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
  onEditorMaximize: function() {},
};
Editor.propTypes = {
  editorText: PropTypes.string.isRequired,
  onEditorTextChange: PropTypes.func.isRequired,
  onEditorMaximize: PropTypes.func.isRequired,
};

class Preview extends React.Component {
  constructor(props) {
    super(props);
    this.handlePreviewMaximize = this.handlePreviewMaximize.bind(this);
  }

  handlePreviewMaximize() {
    this.props.onPreviewMaximize();
  }

  render() {
    const title = 'Previewer';
    const editorText = this.props.editorText;
    const markdownPreview = marked(editorText); // unsanitized

    return (
      <div className="previewWrap">
        <Toolbar title={title} onClick={this.handlePreviewMaximize} />
        <div
          id="preview"
          dangerouslySetInnerHTML={{ __html: markdownPreview }}
        ></div>
      </div>
    );
  }
}

Preview.defaultProps = {
  onPreviewMaximize: function() {},
};
Preview.propTypes = {
  onPreviewMaximize: PropTypes.func.isRequired,
};

class Toolbar extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onClick();
  }

  render() {
    const title = this.props.title;

    return (
      <div className="toolbar">
        <div className="row">
          <div className="col-auto mr-auto">
            <i className="fa fa-free-code-camp"></i> {title}
          </div>
          <div className="col-auto">
            <i className="fa fa-arrows-alt" onClick={this.handleClick}></i>
          </div>
        </div>
      </div>
    );
  }
}

Toolbar.defaultProps = {
  editorText: '',
  title: 'Toolbar',
  onClick: function() {},
};
Toolbar.propTypes = {
  editorText: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

ReactDOM.render(<App />, document.getElementById('root'));
