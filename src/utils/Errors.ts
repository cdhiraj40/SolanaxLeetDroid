import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()

export const walletNotProvided = () => {
    toast('Please connect to a wallet before sending transaction')
}

export const profileNotFetched = () => {
    toast('Please enter the username and get the profile first')
}

export const usernameNotProvided = () => {
    toast('Please enter the username first')
}

export const transactionNotProvided = () => {
    toast('Please enter the transaction ID first')
}

export const generalError = () => {
    toast('oops, something went wrong. Please try again.')
}

export const tryAgainError = () => {
    toast('oops, something went wrong. Please click on Get Transaction again.')
}

export const userDoesNotExistError = () => {
    toast('User with this username does not exist. Please add a correct username.')
}