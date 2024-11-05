
import axios from 'axios';


export class RemoteVideoService {

    static async uploadVideoOnRemoteLink(remoteVideoLink: string, file: File) {
        // Create a promise for FileReader to handle async operation
        const binaryData = await new Promise<Uint8Array>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(new Uint8Array(reader.result as ArrayBuffer));
            reader.onerror = reject;
            reader.readAsArrayBuffer(file);
        });

        try {
            // Perform the upload using axios
            const response = await axios.put(remoteVideoLink, binaryData, {
                headers: {
                    "Content-Type": file.type, // Set content type based on file type
                },
            });
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }







}