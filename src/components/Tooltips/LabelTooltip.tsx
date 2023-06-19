'use client'

import { Tooltip } from 'flowbite-react'

function LabelTooltip(toolTipContent: string) {
  return (
    <div className="inline-flex">
      <Tooltip content={toolTipContent}>
        <div className="flex items-center">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
            ></path>
          </svg>
        </div>
      </Tooltip>
    </div>
  )
}

export default LabelTooltip
