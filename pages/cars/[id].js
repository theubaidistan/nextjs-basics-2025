// import { useRouter } from "next/router";
// import Head from "next/head";
// import styles from "../../styles/Home.module.css";

// export default function Car({ car }) {
//   const router = useRouter();
//   const { id } = router.query;
//   return (
//     <div className={styles.container}>
//       <Head>
//         <title>
//           {car.color} {car.id}
//         </title>
//       </Head>

//       <main className={styles.main}>
//         <h1 className={styles.title}>{id}</h1>

//         <img src={car.image} width="300px" className={styles.carImage} />
//       </main>
//     </div>
//   );
// }

// export async function getServerSideProps({ params }) {
//   const BASE_URL =
//     process.env.NODE_ENV === "production"
//       ? "https://nextjs-basics-2025.vercel.app"
//       : "http://localhost:3000";

//   const req = await fetch(`${BASE_URL}/${params.id}.json`);
//   const data = await req.json();

//   return {
//     props: { car: data },
//   };
// }

// export async function getStaticProps({ params }) {

//     const req = await fetch(`http://localhost:3000/${params.id}.json`);
//     const data = await req.json();

//     return {
//         props: { car: data },
//     }
// }

// export async function getStaticPaths() {

//     const req = await fetch('http://localhost:3000/cars.json');
//     const data = await req.json();

//     const paths = data.map(car => {
//         return { params: { id: car } }
//     })

//     return {
//         paths,
//         fallback: false
//     };
// }
//*---------------------------------------------------------------------------
// pages/cars/[id].js
import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import fs from "fs";
import path from "path";

export default function Car({ car }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>
          {car.color} {car.id}
        </title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>{car.id}</h1>
        <Image src={car.image} width={600} height={400} alt={car.id} />
      </main>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  try {
    // Make sure the filename is lowercase to match your public folder
    const filePath = path.join(
      process.cwd(),
      "public",
      `${params.id.toLowerCase()}.json`
    );
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

    return { props: { car: data } };
  } catch (err) {
    console.error(err);
    // If JSON file not found, show 404 page
    return { notFound: true };
  }
}
