import Cropper from 'cropper';
import path from 'path';
import fs from 'fs';

const expectedParams = ['w', 'h', 't', 'm', 's', 'f'];
const IMPath = 'D:/www/util/ImageMagick/convert.exe';

export default function (source, target) {
    source = path.normalize(source);
    target = path.normalize(target);

    if (!fs.existsSync(target)) {
        fs.mkdirSync(target);
    }

    let targetStat = fs.statSync(target);
    let sourceStat = fs.statSync(source);

    return function (request, response) {
        let _, optionsString, options, sourcePath, sourceName, targetDir, targetPath;
        [_, optionsString, sourceName] = request.url.split('/');

        targetDir = path.normalize(target + '/' + optionsString);
        targetPath = path.normalize(targetDir  + '/' + sourceName);

        //if (fs.existsSync(targetPath)) {
        //    sendImage(targetPath, response);
        //}

        sourcePath = path.normalize(source + '/' + sourceName);

        if (!fs.existsSync(sourcePath)) {
            response.status(404).send('Not found');
        }

        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir);
        }

        options = parseOptions(optionsString);

        let cropper = (new Cropper())
            .setIMPath(IMPath)
            .setSource(sourcePath)
            .setTarget(targetPath)
        ;

        if (true) {
            cropper.resize(options.w, options.h)
        }

        cropper.commit()
            .then(path => {
                sendImage(path, response);
            }).catch(error => {
                response.status(500).send('Server error');
            });
    }
}

/**
 * @param optionsString
 * @returns {Array|*}
 *
 * Convert options from string into object:
 * "w150-h150-tput_out-fgs"
 * becomes
 * {
 *      w: '150',
 *      h: '150',
 *      t: 'put_out',
 *      f: 'gs'
 * }
 */
function parseOptions(optionsString) {
    let options = optionsString.split('-');

    options = options
        .map(item => [item[0], item.slice(1)])
        .reduce((carry, item) => {
            carry[item[0]] = item[1];
            return carry;
        }, {})
    ;

    Object.keys(options).forEach(key => {
        if (expectedParams.indexOf(key) === -1) {
            throw 'Unexpected param';
        }
    });

    return options;
}

function sendImage(filePath, response) {
    response.writeHead(200, {
        'Content-Type' : 'image/jpeg'
    });

    fs.createReadStream(filePath).pipe(response);
}