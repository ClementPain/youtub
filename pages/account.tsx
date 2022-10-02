import { getProducts, Product } from "@stripe/firestore-stripe-payments"
import { GetStaticProps } from "next"
import Head from "next/head"
import Link from "next/link"
import { FaBomb } from "react-icons/fa"
import Membership from "../components/Membership"
import { auth } from "../firebase"
import useAuth from "../hooks/useAuth"
import useSubscription from "../hooks/useSubscription"
import payments from "../lib/stripe"
import requests from "../utils/requests"

function Account({ products }: { products: Product[] }) {
  const { user, logout } = useAuth()
  const subscription = useSubscription(user)

  return (
    <div>
      <Head>
        <title>Account Settings - Youtub</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <header className={`bg-[#141414]`}>
        <Link href="/">
          <img
            src="https://art.pixilart.com/705ba833f935409.png"
            width={100}
            height={100}
            className="cursor-pointer object-contain"
          />
        </Link>
        <Link href="/account">
          <img
            src="https://mooloolabaslsc.com.au/wp-content/uploads/2019/09/SRC-icon.png"
            width={40}
            height={40}
            alt=""
            className="cursor-pointer rounded"
          />
        </Link>
      </header>

      <main className='pt-36 max-w-6xl px-5 mx-auto pb-12 transition-all md:px-10'>
        <div className='flex flex-col gap-x-4 md:flex-row md:items-center'>
          <h1 className='text-3xl md:text-4xl'>Account</h1>
          <div className='-m-0.5 flex items-center gap-x-1.5'>
            <FaBomb className='w-7 h-7 text-[#e40914]' />
            <p className='text-xs font-semibold text-[#e555]'>
              Member since { subscription?.created }
            </p>
          </div>
        </div>

        <Membership />

        <div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0 md:pb-0">
          <h4 className="text-lg text-[gray]">Plan Details</h4>
          {/* Find the current plan */}
          <div className="col-span-2 font-medium">
            {
              products.filter(
                (product) => product.id === subscription?.product
              )[0]?.name
            }
          </div>
          <p
            className="cursor-pointer text-blue-500 hover:underline md:text-right"
          >
            Change plan
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0">
          <h4 className="text-lg text-[gray]">Settings</h4>
          <p
            className="col-span-3 cursor-pointer text-blue-500 hover:underline"
            onClick={logout}
          >
            Sign out of all devices
          </p>
        </div>
      </main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const products = await getProducts(payments, {
    includePrices: true,
    activeOnly: true,
  })
    .then((res) => res)
    .catch((error) => console.log(error.message))

  return {
    props: {
      products,
    },
  }
}

export default Account