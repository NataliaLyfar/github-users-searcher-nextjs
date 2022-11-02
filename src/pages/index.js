import Head from "next/head";
import { FavoriteList } from "../components/FavoriteList";
import { SearchBar } from "../components/SearchBar";
import { UsersList } from "../components/UsersList";

const Home = () => {
  return (
    <>
      <Head>
        <title>Github users searcher</title>
      </Head>
      <main>
        <SearchBar />
        <UsersList />
        <FavoriteList />
      </main>
    </>
  );
};

export default Home;
