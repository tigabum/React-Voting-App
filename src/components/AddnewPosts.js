import React,{useState} from 'react'
import {
  Button,
  FormControl,
  FormLabel,
  Textarea,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  HStack,
  useDisclosure,
} from "@chakra-ui/react";
import db from '../library/firebase'

function AddnewPosts() {
    const{isOpen, onOpen, onClose} = useDisclosure();
    const[title, setTitle] = useState("");
    const[isSaving, setisSaving] = useState(false);

    const handleSubmit = ()=>{
        const date = new Date();
            setisSaving(true);
        db.collection("posts").add({
            
            title,
            updatedAt:date.toUTCString(),
            createdAt:date.toUTCString(),
            upVotesCount:0,
            downVotesCount:0

        })
        onClose();
        setTitle("");
        setisSaving(false);

    }

    return (
        <>
        <Button onClick={onOpen} colorScheme="blue" >Add new Post</Button>
            <Modal onClose={onClose} isOpen={isOpen} >
                <ModalOverlay>
                    <ModalContent maxW="xl" >
                        <ModalHeader>Add new Post </ModalHeader>
                        <ModalCloseButton/>
                        <ModalBody>
                            <FormControl>
                                <FormLabel>Post title </FormLabel>
                                <Textarea
                                    type="post-title"
                                    value={title}
                                    onChange={(e)=>setTitle(e.target.value)}
                                />
                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <HStack>
                                <Button onClick={onClose}>Close</Button>
                                <Button
                                onClick={handleSubmit}
                                colorScheme="blue"
                                disabled={!title.trim()}
                                isLoading={isSaving}
                                >
                                    Save</Button>
                            </HStack>
                        </ModalFooter>
                    </ModalContent>
                </ModalOverlay>

            </Modal>
        
        </>
    )
}

export default AddnewPosts
