// components/PlaylistCard.tsx
import { SpotifyPlaylist } from '@/lib/spotify';
import React from 'react';

interface PlaylistCardProps {
  playlist: SpotifyPlaylist;
  onSelect: (playlistId: string) => void;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({ playlist, onSelect }) => {
  const imageUrl = playlist.images.length > 0 ? playlist.images[0].url : '/default-playlist.png';
  
  return (
    <div 
      className="card mb-4 shadow-sm hover-shadow-lg transition-shadow"
      style={{ width: '18rem', cursor: 'pointer' }}
      onClick={() => onSelect(playlist.id)}
    >
      <div className="position-relative">
        <img 
          src={imageUrl} 
          className="card-img-top" 
          alt={playlist.name}
          style={{ height: '180px', objectFit: 'cover' }}
        />
        {playlist.collaborative && (
          <span className="position-absolute top-0 end-0 bg-primary text-white p-1 small">
            Collaborative
          </span>
        )}
      </div>
      <div className="card-body">
        <h5 className="card-title text-truncate">{playlist.name}</h5>
        <p className="card-text text-muted text-truncate small">
          {playlist.description || 'No description'}
        </p>
        <div className="d-flex justify-content-between align-items-center">
          <small className="text-muted">
            {playlist.tracks.total} tracks
          </small>
          <small className="text-muted">
            {playlist.public ? 'Public' : 'Private'}
          </small>
        </div>
        <a 
          href={playlist.external_urls.spotify} 
          target="_blank" 
          rel="noopener noreferrer"
          className="stretched-link"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="visually-hidden">Open on Spotify</span>
        </a>
      </div>
    </div>
  );
};

export default PlaylistCard;