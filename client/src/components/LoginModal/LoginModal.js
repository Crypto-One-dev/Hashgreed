import React, {useImperativeHandle,forwardRef, useContext} from 'react'

import{Modal, ModalOverlay, ModalContent, ModalHeader,ModalBody,ModalFooter,useDisclosure} from '@chakra-ui/react'
import waveIcon from 'assets/images/wave.png'
import seedIcon from 'assets/images/seed.png'
import styles from './LoginModal.scss'
import {ThemeContext} from "context/ThemeContext";
import { TiGift } from 'react-icons/ti'

function LoginModal({onSignMethods}, ref){
    const {theme} = useContext(ThemeContext);
    const {isOpen, onOpen, onClose} = useDisclosure()

    useImperativeHandle(ref, () => ({
        openModal() {
           onOpen()
        },
        closeModal(){
            onClose()
        }
      }
      ))
 
    return(
             <Modal onClose={onClose} size={'xl'}  isOpen={isOpen} isCentered className={styles.Modal}>
                <ModalOverlay />
                <ModalContent style ={{ borderRadius: '30px', boxShadow:' 0px 30px 20.0752px rgba(0, 4, 81, 0.2)', backgroundColor: theme.itemBackground}}>
                    <ModalHeader className = {styles.modalHeader} color="#1E0E62" fontWeight="semibold" fontSize="38px" textAlign = "center" mt ="20px" style={{color: theme.primaryText}}>Connect wallet</ModalHeader>
                    <ModalBody color = "rgba(21, 20, 57, 0.4)" fontSize = "12px" fontWeight="500" textAlign="center" style={{color: theme.commentText}}>
                            By connecting, I accept Hashgreed’s Term of use 
                    </ModalBody>
                    <ModalFooter style={{display: 'flex', flexDirection: 'column'}}>
                        <a onClick={() => onSignMethods('CLOUD')}
                            style={{
                                background: '#FE006C',
                                backgroundColor: theme.buttonBack,
                                color: 'white',
                                borderRadius: '66.9173px',
                                padding: '15px',
                                fontSize: '20px',
                                fontWeight: '800',
                                display: 'flex',
                                textAlign: 'center',
                                cursor: 'pointer',
                                position: 'relative',
                                marginBottom: '30px',
                                marginTop: '30px',
                                width: '100%'
                            }}
                        >
                            <span
                                style={{
                                fontSize: 10,   
                                padding: '2px 15px',
                                justifyItems: 'flex-start',
                                position: 'absolute',
                                left: '10px',
                                top: '3px'
                                }}
                            >
                                RECOMMENDED
                            </span>
                            <div style ={{width: '100%', backgroundColor: theme.buttonBack}}>Login by Exchange Email</div>   
                            <img src={waveIcon} style={{width:'70px', position:'absolute',right:'10px', top:'-30px'}} alt=""/>
                        </a>
                        <a onClick={() => onSignMethods('SEED')}
                            style={{
                                marginBottom: '30px',
                                borderColor: theme.buttonBack,
                                border: '2px solid',
                                color: theme.buttonBack,
                                borderRadius: '66.9173px',
                                padding: '15px',
                                fontSize: '20px',
                                fontWeight: '800',
                                display: 'flex',
                                textAlign: 'center',
                                cursor: 'pointer',
                                position: 'relative',
                                width: '100%'
                            }}
                        >
                            <span
                                style={{
                                fontSize: 10,   
                                padding: '2px 15px',
                                justifyItems: 'flex-start',
                                position: 'absolute',
                                left: '10px',
                                top: '3px'
                                }}
                            >
                                
                            </span>
                            <div style ={{width: '100%'}}>Login by Exchange Seed</div>   
                            <img src={seedIcon} style={{width:'70px', position:'absolute',right:'10px', top:'-30px'}} alt=""/>
                        </a>
                        <div className = {styles.sign} style ={{
                            color : theme.commentText,
                            fontSize : "12px",
                            fontWeight : "500",
                            textAlign : "center",
                            display: 'flex',
                            flexDirection:'row',
                            cursor: 'pointer',
                            marginBottom: '30px'
                        }}>Dont have an account?
                        <div style ={{color : theme.signUp, marginLeft: '5px'}}> Sign up</div>
                        </div>
                    </ModalFooter>
                </ModalContent>
            </Modal>
    )
}

export default forwardRef(LoginModal)