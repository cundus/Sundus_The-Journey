import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  Flex,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { API } from "../../config/api";
import { AppContext } from "../../context/AppContext";

const ConfirmationModal = ({ isOpen, onClose, id }) => {
  const { dispatch } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleDelete = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      await API.delete("post/" + id);
      setSuccess(true);
      dispatch({
        type: "UPDATE",
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setSuccess(false);
  }, []);

  return (
    <>
      <AlertDialog isOpen={isOpen} onClose={onClose} isCentered>
        <AlertDialogOverlay>
          <AlertDialogContent>
            {!success ? (
              <>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Delete Journey
                </AlertDialogHeader>

                <AlertDialogBody>
                  Are you sure? You can't undo this action afterwards.
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button onClick={onClose}>Cancel</Button>
                  <Button colorScheme="red" onClick={handleDelete} ml={3}>
                    Delete
                  </Button>
                </AlertDialogFooter>
              </>
            ) : (
              <>
                <AlertDialogHeader
                  fontSize="lg"
                  fontWeight="bold"
                ></AlertDialogHeader>

                <AlertDialogBody textAlign="center">
                  Post Successfully Deleted!
                </AlertDialogBody>
                <AlertDialogFooter></AlertDialogFooter>
              </>
            )}
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default ConfirmationModal;
