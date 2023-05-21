import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.scss'
import Header from '../components/header';
import Footer from '../components/footer';
import { useSession, signIn, signOut } from "next-auth/react"
import axios from 'axios';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { data: session } = useSession();
  let country = {
    name: 'Poland',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Flag_of_Europe.svg/240px-Flag_of_Europe.svg.png'
  }
  
  return (<div>
    <Header country={country}/>
    { session ? "you are logged in" : "you are not logged in" }
    <Footer country={country}/>
  </div>
  )
}

// Below code includes polling location from ipregistry API and passing it to Home  

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
