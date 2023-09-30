import {fileUpload} from '../../src/helpers/fileUploadww'

describe('Pruebas en fileUpload', () => { 

    test('debe subir el archivo a cloudinary', async() => { 
        
        const imageUrl = 'https://img.freepik.com/premium-photo/serene-natural-background-depicting-peaceful-landscape-scenery-ai-generated_523886-6825.jpg';
        const resp = await fetch(imageUrl);
        const blob = await resp.blob();
        const file = new File([blob], 'foto.jpg')
        
        const url = await fileUpload(file);
        expect(typeof url).toBe('string');

     });
 });