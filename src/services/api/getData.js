import request from './config';

export const getData = async () => {
    try {
        const response = await request({ method: 'get', url: `/jobdata?number=12` });

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Failed to fetch data. Status code: ${response.status}`);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};