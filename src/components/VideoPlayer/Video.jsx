import MuxPlayer from '@mux/mux-player-react';
import styles from './Video.module.css';

export function Video({ playbackId, thumbnail }) {
  return (
    <div className={styles.videoContainer}>
      <MuxPlayer
        className={styles.video}
        src="https://videocdn.cdnpk.net/videos/838129da-4f19-4fee-be20-62fb61cee154/horizontal/previews/videvo_watermarked/large.mp4"
        // playbackId={playbackId}
        metadataVideoTitle="Placeholder (optional)"
        metadata-viewer-user-id="Placeholder (optional)"
        primary-color="#ffffff"
        secondary-color="#000000"
        accent-color="#9b70ff"
        poster="https://fastly.picsum.photos/id/827/1920/1080.jpg?hmac=JHKjyAUSi4Qf7e1660WBg_HwS8AgNo76wgNmHekWqnM" // Add your placeholder thumbnail URL here
      />
    </div>
  );
}
