import MuxPlayer from '@mux/mux-player-react';
import styles from './Video.module.css';

export function Video({ playbackId, thumbnail, size, onEnded }) {
  return (
    <div
      className={styles.videoContainer}
      style={{ width: size, height: size }}
    >
      <MuxPlayer
        className={styles.video}
        playbackId={playbackId}
        streamType="on-demand"
        thumbnailTime={0}
        preload="metadata"
        autoPlay={false}
        muted={false}
        poster={thumbnail}
        onEnded={() => onEnded()}
      />
    </div>
  );
}
