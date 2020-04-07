import React, { useState } from 'react'
import './Intro.css'

const FirstSlide = () =>
  <div>
    You're on a boat.
    You feel the wind breeze on your hair and the sun is shining high.<br />
    Life's good, although there is little problem..
  </div>

const SecondSlide = () =>
  <div>
    Someone on a ship is sick, vampire sick. And when there's a vampire on a ship everyone is gonna turn vampires sooner or latter.
  </div>

const ThirdSlide = () =>
  <div>
    Except of the last one, and he becomes the <br />Last Suvivor!<br />
    At least, that's what the old legend is saying.
  </div>

const FourthSlide = () =>
  <div>
    "Enough talking! How do I survive?"<br />
    you might ask. <br />
    <br />
    Be sit and listen.
  </div>

const FifthSlide = () =>
  <div>
    There's a hundred of cabins on this ship,<br />
    all placed in a long circular row.<br />
    Starting with room one, and two, and three.. <br />
    and one hundred and then one again.<br />
    All you need to do is just choose
    <br />the right<br /> room.<br />
  </div>

const SixthSlide = () =>
  <div>
    Choose the least crowded<br />
    and the most quite cabin<br />
    and stay there locked
  </div>

const SeventhSlide = () =>
  <div>
    Or speaking in math<br />
    To win you need to choose the farest number
    <br />from the <a href='https://en.wikipedia.org/wiki/Median' target='_blank' rel='noopener noreferrer'>Median</a> of all others<br />
  </div>
const slides = [
  FirstSlide(),
  SecondSlide(),
  ThirdSlide(),
  FourthSlide(),
  FifthSlide(),
  SixthSlide(),
  SeventhSlide()
]

export default function Intro ({ onIntroDone }) {
  const [slide, setSlide] = useState(0)
  const handleBack = () => setSlide(slide - 1)
  const handleNext = () => slide === slides.length - 1 ? onIntroDone(true) : setSlide(slide + 1)

  return (
    <div className='intro'>
      <div className='page-title'>Intro</div>
      <div>{slides[slide]}</div>
      <div disabled={slide === 0} onClick={handleBack} className='back'>{'<-Back'}</div>
      <div className='next  ' onClick={handleNext}>{'Next->'}</div>
    </div>)
}
