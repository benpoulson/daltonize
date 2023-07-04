import { ColorMode, RGBColor } from './types';

function dot(x: number[], y: number[]) {
    let sum = 0;
    for (let i = 0; i < x.length; i++) {
        sum += x[i] * y[i];
    }
    return sum;
}

function inverse(a) {
    let a00 = a[0][0],
        a01 = a[0][1],
        a02 = a[0][2],
        a10 = a[1][0],
        a11 = a[1][1],
        a12 = a[1][2],
        a20 = a[2][0],
        a21 = a[2][1],
        a22 = a[2][2],
        b01 = a22 * a11 - a12 * a21,
        b11 = -a22 * a10 + a12 * a20,
        b21 = a21 * a10 - a11 * a20,
        det = a00 * b01 + a01 * b11 + a02 * b21;

    det = 1.0 / det;

    return [
        [b01 * det, (-a22 * a01 + a02 * a21) * det, (a12 * a01 - a02 * a11) * det],
        [b11 * det, (a22 * a00 - a02 * a20) * det, (-a12 * a00 + a02 * a10) * det],
        [b21 * det, (-a21 * a00 + a01 * a20) * det, (a11 * a00 - a01 * a10) * det],
    ];
}

const rgb2lms = [
    [17.8824, 43.5161, 4.11935],
    [3.45565, 27.1554, 3.86714],
    [0.0299566, 0.184309, 1.46709],
];

const lms2lms = [
    [
        [0, 2.02344, -2.52581],
        [0, 1, 0],
        [0, 0, 1],
    ], // protanope
    [
        [1, 0, 0],
        [0.494207, 0, 1.24827],
        [0, 0, 1],
    ], // deuteranope
    [
        [1, 0, 0],
        [0, 1, 0],
        [-0.395913, 0.801109, 0],
    ], // tritanope
];

const corrections = [
    [0, 0, 0],
    [0.7, 1, 0],
    [0.7, 0, 1],
];

function daltonize(color: RGBColor, mode: ColorMode) {
    const LMS = [dot(color, rgb2lms[0]), dot(color, rgb2lms[1]), dot(color, rgb2lms[2])];
    let lms = [0, 0, 0];

    switch (mode) {
        case 'protanope':
            lms = [dot(LMS, lms2lms[0][0]), dot(LMS, lms2lms[0][1]), dot(LMS, lms2lms[0][2])];
            break;
        case 'deuteranope':
            lms = [dot(LMS, lms2lms[1][0]), dot(LMS, lms2lms[1][1]), dot(LMS, lms2lms[1][2])];
            break;
        case 'tritanope':
            lms = [dot(LMS, lms2lms[2][0]), dot(LMS, lms2lms[2][1]), dot(LMS, lms2lms[2][2])];
            break;
        default:
            return color;
    }

    const lms2rgb = inverse(rgb2lms);

    let error = [dot(lms, lms2rgb[0]), dot(lms, lms2rgb[1]), dot(lms, lms2rgb[2])];
    error = [color[0] - error[0], color[1] - error[1], color[2] - error[2]];

    const correction = [
        dot(error, corrections[0]),
        dot(error, corrections[1]),
        dot(error, corrections[2]),
    ];

    return [
        Math.min(Math.max((color[0] + correction[0]) | 0, 0), 255),
        Math.min(Math.max((color[1] + correction[1]) | 0, 0), 255),
        Math.min(Math.max((color[2] + correction[2]) | 0, 0), 255),
    ];
}

export default daltonize;
