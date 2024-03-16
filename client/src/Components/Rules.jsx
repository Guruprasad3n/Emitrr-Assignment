import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";

function Rules() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        bg={"transparent"}
        _hover={"transparent"}
        _active={"transparent"}
        onClick={onOpen}
        textDecoration={"underline"}
      >
        Rules
      </Button>

      <Modal
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
        size={"xl"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Game Rules</ModalHeader>

          <ModalCloseButton />
          <ModalBody>
            <UnorderedList>
              <ListItem mb={"5"}>
                If the card drawn from the deck is a cat card, then the card is
                removed from the deck.
              </ListItem>
              <ListItem mb={"5"}>
                If the card is exploding kitten (bomb) then the player loses the
                game.
              </ListItem>
              <ListItem mb={"5"}>
                If the card is a defusing card, then the card is removed from
                the deck. This card can be used to defuse one bomb that may come
                in subsequent cards drawn from the deck.
              </ListItem>
              <ListItem mb={"5"}>
                If the card is a shuffle card, then the game is restarted and
                the deck is filled with 5 cards again.
              </ListItem>
            </UnorderedList>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
export default Rules;
