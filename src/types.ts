type CreateArrayWithLengthX<
    LENGTH extends number,
    ACC extends unknown[] = [],
> = ACC['length'] extends LENGTH
    ? ACC
    : CreateArrayWithLengthX<LENGTH, [...ACC,1]>

type NumericRange<
    START_ARR extends number[],
    END extends number,
    ACC extends number=never>
    =START_ARR['length'] extends END
    ? ACC | END
    : NumericRange<[...START_ARR,1], END, ACC | START_ARR['length']>

type RGBColorPart = NumericRange<CreateArrayWithLengthX<0>,255>

export type RGBColor = [RGBColorPart, RGBColorPart, RGBColorPart];
export type ColorMode = 'protanope' | 'deuteranope' | 'tritanope'
