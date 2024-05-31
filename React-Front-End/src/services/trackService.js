const BASE_URL = `/api/tracks`;

const index = async () => {
    try {
      const res = await fetch(BASE_URL, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
};

const show = async (trackId) => {
  try {
    const res = await fetch(`${BASE_URL}/${trackId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const create = async (trackFormData) => {
    try {
      const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(trackFormData),
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };

  async function update(trackId, formData) {
    try {
      const res = await fetch(`${BASE_URL}/${trackId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  }

  const deleteTrack = async (trackId) => {
    try {
      const res = await fetch(`${BASE_URL}/${trackId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };
  
export {
    index,
    show,
    create,
    update,
    deleteTrack };