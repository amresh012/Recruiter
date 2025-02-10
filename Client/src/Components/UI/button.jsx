import React from 'react'

const button = ({text, icon}) => {
  return (
    <>
      <button className="group w-12 hover:w-44 h-12 hover:bg-indigo-500 cursor-pointer relative bg-indigo-600 rounded text-neutral-50 duration-700 before:duration-700 before:hover:500 font-bold flex justify-start gap-2 items-center p-2 pr-6 before:absolute before:-z-10 before:left-8 before:hover:left-40 before:w-6 before:h-6 before:bg-sky-700 before:hover:bg-sky-600 before:rotate-45">
        <div className="w-8 h-8 shrink-0 fill-neutral-50 flex items-center justify-center">
          {icon}
        </div>
        <span className="origin-left text-[16px] inline-flex duration-100 group-hover:duration-300 group-hover:delay-500 opacity-0 group-hover:opacity-100 border-l-2 px-1 transform scale-x-0 group-hover:scale-x-100 transition-all">
          {text}
        </span>
      </button>
    </>
  );
}

export default button