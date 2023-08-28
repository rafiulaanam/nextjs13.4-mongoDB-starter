
import Link from 'next/link'
import React from 'react'

export default function Home() {
  return (
    <div><Link href={'/users'}>Go to User</Link></div>
  )
}
