import ReactPlayer from "react-player";
type Props = {
  url: string;
};
const VideoPlayer: React.FC<Props> = ({ url }) => {
  return (
    <>
      <ReactPlayer
        url={url}
        width="100%"
        height="100%"
        controls
        playsinline
        style={{ zIndex: 2 }}
      />
    </>
  );
};

export default VideoPlayer;
