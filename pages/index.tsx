import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";
import Link from "next/link";

// const BLOG_URL = "example: https//ghostcms-nextjs-backend.herokuapp.com";
// const CONTENT_API_KEY = "put your api key here";
const { BLOG_URL, CONTENT_API_KEY } = process.env;

type Post = {
  title: string;
  slug: string;
};

async function getPosts() {
  const res = await fetch(
    `${BLOG_URL}/ghost/api/v3/content/posts/?key=${CONTENT_API_KEY}&fields=title,slug,custom_excerpt`
  ).then((res) => res.json());

  // console.log(res);
  // return res;
  // const titles = res.posts.map((post) => post.title);
  const posts = res.posts;
  // console.log(titles);
  // return titles;
  return posts;
}

export const getStaticProps = async ({ params }) => {
  const posts = await getPosts();
  return {
    revalidate: 10, // at most 1 request to the ghost CMS in the backend - reflect is in 10 seconds
    props: { posts },
  };
};

const Home: React.FC<{ posts: Post[] }> = (props) => {
  const { posts } = props;

  return (
    <div className={styles.container}>
      <h1>Hello</h1>
      <ul>
        {posts.map((post, index) => {
          return (
            <li key={post.slug}>
              <Link href="/post/[slug]" as={`/post/${post.slug}`}>
                <a>{post.title}</a>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Home;
