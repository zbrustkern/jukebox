import { useParams } from 'react-router-dom';
import { AuthedUserContext } from '../../App';
import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as trackService from '../../services/trackService';

const TrackDetails = (props) => {
    const [track, setTrack] = useState(null)
    const navigate = useNavigate()

    const user = useContext(AuthedUserContext);

    const { trackId } = useParams();
    console.log('trackId', trackId);

    useEffect(() => {
        const fetchTrack = async () => {
          const trackData = await trackService.show(trackId);
          console.log('trackData', trackData);
          setTrack(trackData);
        };
        fetchTrack();
      }, [trackId]);

    if (!track) return <main>Loading...</main>;
    const handleEdit = () => {
      navigate(`/tracks/${props.track._id}/edit`);
    };
    return (
        <main className='track-details'>
          <div className='track-info'>
            <h2>{props.track.title}</h2>
            <h3>{props.track.artist}</h3>
          </div>
          <div className='track-actions'>
            {props.track.author === user._id && (
              <>
                <button onClick={handleEdit}>Edit ✏️</button>
                <button onClick={() => props.handleDeleteTrack(props.track._id)}>Delete 🗑️</button>
              </>
            )}
              <button onClick={() => props.handleUpdateNowPlaying(props.track)}>Play 🎶</button>
            </div>
        </main>
    );
};

export default TrackDetails