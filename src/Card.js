import './menubar.css';
export default function Card({ title, description, imageUrl, onClick }) {
  return (
    <div 
      className="card" 
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      <div className="card-header">
        <img src={imageUrl} alt={title} className="card-image" />
      </div>
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <p className="card-description">{description}</p>
      </div>
    </div>
  );
}