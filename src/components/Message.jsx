import { useContext } from "react"
import { MusicContext } from "../providers/MusicProvider";

export default function Message() {
    const {message} = useContext(MusicContext);
    return <div className="error-message">
        <span>{message}</span>
    </div>
}