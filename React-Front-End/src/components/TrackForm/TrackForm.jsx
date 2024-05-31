
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as trackService from '../../services/trackService';

const TrackForm = (props) => {

  const { trackId } = useParams();

  useEffect(() => {
    const fetchTrack = async () => {
      const trackData = await trackService.show(trackId)
      setFormData(trackData)
    };
    if (trackId) fetchTrack();
  }, [trackId]);

  const [formData, setFormData] = useState({
    title: '',
    artist: '',
  });

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (trackId) {
      props.handleUpdateTrack(trackId, formData);
    } else {
      props.handleAddTrack(formData);
    }
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <h1>{trackId ? 'Edit Track' : 'New Track'}</h1>
        <label htmlFor="title-input">Title</label>
        <input
          required
          type="text"
          name="title"
          id="title-input"
          value={formData.title}
          onChange={handleChange}
        />
        <label htmlFor="artist-input">Artist</label>
        <input
          required
          type="text"
          name="artist"
          id="artist-input"
          value={formData.artist}
          onChange={handleChange}
        />
        <button type="submit">SUBMIT</button>
      </form>
    </main>
  );
};

export default TrackForm;
