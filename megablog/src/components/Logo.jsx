function Logo({ width = '100px' }) {
  return (
    <div
      style={{ width }}
      className="flex items-center justify-center font-bold text-white"
    >
      <span className="text-2xl tracking-tight">
        BLOGS<span className="text-blue-500"></span>
      </span>
    </div>
  )
}

export default Logo