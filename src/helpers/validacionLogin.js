export const validacionLogin = (email, password) => {
    if (email.trim() === '') {
        console.log('email')
        return false;
    } else if (password.trim() === '') {
        console.log('password')
        return false;
    }
}