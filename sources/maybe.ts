import { Maybe } from "./types";

export const apply = <T>( predicate: { ( a: any ): a is T } ) =>
    <A, B>( modifier: { ( a: A ): B } ) =>
        ( a: A | T ): B | T =>
            predicate( a )
                ? a
                : modifier( a );

const updateParam = <P extends string, V extends any, S extends { [k: string]: any }>(
    state: S,
    stateParam: P,
    newValue: V
): S & Record<P, V> =>
    undefined === state[stateParam] || state[stateParam] !== newValue
        ? { ... state, [stateParam]: newValue }
        : state;

export const updateOptional = <P extends string, V extends any, D extends V | undefined>(
    stateParam: P,
    newValue: Maybe<V>,
    defaultValue?: D
) =>
    <S extends { [k: string]: any }>( state: S ): S & ( Record<P, V> | Record<P, D> ) =>
        !newValue
            ? defaultValue === state[stateParam]
                ? state
                : { ... state, [stateParam]: defaultValue }
            : updateParam( state, stateParam, newValue );

export const updateRequired = <P extends string, V extends any>(
    stateParam: P,
    newValue: V | Error
) =>
    <S extends { [k: string]: any }>( state: S ): Error | S & Record<P, V> =>
        newValue instanceof Error
            ? newValue
        : updateParam( state, stateParam, newValue );

export const append = <T>( predicate: { ( value: any ): value is T } ) =>
    <F extends string, V>( field: F, value: V | T ) =>
        <A extends {}>( a: A ): A & Record<F, V> | T =>
            predicate( value )
                ? value
                : ( { ... a, [field]: value } ) as A & Record<F, V>;