<?php

//include 'config/config.php';
include '../lib/lib_common.php';

include './ImageEditor.class.php';

define('BASE_PATH', dirname(__FILE__));
define('FILES_PATH', BASE_PATH . DIRECTORY_SEPARATOR . 'files');
define('IMG_CACHE_PATH', BASE_PATH . DIRECTORY_SEPARATOR . 'resize');

$path_string = trim(str_replace(array('..', '\\'), '', urldecode($_REQUEST['__path'])), '/');
$path = explode('/', $path_string);

if (count($path) > 3)
{
    die;
}

$excepted_params = array('w', 'h', 't', 'm', 's', 'f');
$params = array();

if (count($path) == 2)
{
    $temp = explode('-', $path[0]);

    foreach ($temp as $k)
    {
        $key = substr($k, 0, 1);

        if (!in_array($key, $excepted_params)) die;

        $params[$key] = substr($k, 1);
    }
}

//dv($params);
//
//die;

if (isset($params['w']) && empty($params['w'])) die;
if (isset($params['h']) && empty($params['h'])) die;

array_shift($path);

//dv($params);
//die;

$source = FILES_PATH . DIRECTORY_SEPARATOR . join(DIRECTORY_SEPARATOR, $path);

//dv($source);
//die;

if (file_exists($source) && (empty($params) || (@$params['w'] == 'o' || @$params['h'] == 'o')))
{
    $file_name = $source;
}
else if (file_exists($source) && !empty($params))
{
    $cache_path = IMG_CACHE_PATH . dirname($_REQUEST['__path']);

    if (!file_exists($cache_path))
    {
        mkdir(IMG_CACHE_PATH . dirname($_REQUEST['__path']), 0777, true);
    }

    if (!file_exists($cache_path))
    {
        die('Cache path was not created');
    }

    $cache_name = $cache_path . DIRECTORY_SEPARATOR . basename($_REQUEST['__path']);

    if (!file_exists(IMG_CACHE_PATH))
    {
        mkdir(IMG_CACHE_PATH, 0777, true);
    }

    if (!file_exists($cache_name))
    {
//        require BASE_PATH . '/lib/ImageEditor.class.php';

        $IE = new ImageEditorGD();

        $IE->setSource($source)->setTarget($cache_name);

        $size = empty($params['s']) ? $params['w'] : $params['s'];

        if (isset($params['e']) && (int) $params['e'] > 0 && (int) $params['e'] < 500)
        {
            $IE->cutEdgesByPercentage($v, $v, $v, $v);
        }

        switch (@$params['t'])
        {
            case 'square':
                $IE->square($size);
            break;

            case 'square_put':
                $IE->putIntoSquare($size);
            break;

            case 'put':
                $IE->putIntoSize($params['w'], $params['h']);
            break;

            case 'put_out':
                $IE->cutIntoSize($params['w'], $params['h']);
            break;

            default:

                if (empty($params['w']))
                {
                    $mode = IMAGE_EDITOR_RESIZE_HEIGHT;
                }
                else if (empty($params['h']))
                {
                    $mode = IMAGE_EDITOR_RESIZE_WIDTH;
                }
                else
                {
                    $mode = empty($p['m']) ? IMAGE_EDITOR_RESIZE_PROPORTIONAL : $p['m'];
                }

                $thumb_width    = (int) empty($params['w']) ? $params['h'] : $params['w'];
                $thumb_height   = (int) empty($params['h']) ? $params['w'] : $params['h'];

                $IE->resize($thumb_width, $thumb_height, $mode);

            break;
        }

        if (!empty($params['f']) && $params['f'] === 'gs')
        {
            $IE->grayscale();
        }

        $IE->commit();
    }

    $file_name = $cache_name;
}

$last_modified = filemtime($file_name);

if (!empty($file_name) && !empty($_SERVER['HTTP_IF_MODIFIED_SINCE']) && $last_modified <= strtotime($_SERVER['HTTP_IF_MODIFIED_SINCE']))
{
    header('HTTP/1.0 304 Not Modified');
}
else if (!empty($file_name))
{
    $size = getimagesize($file_name);
    header("Content-type: {$size['mime']}");
    header('Last-Modified: ' . gmdate("D, d M Y H:i:s", $last_modified) . ' GMT');
    readfile($file_name);
}
else
{
    header('HTTP/1.0 404 Not Found');
}

die;
