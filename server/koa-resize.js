import path from 'path';
import fs from 'fs';
import Cropper from 'cropper';
import mime from 'mime';

export function parseOptions(optionsString, allowedParams) {
    return optionsString.split('-').reduce((carry, item) => {
        var key = item[0];

        // check if key is good
        if (allowedParams && allowedParams.indexOf(key) === -1) {
            throw new Error('Unexpected param');
        }

        if (!carry[key]) {
            carry[key] = [];
        }

        carry[key].push(item.slice(1));
        return carry;
    }, {});
}

export default function (config) {
    const { sourceDir, targetDir, ImageMagickPath, quality } = config;
    return function *() {
        const allowedParams = ['w', 'h', 't', 'm', 's', 'f'];

        let _, optionsString, sourceName, options, width, height, mimeType;

        [_, optionsString, sourceName] = this.request.url.replace(/^\/+|\/+$/g, '').split('/');
        const sourcePath = path.normalize(sourceDir + '/' + sourceName);

        const targetFullDir = path.normalize(targetDir + '/' + optionsString);
        const targetPath = path.normalize(targetFullDir + '/' + sourceName);

        // check if file was previously created
        if (fs.existsSync(targetPath)) {
            this.body = fs.createReadStream(targetPath);
            return true;
            //return config.onSuccess.call(null, targetPath, response, mime.lookup(targetPath));
        }

        if (!fs.existsSync(sourcePath)) {
            return config.on404.call(null, response, next);
        }

        try {
            options = parseOptions(optionsString, allowedParams);
        } catch (e) {
            console.log(e);
            //return config.on404.call(null, request, response, next, e);
        }

        mimeType = mime.lookup(sourcePath);

        if (mimeType.indexOf('image') === -1) {
            return config.on404.call(null, request, response, next, new Error('Wrong source mime type'));
        }

        if (!fs.existsSync(targetFullDir)) {
            fs.mkdirSync(targetFullDir);
        }

        width = options.w && options.w[0] ? options.w[0] : 0;
        height = options.h && options.h[0] ? options.h[0] : 0;

        // either width or height has to be defined
        if (!width && !height) {
            return config.on404.call(null, request, response, next);
        }

        var cropper = (new Cropper())
            .setIMPath(ImageMagickPath)
            .setSource(sourcePath)
            .setTarget(targetPath)
            .setQuality(quality)
        ;

        // apply resize
        switch (options.t && options.t[0]) {
            case 'square':
                cropper.square(width || height);
                break;

            case 'square_put':
                cropper.putIntoSquare(width);
                break;

            case 'put':
                cropper.putIntoSize(width, height);
                break;

            case 'put_out':
                cropper.cutIntoSize(width, height);
                break;

            default:
                var mode = cropper.RESIZE_PROPORTIONAL, w, h;

                if (!width) {
                    mode = cropper.RESIZE_HEIGHT;
                } else if (!height) {
                    mode = cropper.RESIZE_WIDTH;
                } else {
                    mode = !options.m ? cropper.RESIZE_PROPORTIONAL : options.m
                }

                cropper.resize(width || height, height || width, mode);

                break;
        }

        // apply filters
        (options.f || []).forEach(function (filter) {
            switch (filter) {
                case 'gs':
                    cropper.grayscale();
                    break;
            }
        });

        let filePath = yield cropper.commit();

        this.type = mimeType;

        this.body = fs.createReadStream(filePath);
    }
}