import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends React.Component {
  render() {
    return (
      <div>
        <Editor />
        <Preview />
      </div>
    );
  }
}

class Editor extends React.Component {
  render() {
    return <div className="editorWrap">Editor</div>;
  }
}

class Preview extends React.Component {
  render() {
    return <div className="previewWrap">Preview</div>;
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
