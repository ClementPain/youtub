import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"
import { DocumentData } from "firebase/firestore"
import { useRef, useState } from "react"
import { Movie } from "../typings"
import Thumbnail from "./Thumbnail"

interface Props {
  title: string
  movies: Movie[] | DocumentData[]
}

function Row({ title, movies } : Props) {
  const rowRef = useRef<HTMLDivElement>(null)
  const [isMoved, setIsMoved] = useState<Boolean>(false)
  const [isAllScrolled, setIsAllScrolled] = useState<boolean>(false)

  const handleClick = (direction: "left" | "right"): void => {
    setIsMoved(true)
    setIsAllScrolled(false)
    if(rowRef.current) {
      let { scrollLeft, clientWidth, scrollWidth } = rowRef.current
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth

      rowRef.current.scrollTo({ left: scrollTo, behavior:"smooth" })

      setTimeout(() => {
        if (rowRef.current) {
          scrollLeft = rowRef.current.scrollLeft
          clientWidth = rowRef.current.clientWidth
          scrollWidth = rowRef.current.scrollWidth

          if (scrollLeft === 0) {
            setIsMoved(false)
          } else if (scrollLeft === scrollWidth - clientWidth) {
            setIsAllScrolled(true)
          }
        }
      }, 800)
    }
  }

  return (
    <div className="h-40 space-y-0.5 md:space-y-1">
      <h2 className="
        w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5]
        transition duration-200
        hover:text-white
        md:text-2xl"
      >
        { title }
      </h2>
      <div className="group relative md:-ml-2">
        <ChevronLeftIcon className={`chevronIcon left-2 ${!isMoved && 'hidden'}`} onClick={() => handleClick("left")} />
        
        <div
          className="flex scrollbar-hide items-center space-x-0.5 overflow-x-scroll md:space-x-2.5 md:p-2"
          ref={ rowRef }  
        >
          { movies.map((movie) => (
            <Thumbnail key={movie.id} movie={movie} />
          ))}
        </div>
        
        <ChevronRightIcon className={`chevronIcon right-2 ${isAllScrolled && 'hidden'}`} onClick={() => handleClick("right")} />
      </div>
    </div>
  )
}

export default Row