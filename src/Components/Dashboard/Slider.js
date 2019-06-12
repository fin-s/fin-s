import React, { Component } from "react";
import { Slider, Rail, Handles, Tracks, Ticks } from "react-compound-slider";
import Handle from "./Handle";
import Track from "./Track";
import Tick from './Tick'

class ExcessMoneySlider extends Component {
  constructor() {
    super();
    this.state = {
      sliderStyle: {
        // Give the slider some width
        position: "relative",
        width: "80%",
        height: 80
      },
      railStyle: {
        position: "absolute",
        width: "100%",
        height: 10,
        marginTop: 35,
        borderRadius: 5,
        backgroundColor: "#515364"
      },
      update: null
    };
  }

  render() {
    return (
      <div className='slider'><Slider
      rootStyle={this.state.sliderStyle}
      domain={[0, this.props.surplus]}
      step={1}
      mode={2}
      values={[0]}
      onChange={this.props.onUpdate}
      >
      <Rail>
      {({ getRailProps }) => (  // adding the rail props sets up events on the rail
      <div style={this.state.railStyle} {...getRailProps()} />
      )}
      </Rail>
      <Handles>
      {({ handles, getHandleProps }) => (
      <div className="slider-handles">
      {handles.map(handle => (
      <Handle
      key={handle.id}
      handle={handle}
      getHandleProps={getHandleProps}
      />
      ))}
      </div>
      )}
      </Handles>
      <Tracks right={false}>
      {({ tracks, getTrackProps }) => (
      <div className="slider-tracks">
      {tracks.map(({ id, source, target }) => (
      <Track
      key={id}
      source={source}
      target={target}
      getTrackProps={getTrackProps}
      />
      ))}
      </div>
      )}
      </Tracks>
      <Ticks count={5}>
      {({ ticks }) => (
      <div className="slider-ticks">
      {ticks.map(tick => (
      <Tick key={tick.id} tick={tick} count={ticks.length} />
      ))}
      </div>
      )}
      </Ticks>
      </Slider>
      <p>{this.state.update}</p>
      </div>
    );
  }
}
export default ExcessMoneySlider;
