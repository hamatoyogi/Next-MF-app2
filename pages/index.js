import Head from 'next/head';
import styles from '../styles/Home.module.css';

const ExposedFromApp1 = (await import('app1/Exposed')).default;
const add = (await import('app1/add')).default;
const multiply = (await import('app1/multiply')).default;

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>APP 2</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to APP #2</h1>
        <h2>
          Public path: <code>{process.env.NEXT_PUBLIC_PATH}</code>
        </h2>
        <h2>
          Consuming from remote path:{' '}
          <code>{process.env.NEXT_PUBLIC_REMOTE_PATH}</code>
        </h2>
        <ExposedFromApp1 />
        <span>Adding 1 : {add(1)}</span>
        <span>multiply 2 : {multiply(2)}</span>
      </main>
    </div>
  );
}
