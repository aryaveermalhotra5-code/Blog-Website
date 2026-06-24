import { forwardRef, useId } from 'react'

const Select = forwardRef(function Select({ options, label, className = '', ...props }, ref) {
  const id = useId()

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="mb-1 inline-block pl-1 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <select
        {...props}
        id={id}
        ref={ref}
        className={`w-full rounded-lg border border-gray-300 bg-white px-3 py-2
          text-black outline-none duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100
          ${className}`}
      >
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
})

export default Select