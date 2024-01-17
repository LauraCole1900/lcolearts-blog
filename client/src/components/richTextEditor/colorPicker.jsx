import { Component } from 'react';
import PropTypes from 'prop-types';
import { CompactPicker } from 'react-color';
import colorWheel from "../../pix/color-wheel.png";


class ColorPicker extends Component {
  state = {
    pickerVisible: false,
  }

  static propTypes = {
    onChange: PropTypes.func
  }

  onChange = ({ hex }) => {
    const { onChange } = this.props;
    onChange('color', hex);
  }

  render() {
    const onTogglePicker = () => this.setState({ pickerVisible: !this.state.pickerVisible })

    return (
      <div>
        <img src={colorWheel} className='editorIcon colorIcon' alt='toggle color picker' onClick={onTogglePicker} />

        {this.state.pickerVisible && (
          <div style={{ position: 'absolute' }}>
            <CompactPicker
              color="#333"
              onChangeComplete={this.onChange}
            />
          </div>
        )}
      </div>
    )
  }
}

export default ColorPicker;