'use client'

function VideoSection() {
  return (
    <div className="px-5 md:px-10 lg:px-20 my-15  rounded-3xl  w-full h-[300px] md:h-[500px] lg:h-screen overflow-hidden">
      <video
        className="inset-0 w-full h-full object-cover rounded-3xl"
        autoPlay
        loop
        muted
        playsInline
        src="/workhero.mp4"
      />
    </div>
  )
}

export default VideoSection
