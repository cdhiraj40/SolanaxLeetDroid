import { toast } from 'react-toastify';
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