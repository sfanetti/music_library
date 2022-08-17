import { MusicContext } from "../providers/MusicProvider";
import { ResizeContext } from '../providers/ResizeProvider';
import { useContext } from "react"
import GalleryItem from './GalleryItem'

const MIN_COLUMN = 480;

function Gallery(){
    const { data = [] } = useContext(MusicContext);
    const resizeData = useContext(ResizeContext);

    function getColumns(data){
        if (!data.length) return { columns:[], columnWidth: 0};
        const { width } = resizeData;
        const availableWidth = Math.min(1920, width - 40);
        const count = Math.floor(availableWidth/MIN_COLUMN) || 1;
        const columnWidth = Math.floor(availableWidth/count);
        const sliceCount = Math.floor(data.length/count);
        const columns = [];
        for(let i=0; i < count; i++) {
            const columnData = data.splice(0, sliceCount)
            columns.push(columnData);
        }
        if (data.length){
            columns[0].push(...data.splice(0));
        }
        return { columns, columnWidth};
    }
    const { columns, columnWidth } = getColumns([...data]);
    return (
        <div className='gallery'>{
            columns.map((col, key) => {
                return <div className="column" style={{width: columnWidth}} key={key}>
                    {
                        col.map((item, i) => <GalleryItem item={item} key={`col${key}row${i}`} />)
                    }
                </div>
            })
        }</div>
    )
}

export default Gallery
