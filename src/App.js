import { Container, Flex, Spinner, VStack } from "@chakra-ui/react"
import { useEffect, useState } from 'react';
import Post from './components/post'
import db from './library/firebase'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import NavBar from './components/navbar'

function App() {
    const[posts, setPosts] = useState([]);
    const[isLoading, setisLoading] = useState(true);


    useEffect(() => {
      db.collection('posts')
      .orderBy("createdAt","desc")
      .get()
      .then((snapshot)=>{
        const items = snapshot.docs.map((item)=>({
          id:item.id,
          ...item.data()
        }))
        setPosts(items)
        setisLoading(false);
      }
      )
      
    }, [])


      useEffect(() => {
        db.collection("posts")
        .orderBy("createdAt", "desc")
        .onSnapshot((snapshot)=>{
          let _posts =[];
          snapshot.forEach((item)=>{
            _posts.push({
              id:item.id,
              ...item.data()
            })
          })
          setPosts(_posts);
        })
      }, [])

      if(isLoading){
        return(
          <Flex minH="100vh" justifyContent="center" alignItems="center" >
            <Spinner/>
          </Flex>
        )
      }

  return (
    <>
    <Container maxW="xd" centerContent p={8} >
      <VStack spacing={8} w="100%" >
          <NavBar/>
         {
      posts.map((item,index)=>(
        <Post key={item.id+index} item={item} />
      ))
    }
      </VStack>

    </Container>
   
      
    </>
  );
}

export default App;
