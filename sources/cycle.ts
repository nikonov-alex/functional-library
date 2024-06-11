type GrowToSize<T, N extends number, A extends T[]> =
    A['length'] extends N ? A : GrowToSize<T, N, [...A, T]>;

type FixedArray<T, N extends number> = GrowToSize<T, N, []>;

export const array = <L extends number, R>(
    length: L,
    populate: { ( index: number ): R }
): FixedArray<R, L> =>
    Array.apply( null, Array( length ) )
        .map( ( current, index ) => populate( index ) ) as FixedArray<R, L>;