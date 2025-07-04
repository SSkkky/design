import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center'>
      <h2 className='text-3xl font-bold mb-2'>Not Found</h2>
      <p>요청이 잘못되거나 유효하지 않습니다.</p>
      <Link href="/" className='border mt-12 px-5 py-2 text-white bg-black rounded-full'>메인으로 이동</Link>
    </div>
  )
}