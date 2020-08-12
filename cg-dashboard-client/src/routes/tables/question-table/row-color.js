import React from 'react';



export default class QualityCell extends Component {
    static propTypes = {
      value: PropTypes.string.isRequired,
      index: PropTypes.number.isRequired,
      change: PropTypes.func.isRequired
    };
  
    render() {
      const { value, index, change } = this.props;
      const colors = {
        "green": "#00ff00",
        "yellow": "#ffff00",
        "red": "#ff0000",
        "grey": "#B0B0B0"
      }
  
      let backgroundColor = colors.grey;
      if (value === "good") {
        backgroundColor = colors.green;
      } else if (value === "ok") {
        backgroundColor = colors.yellow;
      } else if (value === "bad") {
        backgroundColor = colors.red;
      }
  
      return (
        <p
          value={value}
          onChange={event => change(event.target.value, index)}
          style={{ backgroundColor: backgroundColor }}>{value}</p>
      )
    }
  }

