import {gql, useQuery} from '@apollo/client';
import {useEffect} from 'react';
import PostItems from './PostItems';
import ScrollButton from './ScrollButton';
import Loader from './Loader';

const ALL_POSTS = gql`
  query posts($first: Int, $after: String) {
    posts(first: $first, after: $after) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          id
          title
          body
        }
      }
    }
  }
  `

const Posts = () => {
  const first = 6
  const delay = true;
  const { error, data, fetchMore, networkStatus } = useQuery(ALL_POSTS, {
    variables: { first, delay},
    notifyOnNetworkStatusChange: true,
  })

  const handleScroll = () => {
    const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight
    if(hasNextPage && bottom ) { 
      handleFetch()
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, {
      passive: true
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [data]);

  const handleFetch = () => {
    fetchMore({
      variables: {
        first,
        after: data.posts.pageInfo.endCursor,
        delay,
      },
    })
  }

  if(error) {
    console.log(error.message);
    return <div>An error occurred</div>
  }

  if(networkStatus == 1) {
    return <Loader isLoading={true}/>
  }

  const hasNextPage = data.posts.pageInfo.hasNextPage;
  // const isRefetching = networkStatus === 3;
  return (
    <div className=" columns is-centered posts-container" >
      <div class="column is-two-thirds " >
        <header className="is-size-2 has-text-weight-bold">Message Board</header>
        <PostItems posts={data.posts}/>
      </div>
      <ScrollButton/>
    </div>
  )
}

export default Posts