import './App.css';
import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar';
import MusicProvider from './providers/MusicProvider';
import Message from './components/Message';
import ResizeProvider from './providers/ResizeProvider';

function App(){
    return (
        <ResizeProvider debounceTime={100}>
            <MusicProvider >
                <div className='application'>
                    <SearchBar debounceTime={500}/>
                    <Message />
                    <div className="content-area">
                        <Gallery/>
                    </div>
                </div>
            </MusicProvider>
        </ResizeProvider>
    )
}
export default App
