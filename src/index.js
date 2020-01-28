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
        <Preview />
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

    return (
      <div className="previewWrap">
        <Toolbar title={title} />
        <div id="preview">Markdown preview goes here</div>
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
  title: 'Toolbar',
};
Toolbar.propTypes = {
  title: PropTypes.string.isRequired,
};

ReactDOM.render(<App />, document.getElementById('root'));
