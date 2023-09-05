import { Box, Fade, IconButton, Modal, Backdrop } from "@mui/material";
import ReactPlayer from "react-player";
import CloseIcon from "@mui/icons-material/Close";

type VideoPlayerProps = {
  url: string;
  isOpen: boolean;
  onClose: () => void;
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, isOpen, onClose }) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isOpen}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "1360px",
            height: "720px",
            bgcolor: "black",
            boxShadow: 24,
            p: 0,
          }}
        >
          <Box sx={{ position: "absolute", right: 650, top: 20 }}>
            <IconButton
              size="small"
              onClick={onClose}
              sx={{
                backgroundColor: "rgba(255,255,255)",
                color: "black",
                "&:hover": { backgroundColor: "gray", color: "white" },
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <ReactPlayer
            url={url}
            width="100%"
            height="100%"
            controls
            playsinline
          />
        </Box>
      </Fade>
    </Modal>
  );
};

export default VideoPlayer;
