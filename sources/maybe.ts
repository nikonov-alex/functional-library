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