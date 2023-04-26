import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Drive from '@ioc:Adonis/Core/Drive';

export default class FileController {
  public async upload({ request, response }: HttpContextContract) {
    const image = request.file('image');

    if (!image || !image.tmpPath) {
      return response.badRequest('Please upload an image');
    }

    const fileName = `${new Date().getTime()}.${image.extname}`;

    await Drive.put(fileName, image.tmpPath);

    return response.ok({ message: 'File uploaded successfully', file: fileName });
  }
}
