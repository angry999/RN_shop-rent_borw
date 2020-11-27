import { useState } from "react";

const useImageListFacade = (firstImage) => {
  const [firstItem, setFirstItem] = useState(firstImage)
  const [activeSlide, setActiveSlide] = useState(firstImage)

  const _onUpdateActiveSlide = value => {
    setActiveSlide(value)
  }

  return {
    activeSlide,
    firstItem,
    _onUpdateActiveSlide
  }
}

export {
  useImageListFacade
}