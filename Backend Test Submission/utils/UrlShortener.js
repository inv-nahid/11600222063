import { Url } from "../models/url.model.js";
class UrlShortener{
    constructor() {
    this.characterSet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    this.characterCount = this.characterSet.length;
    }
    async generateShortCode(length = 6) {
        let generationAttempts = 0;
        const maximumAttempts = 10;

        while (generationAttempts < maximumAttempts) {
            const currentTimestamp = Date.now().toString(36);
            const randomString = Math.random().toString(36).substring(2);
            const combinedString = (currentTimestamp + randomString).replace(/[^a-zA-Z0-9]/g, '');
            
            
            let generatedCode = combinedString.substring(0, length);
            if (generatedCode.length < length) {
                generatedCode = this.padWithRandom(generatedCode, length);
            }

            
            const existingCode = await Url.findOne({ shortUrl: generatedCode });
            if (!existingCode) {
                return generatedCode;
            }
            
            generationAttempts++;
            length++;
        }
        
        throw new Error('Unable to create unique short identifier after multiple attempts');
    }

    padWithRandom(inputString, desiredLength) {
        while (inputString.length < desiredLength) {
            inputString += this.characterSet[Math.floor(Math.random() * this.characterCount)];
        }
        return inputString;
    }
}

export {UrlShortener};