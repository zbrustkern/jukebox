import { useState, createContext, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import SignupForm from './components/SignupForm/SignupForm';
import SigninForm from './components/SigninForm/SigninForm';
import TrackList from './components/TrackList/TrackList';
import TrackForm from './components/TrackForm/TrackForm';
import TrackDetails from './components/TrackDetails/TrackDetails';
import NowPlaying from './components/NowPlaying/NowPlaying';
import * as authService from '../src/services/authService'; // import the authservice
import * as trackService from '../src/services/trackService';

export const AuthedUserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(authService.getUser()); // using the method from authservice
  const [tracks, setTracks] = useState([])
  const [nowPlaying, setNowPlaying] = useState({})
  const navigate = useNavigate();


  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

  const handleAddTrack = async (trackFormData) => {
    const newTrack = await trackService.create(trackFormData);
    setTracks([newTrack, ...tracks]);
    navigate('/tracks');
  };

  const handleDeleteTrack = async (trackId) => {
    console.log(trackId)
    const deletedTrack = await trackService.deleteTrack(trackId);
    setTracks(tracks.filter((track) => track._id !== trackId));
    navigate('/tracks');
  };

  const handleUpdateTrack = async (trackId, formData) => {
    const updatedTrack = await trackService.update(trackId, formData);
    setTracks(tracks.map((track) => (trackId === track._id ? updatedTrack : track)));
    navigate(`/tracks`);
  };

  useEffect(() => {
    const fetchAllTracks = async () => {
      const tracksData = await trackService.index();
  
      // Set state:
      setTracks(tracksData);
    };
    if (user) fetchAllTracks();
  }, [user, tracks]);

  const handleUpdateNowPlaying = (track) => {
    setNowPlaying(track)
      console.log('trackData', track);
    };
  
    
  return (
    <>
      <AuthedUserContext.Provider value={user}>
        <NavBar user={user} handleSignout={handleSignout} />
        <Routes>
          {user ? (
            //Protected Routes
            <>
              <Route path="/" element={<Dashboard user={user} />} />
              <Route path="/tracks" element={<TrackList tracks={tracks} handleUpdateNowPlaying={handleUpdateNowPlaying} handleDeleteTrack={handleDeleteTrack} />} />
              <Route path="/add-track" element={<TrackForm handleAddTrack={handleAddTrack}/> }/> 
              <Route path="/tracks/:trackId/edit" element={<TrackForm handleUpdateTrack={handleUpdateTrack} />} />
            </>
          ) : (
            //Public Routes
            <Route path="/" element={<Landing />} />
          )}
          <Route path="/signup" element={<SignupForm setUser={setUser} />} />
          <Route path="/signin" element={<SigninForm setUser={setUser} />} />
        </Routes>
        <NowPlaying track={nowPlaying}/>
      </AuthedUserContext.Provider>
    </>
  );
};

export default App;
