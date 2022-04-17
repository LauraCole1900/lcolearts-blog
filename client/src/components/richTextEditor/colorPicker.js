import { Component } from 'react';
import PropTypes from 'prop-types';
import { CompactPicker } from 'react-color';
import colorWheel from "../../pix/color-wheel.png";


class ColorPicker extends Component {
  static propTypes = {
    expanded: PropTypes.bool,
    onExpandEvent: PropTypes.func,
    onChange: PropTypes.func,
    currentState: PropTypes.object,
  };

  stopPropagation = (event) => {
    event.stopPropagation();
  };

  onChange = (color) => {
    const { onChange } = this.props;
    onChange('color', color.hex);
  }

  renderModal = () => {
    const { color } = this.props.currentState;
    return (
      <div
        onClick={this.stopPropagation}
      >
        <CompactPicker color={color} onChangeComplete={this.onChange} />
      </div>
    );
  };

  render() {
    const { expanded, onExpandEvent } = this.props;
    return (
      <div
        aria-haspopup="true"
        aria-expanded={expanded}
        aria-label="rdw-color-picker"
      >
        <div
          onClick={onExpandEvent}
        >
          <img
            src={colorWheel}
            alt="Color picker icon"
            className="editorIcon"
          />
        </div>
        {expanded ? this.renderModal() : undefined}
      </div>
    );
  }
};

export default ColorPicker;