import { useModal } from '../../context/Modal';
import './DeleteModal.css'

function OpenDeleteModal({
  modalComponent, // component to render inside the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (typeof onButtonClick === "function") onButtonClick();
  };
  return <button className='delete' onClick={onClick}><i className="fa-solid fa-trash-can"></i></button>;
}

export default OpenDeleteModal;
