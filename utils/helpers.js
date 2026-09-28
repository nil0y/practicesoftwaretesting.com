// Random email generator function
export const randomEmailGenerator = () => {
    const timeStamp = Date.now();
    const randomNumber = Math.floor(Math.random()*1000);
    return `user.${randomNumber}.${timeStamp}@test.com`;
}

// Random password generator  
export const randomPasswordGenerator = (length) => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let pass = '';
    for (let i = 0; i < length; i++) {
        const randomNumber = Math.floor(Math.random()*chars.length);
        pass += chars[randomNumber];
    }

    return pass;
}
// console.log(randomEmailGenerator());
// console.log(randomPasswordGenerator(10));