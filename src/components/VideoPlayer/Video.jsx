import MuxPlayer from '@mux/mux-player-react';
import styles from './Video.module.css';

export function Video({ playbackId, thumbnail }) {
  return (
    <div className={styles.videoContainer}>
      <MuxPlayer
        className={styles.video}
        playbackId={playbackId}
        streamType="on-demand"
        thumbnailTime={0}
        preload="metadata"
        autoPlay={false}
        muted={false}
        poster={thumbnail}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '15px',
          overflow: 'hidden',
          border: 'none',
          background: 'transparent',
          '--controls-backdrop-color': 'transparent',
          '--media-object-fit': 'cover',
          '--media-border-radius': '15px',
          '--container-border-radius': '15px',
        }}
      />
    </div>
  );
}
