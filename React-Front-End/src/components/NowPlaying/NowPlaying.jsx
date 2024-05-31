import { useState, useEffect } from 'react';

const NowPlaying = (props) => {
    if (props.track.title) return (
        <div className='now-playing'>
        Now playing: <br/><br/>
        <h2>{props.track.title}</h2><br/>by<br/><br/><h3>{props.track.artist}</h3>
        </div>
    )
}

export default NowPlaying