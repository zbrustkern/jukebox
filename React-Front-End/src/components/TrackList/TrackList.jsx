import TrackDetails from '../TrackDetails/TrackDetails';


const TrackList = (props) => {
    return (
        <main className='track-list'>
          {props.tracks.map((track) => (
                <TrackDetails key={track._id} track={track} handleUpdateNowPlaying={props.handleUpdateNowPlaying} handleDeleteTrack={props.handleDeleteTrack}/>
          ))}
        </main>
      );
}

export default TrackList