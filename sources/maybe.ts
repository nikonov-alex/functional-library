import { Maybe } from "./types";

export const apply = <T>( predicate: { ( a: any ): a is T } ) =>
    <A, B>( a: A | T, modifier: { ( a: A ): B } ): B | T =>
        predicate( a )
            ? a
            : modifier( a );

export const add = <T>( predicate: { ( value: any ): value is T } ) =>
    <A extends {}, F extends string, V>( a: A, field: F, value: V | T ): A & Record<F, V> | T =>
        predicate( value )
            ? value
            : ( { ... a, [field]: value } ) as A & Record<F, V>;

export const append = <T>( predicate: { ( value: any ): value is T } ) => {
    const applyInstance = apply( predicate );
    const addInstance = add( predicate );
    return <A extends {}, F extends string, V>( a: A | T, field: F, value: V | T ): A & Record<F, V> | T =>
        applyInstance( a, checkedA => addInstance( checkedA, field, value ) );
}

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