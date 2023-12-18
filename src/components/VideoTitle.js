

const VideoTitle = ({title,overview}) => {
  return (
    <div className="w-screen aspect-video pt-[22%] px-16 absolute text-white bg-gradient-to-r from-black">
        <h1 className="text-4xl font-bold">{title}</h1>
        <p className="py-6 text-lg w-1/4">{overview}</p>
        <div>
            <button className="w-24 h-auto text-center bg-white text-black py-1 px-3 text-lg rounded mr-4 hover:bg-opacity-80"> Play</button>
            <button className="w-auto h-auto text-center bg-gray-500 text-white py-1 px-3 opacity-80 text-lg rounded">More Info</button>
        </div>
    </div>
  )
}

export default VideoTitle