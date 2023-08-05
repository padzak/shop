import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.scss'
import Header from '../components/header';
import Footer from '../components/footer';
import { useSession, signIn, signOut } from "next-auth/react"
import axios from 'axios';
import Main from '@/components/home/main';
import FlashDeals from '@/components/home/flashDeals';
import Category from '@/components/home/category';
import { women_dresses } from '@/data/home';

const inter = Inter({ subsets: ['latin'] })

// TODO change for ipregistry in prod
export default function Home() {
  const { data: session } = useSession();
  let country = {
    name: 'Poland',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Flag_of_Europe.svg/240px-Flag_of_Europe.svg.png'
  }
  
  return (
  <>
    <Header country={country}/>
    <div className={styles.home}>
      <div className={styles.container}>
        <Main />
        <FlashDeals />
        <div className={styles.home__category}>
          <Category header="Top Sellers" products={women_dresses} background="#5a31f4"/>
        </div>
      </div>
    </div>  
    <Footer country={country}/>
  </>
  )
}

// Below code includes polling location from ipregistry API and passing it to Home instead of hardcoding it

// export default function Home({ country }) {
//   return (<div>
//     <Header country={country}/>
//     <Footer country={country}/>
//   </div>
//   )
// }

// export async function getServerSideProps() {
//   let data = await axios
//   .get('https://api.ipregistry.co/66.165.2.7?key=yfq1uw24gda2l0fv')
//   .then((res) =>{
//     return res.data.location.country;
//   })
//   .catch((err) => {
//     console.log(err);
//   });
//   return  {
//     props: {
//       country: { name: data.name, flag: data.flag.emojitwo },
//     },
//   }
// }
