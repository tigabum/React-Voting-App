import React,{useState, useEffect} from 'react'
import { IconButton, Text, VStack } from "@chakra-ui/react";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";
import db from '../library/firebase'

function VoteButtons({item}) {
        const[isVoting, setisVoting]= useState(false);
        const[votedPosts, setVotedPosts] = useState([]);

        useEffect(() => {
           const votesFromLocalStorage = localStorage.getItem("votes") || [];
           let previousVotes = [];
                try{
                    previousVotes = JSON.parse(votesFromLocalStorage);

                }catch(error){
                    console.log(error);
                }
                setVotedPosts(previousVotes);

        }, [])
        const handleDisablingVotes = (postedid)=>{

            let oldvotes = votedPosts;
            oldvotes.push(postedid);
            setVotedPosts(oldvotes);

            localStorage.setItem("votes", JSON.stringify(votedPosts));

        }

        const handleVoting = async (type)=>{
            setisVoting(true);
                let upvotenumber= item.upVotesCount;
                let downvotenumber = item.downVotesCount;
                // console.log(upvotenumber);
                // console.log(downvotenumber);

                if(type == "upvote"){
                    upvotenumber+=1;

                }else{
                    downvotenumber+=1; 
                }
                // console.log(upvotenumber)
                // console.log(downvotenumber)
                
                const time = new Date();
                // console.log(time.toUTCString() );
                
                await db.collection("posts")
                        .doc(item.id).set({
                            title:item.title,
                            upVotesCount:upvotenumber,
                            downVotesCount:downvotenumber,
                            createdAt:item.createdAt,
                            updatedAt:time.toUTCString()


                        })
                        handleDisablingVotes(item.id);

                                setisVoting(false);
        }
        const handleIconDisable = ()=>{
            if(votedPosts.indexOf(item.id)>-1){
                return true;
            }else{
                return false;
            }
        }

    return (
        <>
        <VStack>
            <IconButton
            size="lg"
            colorScheme="purple"
            aria-label="Upvote"
            icon={<FiArrowUp/>}
            onClick={()=>handleVoting("upvote")}
            isLoading={isVoting}
            isDisabled={handleIconDisable}

            />
            <Text>{item.upVotesCount} </Text>
        </VStack>
         <VStack>
            <IconButton
            size="lg"
            colorScheme="yellow"
            aria-label="Downvote"
            icon={<FiArrowDown/>}
            onClick={()=>handleVoting("donwvote")}
            isLoading={isVoting}
            isDisabled={handleIconDisable}

            />
            <Text>{item.downVotesCount} </Text>
        </VStack>
        </>
    )
}

export default VoteButtons
