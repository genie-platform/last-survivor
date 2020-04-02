import React, { useState } from 'react'

const FirstSlide = () =>
  <div>
    You're on a boat.
    You feel the wind breeze on your hair and the sun is shining high.
    Life's good, although there is little problem..
  </div>

const SecondSlide = () =>
  <div>
    Someone on a ship is sick, vampire sick. And when there's a vampire on a ship everyone is gonna turn vampires sooner or latter.
    Everyone but the Last Survivor! At least that what the old legend is saying.
  </div>

const ThirdSlide = () =>
  <div>
    Enough talking! How do I survive?
    You run! But you run smartly. There is 100 rooms on this ship,
  </div>

const slides = [
  FirstSlide(),
  SecondSlide(),
  ThirdSlide()
]

export default function Intro ({ onIntroDone }) {
  const [slide, setSlide] = useState(0)
  const handleBack = () => setSlide(slide - 1)
  const handleNext = () => slide === slides.length - 1 ? onIntroDone(true) : setSlide(slide + 1)

  return (
    <div>
      Intro
      {slides[slide]}
      <div>
        <button disabled={slide === 0} onClick={handleBack}>back</button>
        <button onClick={handleNext}>next</button>
      </div>
    </div>)
}
