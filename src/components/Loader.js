import './css/Loader.css';

export default function Loader() {
    return (
        <div className='loader'>
            <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            </div>
        </div>
    );
}