import React from 'react';
import ReactDOM from 'react-dom';
import SVGInjector from 'svg-injector';

class DynamicSVG extends React.Component {

  getDefaultProps() {
    return {
      values: {},
      precision: 2,
      width: '1000px',
    };
  }

  getInitialState() {
    return {
      textmap: {},
    };
  }

  componentDidMount() {
    var injectorOptions = {
      evalScripts: 'once',
      pngFallback: 'assets/png',
      each: (svg) => {
        var textelements = svg.querySelectorAll('text');
        textelements.forEach((item) => {
          var text = item.innerHTML;
          if ((text.length > 0) && (text[0] === '@')) {
            const name = text.slice(1);
            this.state.textmap[name] = item;
            if (this.props.values[name] != undefined) {
              text = this.props.values[name];
            } else {
              text = '';
            }
          }
        }, this);
      }
    };
    SVGInjector(ReactDOM.findDOMNode(this.svgimage), injectorOptions);
  }

  componentDidUpdate() {
    var key;
    for (key in this.props.values) {
      if (this.state.textmap[key] != undefined) {
        if (typeof(this.props.values[key])==='string') {
          this.state.textmap[key].innerHTML = this.props.values[key];  
        } else {
          this.state.textmap[key].innerHTML = this.props.values[key].toPrecision(this.props.precision);
        }
      }
    }
  }

  render() {
    const divStyle = {
      width: this.props.width,
    };
    return (
            <div style={divStyle}>
              <img src={this.props.url} id="svg" ref = {(ref) => {this.svgimage = ref;}}/>
            </div>
        );
  }
}

module.exports = DynamicSVG;
