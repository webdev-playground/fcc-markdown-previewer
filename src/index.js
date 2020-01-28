import marked from 'marked';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorText: '',
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

    return <div className="toolbar">{title}</div>;
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
