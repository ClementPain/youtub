import { CheckIcon } from "@heroicons/react/24/outline"
import { Product } from "@stripe/firestore-stripe-payments"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import useAuth from "../hooks/useAuth"
import { loadCheckout } from "../lib/stripe"
import Loader from "./Loader"
import Table from "./Table"

interface Props {
  products: Product[]
}

function Plans({ products }: Props) {
  const { logout, user } = useAuth()
  const [selectedPlan, setSelectedPlan] = useState<Product | null>(products[2])
  const [isBillingLoading, setBillingLoading] = useState(false)

  const subscribeToPlan = () => {
    if (!user) return

    loadCheckout(selectedPlan?.prices[0].id!)
    setBillingLoading(true)
  }

  return (
    <div>
      <Head>
        <title>Youtub</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      
      <header className='border-b border-white/10 bg-[#141414]'>
        <Link href='/'>
          <Image
            src="https://art.pixilart.com/705ba833f935409.png"
            alt="Netflix"
            width={150}
            height={90}
            className='cursor-pointer object-contain'
          />
        </Link>

        <button
          className='text-lg font-medium hover:underline'
          onClick={logout}  
        >
          Sign Out
        </button>
      </header>

      <main className='mx-auto max-w-5xl px-5 pt-56 pb-12 transition-all md:px-10'>
        <h1 className='mb-3 text-3xl font-medium'>Choose the plan that's right for you</h1>
        <ul>
          <li className="flex items-center gap-x-2 text-lg">
            <CheckIcon className="h-7 w-7 text-[#E50914]" />
            Watch all you want. Ad-free.
          </li>
          <li className="flex items-center gap-x-2 text-lg">
            <CheckIcon className="h-7 w-7 text-[#E50914]" />
            Recommendations just for you.
          </li>
          <li className="flex items-center gap-x-2 text-lg">
            <CheckIcon className="h-7 w-7 text-[#E50914]" />
            Change or cancel your plan anytime.
          </li>
        </ul>

        <div className='mt-4 flex flex-col space-y-4'>
          <div className='flex w-full items-center self-end justify-center md:w-3/5'>
            { products.map((p) => (
              <div key={p.id} className={`planBox ${selectedPlan?.id === p.id ? "opacity-100" : "opacity-60"}`} onClick={() => setSelectedPlan(p)}>
                { p.name }
              </div>
            ))}
          </div>

          <Table products={ products } selectedPlan={ selectedPlan } />

          <button
            disabled={!selectedPlan || isBillingLoading}
            className={`mx-auto w-11/12 rounded bg-[#E50914] py-4 text-xl shadow hover:bg-[#f6121d] md:w-[420px] ${
              isBillingLoading && 'opacity-60'
            }`}
            onClick={subscribeToPlan}
          >
            {isBillingLoading ? (
              <Loader color="gray" />
            ) : (
              'Subscribe'
            )}
          </button>
        </div>
      </main>
    </div>
  )
}

export default Plans