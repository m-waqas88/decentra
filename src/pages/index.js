import styles from '@/styles/Home.module.css';
import Posts from '@/components/Posts';
import { useContext } from "react";
import { globalContext } from "context/globalContext";


export default function Home() {
  const { walletStatus } = useContext(globalContext);
  return (
    <>
      {
        walletStatus && <Posts />
      }
      {
        !walletStatus && (
          <div className="flex justify-center mt-20">
            <div className="flex flex-col w-1/2">
              <p className="p-6 text-justify"><span>Decentra</span> is a digital and decentralized social community that is built for a cause. Being a human, the best you can do for a human is to help human. Irrespective of religion, race, color, language, geographical locaiton, we believe in humanity.</p>
              <p className="p-6 text-justify">Using this social community you can donate and help the humanity by collecting the posts of the content creators. It could be you or any organization or any idividual like you, who are commited to serve the humanity</p>
              <p className="p-6 text-justify">Our records are decentralized, secured and publicy available for reference or audit.</p>
            </div> 
          </div>
        )
      }

    </>
  )
}
