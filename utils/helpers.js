// Random email generator function
export const randomEmail = () => {
    const timeStamp = Date.now();
    const randomNumber = Math.floor(Math.random()*1000);
    return `user.${randomNumber}.${timeStamp}@test.com`;
}

// Random password generator  
export const randomString = (length) => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let pass = '';
    for (let i = 0; i < length; i++) {
        const randomString = Math.floor(Math.random()*chars.length);
        pass += chars[randomString];
    }

    return pass;
}
// console.log(randomEmail());
// console.log(randomString(10));