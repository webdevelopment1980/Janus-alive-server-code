const generateRandomCode = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters.charAt(randomIndex);
    }

    return code;
}

module.exports = { generateRandomCode }


// function hello(length) {
//     const characters = 'ABCDEFGH01234567890123456789'; // Include more numerical digits
//     let code = '';

//     for (let i = 0; i < length; i++) {
//         const randomIndex = Math.floor(Math.random() * characters.length);
//         code += characters.charAt(randomIndex);
//     }

//     return code;
// }

// const result = hello(8);
// console.log(result);