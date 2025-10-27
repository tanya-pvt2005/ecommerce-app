import React from 'react'
import Title from "../components/Title"
import {assets} from "../assets/frontend_assets/assets"
import NewsLetter from "../components/NewsLetter"
const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1 = {'ABOUT'} text2={'US'}></Title>
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img className = 'w-full md:max-w-[450px]' src= {assets.about_img}></img>
        <div className="flex flex-col justify-center gap-6 md:w-2.4 text-gray-600">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos rerum quod id assumenda laboriosam quidem natus deserunt doloribus voluptatem nemo cum, magni voluptates sunt in quae veniam ipsam quaerat tempora.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas similique consequatur obcaecati culpa perferendis illum vitae ex expedita dolorum, architecto officiis repellat amet aperiam sunt labore dolor deserunt nesciunt provident.</p>

          <b className='text-gray-800'>Our Mission</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, atque.</p>
        </div>
      </div>

      <div className="text-xl py-4">
        <Title text1={'WHY'} text2={'CHOOSE US'}></Title>
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border border-gray-300 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance</b>
          <p className='text-gray-600'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae necessitatibus ducimus illum pariatur natus aut ad odit quis vitae alias.</p>
        </div>
        <div className="border border-gray-300 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience</b>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae necessitatibus ducimus illum pariatur natus aut ad odit quis vitae alias.</p>
        </div>
        <div className="border border-gray-300 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service</b>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae necessitatibus ducimus illum pariatur natus aut ad odit quis vitae alias.</p>
        </div>
      </div>
      <NewsLetter/>
    </div>
  )
}

export default About
