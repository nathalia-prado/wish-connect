import IconSpeech_bubble from '../components/icons/speech-bubble'

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className=" flex mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-6xl lg:text-8xl dark:text-white">
          Wish Connect
          <IconSpeech_bubble />
        </h1>
        <h2 className="flex italic text-gray-500">
          Connect with a community of dreams
        </h2>
      </div>
    </>
  )
}
