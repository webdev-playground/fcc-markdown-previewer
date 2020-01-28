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
    const title = 'Editor';

    return (
      <div className="editorWrap">
        <Toolbar title={title} />
      </div>
    );
  }
}

class Preview extends React.Component {
  render() {
    const title = 'Previewer';

    return (
      <div className="previewWrap">
        <Toolbar title={title} />
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
