type Predicate<T> = { ( a: any ): a is T };

export const apply = <T>( predicate: Predicate<T> ) =>
    <A, B>( modifier: { ( a: A ): B } ) =>
        ( a: A | T ): B | T =>
            predicate( a )
                ? a
                : modifier( a );

export const ifNotFalse = apply( ( value ): value is false => false === value );
export const ifNotError = apply( ( value ): value is Error => value instanceof Error );