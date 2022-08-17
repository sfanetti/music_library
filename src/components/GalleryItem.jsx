import { useState, useEffect } from 'react'

function GalleryItem({item}) {
    let [view, setView] = useState();

    useEffect(() => {
        setView(false);
    }, [item]);

    const simpleView = () => {
        return (
            <>
                <div className="image-container">
                    <img src={item.artworkUrl60} alt={item.trackName}/>
                </div>
                <div className="details">
                    <h3 className='track-name'>{item.trackName}</h3>
                    <h4 className='collection-name'>{item.collectionName}</h4>
                </div>
            </>
        )
    }

    const detailView = () => {
        return (
            <>
                <div className="title-area">
                    <div className="image-container">
                        <img src={item.artworkUrl100} alt={item.trackName}/>
                    </div>
                    <div className="details">
                        <h2 className='track-name'>{item.trackName}</h2>
                        <h3 className='collection-name'>{item.collectionName}</h3>
                        <h4 className='genre'>{item.primaryGenreName}</h4>
                        <h4 className='release-date'>{item.releaseDate}</h4>
                    </div>
                </div>
                <p className='description'>{item.longDescription}</p>                
            </>
        )
    }
    return (
        <div className="item-container">
            <div onClick={() => setView(!view)} 
                className={`item ${ view ? 'detail' : 'simple'}`}>
                {view ? detailView() : simpleView()}
            </div>
        </div>
    )

}
export default GalleryItem
