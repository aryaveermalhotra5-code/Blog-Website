import { forwardRef, useId } from 'react'

const Input = forwardRef(function Input(
  { label, type = 'text', className = '', ...props },
  ref
) {
  const id = useId()
  return (
    <div className="w-full">
      {label && (
        <label className="mb-1 inline-block pl-1 text-sm font-medium text-gray-700" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type={type}
        className={`w-full rounded-lg border border-gray-300 bg-white px-3 py-2
          text-black outline-none duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100
          ${className}`}
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  )
})

export default Input