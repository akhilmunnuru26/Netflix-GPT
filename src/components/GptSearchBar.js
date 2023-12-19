
const GptSearchBar = () => {
  return (
    <div className="pt-[8%] flex justify-center">
      <form className="bg-black p-3 w-1/2 grid grid-cols-12 rounded">
        <input type="text" className="col-span-10 m-1 p-3 rounded outline-none" placeholder="What Would You Like To Watch Today?"/>
        <button className="col-span-2 rounded m-1 p-3 bg-red-700 text-white text-lg">Search</button>
      </form>
    </div>
  )
}

export default GptSearchBar