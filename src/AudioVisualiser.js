import song from './media/trenches.mp3'

export default function Container({ onClick }) {
  // TODO: build a backend that can make requests to the spotify api to get your most listened to song of the last month
  // https://api.spotify.com/v1/me/top/tracks?limit=1&time_range=short_term
  // still need to work out if you can analyze audio data from an iframe though
  const track_id = '3YVeaqhSFth8QAL45wO19L';
  return (
    <div>
      <audio
        controls
        src={song} type="audio/mpeg">
        <a href={song}></a>
      </audio>
      <audio
        controls
        src={`https://open.spotify.com/embed/track/${track_id}?utm_source=generator`}>
        <a href={song}></a>
      </audio>
    </div>

  );
}

