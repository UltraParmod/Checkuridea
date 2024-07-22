
import ShareToSocalMedia from 'react-native-share'


// ShareSocalMedia
export const ShareSocalMedia = async () => {
    try {
        const options = {
            message: 'checkuridea app!',
            url: 'https://www.checkuridea.com/',
            // title: data?.short_description,
            title: "checkuridea is a very good app",
            // email: "parmodkumar1851999@gmail.com"
        };
        const result = await ShareToSocalMedia.open(options);
        console.log('Shared successfully:', result);
    } catch (error) {
        console.log('Error sharing:', error.message);
    }
};

// FirstLetterCapital
export const FirstLetterCapital = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
